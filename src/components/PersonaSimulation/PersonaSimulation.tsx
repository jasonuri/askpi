"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";
import { useSimulation } from "./hooks/useSimulation";
import { useChatEvents } from "./hooks/useChatEvents";
import { useMouseInteraction } from "./hooks/useMouseInteraction";
import { OverlayManager } from "./ui/OverlayManager";
import { fetchInsights, type Insight } from "@/lib/insights";

// ── Types ────────────────────────────────────────────────────────────────────

interface BubbleSlot {
  id: number;
  x: number;
  y: number;
  text: string;
  source?: string;
  year?: number;
  visible: boolean;
}

export interface PersonaSimulationProps {
  widgetRef?: React.RefObject<HTMLDivElement | null>;
}

/** Minimum viewport width (px) at which speech bubbles are enabled. */
const BUBBLE_MIN_WIDTH = 768;

// ── Constants ────────────────────────────────────────────────────────────────

/** How often to check whether a new speech bubble should appear (ms). */
const BUBBLE_INTERVAL_MIN = 6000;
const BUBBLE_INTERVAL_MAX = 10000;

/** How long a bubble stays visible before it fades out (ms). */
const BUBBLE_LIFETIME_MS = 5000;

/** Max simultaneous bubbles (overridden by responsive config, but capped here). */
const MAX_BUBBLES = 2;

/** Mouse speed threshold (px/s) above which figures scatter. */
const SCATTER_SPEED_THRESHOLD = 800;

/** Distance (world units) within which a fast mouse triggers scatter. */
const SCATTER_RADIUS = 5;

/** Distance (world units) within which slow mouse triggers waving. */
const WAVE_RADIUS = 3;

/** Distance (world units) within which slow mouse triggers look-at. */
const LOOK_RADIUS = 8;

let bubbleIdCounter = 0;

// ── Helper: get responsive config for the current viewport width ─────────────

function getMouseEnabled(containerWidth: number): boolean {
  return containerWidth >= 768;
}

// ── Helper: NDC to viewport screen coords ───────────────────────────────────

function ndcToScreen(
  ndc: THREE.Vector3,
  containerRect: DOMRect
): { x: number; y: number } {
  return {
    x: (ndc.x * 0.5 + 0.5) * containerRect.width + containerRect.left,
    y: (-ndc.y * 0.5 + 0.5) * containerRect.height + containerRect.top,
  };
}

// ── Helper: pick a random phrase from insights ───────────────────────────────

function randomPhrase(insights: Insight[]): Insight {
  return insights[Math.floor(Math.random() * insights.length)];
}

// ── Component ────────────────────────────────────────────────────────────────

function PersonaSimulationInner({ widgetRef }: PersonaSimulationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { refs } = useSimulation(canvasRef, containerRef, widgetRef);
  const { phase, segments } = useChatEvents();

  // Determine if mouse interaction is active based on container width
  const [mouseEnabled, setMouseEnabled] = useState(false);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const update = () => setMouseEnabled(getMouseEnabled(container.offsetWidth));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  const mouse = useMouseInteraction(containerRef, mouseEnabled);

  // Insights state — fetched from Supabase on mount, fallback used until resolved
  const [insights, setInsights] = useState<Insight[]>([
    { text: "Analyzing audiences...", source: "AskPhi", year: 2026 },
  ]);
  useEffect(() => {
    fetchInsights().then(setInsights);
  }, []);

  // Speech bubble state
  const [bubbles, setBubbles] = useState<BubbleSlot[]>([]);
  const bubbleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Chat phase reactions ──────────────────────────────────────────────────

  useEffect(() => {
    const { figureManager, rippleEffect, clusterManager } = refs.current;
    if (!figureManager) return;

    if (phase === "analyzing") {
      rippleEffect?.trigger();
      for (const fig of figureManager.figures) {
        fig.setState("drifting-to-center");
      }
    } else if (phase === "complete") {
      clusterManager?.formClusters(segments, figureManager.figures);
    } else if (phase === "idle") {
      rippleEffect?.reset();
      clusterManager?.reset();
      for (const fig of figureManager.figures) {
        fig.setState("wandering");
      }
    }
  }, [phase, segments, refs]);

  // ── Mouse interaction reactions ───────────────────────────────────────────

  useEffect(() => {
    if (!mouseEnabled || mouse.isIdle || !mouse.screenPosition) return;

    const { sceneManager, figureManager } = refs.current;
    if (!sceneManager || !figureManager) return;

    // Mouse position is relative to the container element (useMouseInteraction
    // already subtracts the container rect for us).
    const localX = mouse.screenPosition.x;
    const localY = mouse.screenPosition.y;

    const groundPos = sceneManager.screenToGround(localX, localY);
    if (!groundPos) return;

    const isFast = mouse.speed > SCATTER_SPEED_THRESHOLD;

    for (const fig of figureManager.figures) {
      const dist = fig.position.distanceTo(groundPos);

      if (isFast && dist < SCATTER_RADIUS) {
        fig.setState("scattering");
        // Apply scatter velocity: direction away from mouse
        const away = new THREE.Vector3()
          .subVectors(fig.position, groundPos)
          .normalize()
          .multiplyScalar(6);
        fig.velocity.set(away.x, 0, away.z);
      } else if (!isFast && dist < WAVE_RADIUS) {
        if (fig.state !== "waving") {
          fig.setState("waving");
        }
      } else if (!isFast && dist < LOOK_RADIUS) {
        fig.lookAt(groundPos);
      }
    }

  }, [mouse, mouseEnabled, refs]);

  // ── Speech bubbles ────────────────────────────────────────────────────────

  const scheduleBubble = useCallback(() => {
    const delay =
      BUBBLE_INTERVAL_MIN +
      Math.random() * (BUBBLE_INTERVAL_MAX - BUBBLE_INTERVAL_MIN);

    bubbleTimerRef.current = setTimeout(() => {
      const { sceneManager, figureManager } = refs.current;
      if (!sceneManager || !figureManager) {
        scheduleBubble();
        return;
      }

      const container = containerRef.current;
      if (!container) {
        scheduleBubble();
        return;
      }

      // Disable bubbles on small screens
      if (container.offsetWidth < BUBBLE_MIN_WIDTH) {
        scheduleBubble();
        return;
      }

      const containerRect = container.getBoundingClientRect();

      // Build the widget exclusion rect (screen coords) with padding
      const PADDING = 40;
      let widgetLeft = -Infinity;
      let widgetRight = Infinity;
      let widgetTop = -Infinity;
      let widgetBottom = Infinity;
      if (widgetRef?.current) {
        const wr = widgetRef.current.getBoundingClientRect();
        widgetLeft = wr.left - PADDING;
        widgetRight = wr.right + PADDING;
        widgetTop = wr.top - PADDING;
        widgetBottom = wr.bottom + PADDING;
      }

      // Candidates: idle or interacting figures, projected to screen, outside widget area
      const sideCandidates = figureManager.figures
        .filter((f) => f.state === "idle" || f.state === "interacting")
        .map((f) => {
          const headWorld = f.getHeadWorldPosition();
          const ndc = headWorld.clone().project(sceneManager.camera);
          const screen = ndcToScreen(ndc, containerRect);
          return { figure: f, screen };
        })
        .filter(({ screen }) => {
          // Reject if the bubble position overlaps the widget area
          const insideX = screen.x >= widgetLeft && screen.x <= widgetRight;
          const insideY = screen.y >= widgetTop && screen.y <= widgetBottom;
          return !(insideX && insideY);
        });

      if (sideCandidates.length === 0) {
        scheduleBubble();
        return;
      }

      const pick = sideCandidates[Math.floor(Math.random() * sideCandidates.length)];
      const { x, y } = pick.screen;

      const id = ++bubbleIdCounter;
      const insight = randomPhrase(insights);
      const newBubble: BubbleSlot = {
        id,
        x,
        y,
        text: insight.text,
        source: insight.source,
        year: insight.year,
        visible: true,
      };

      setBubbles((prev) => {
        const next = [...prev, newBubble].slice(-MAX_BUBBLES);
        return next;
      });

      // Auto-remove after lifetime
      setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => b.id !== id));
      }, BUBBLE_LIFETIME_MS);

      scheduleBubble();
    }, delay);
  }, [refs, insights, widgetRef]);

  useEffect(() => {
    scheduleBubble();
    return () => {
      if (bubbleTimerRef.current !== null) {
        clearTimeout(bubbleTimerRef.current);
      }
    };
  }, [scheduleBubble]);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
      role="presentation"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
      <OverlayManager bubbleSlots={bubbles} />
    </div>
  );
}

export default PersonaSimulationInner;
