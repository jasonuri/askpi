import { useEffect, useRef, useCallback } from "react";
import { SceneManager } from "../simulation/SceneManager";
import { HalftonePass } from "../simulation/HalftonePass";
import { FigureManager } from "../simulation/FigureManager";
import { RippleEffect } from "../simulation/RippleEffect";
import { ClusterManager } from "../simulation/ClusterManager";
import type { ResponsiveConfig } from "../types";

function getResponsiveConfig(width: number): ResponsiveConfig {
  if (width >= 1200) {
    return {
      figureCount: 30,
      gridSize: 8,
      enableMouse: true,
      mouseMode: "full",
      enableSpeechBubbles: true,
      maxVisibleBubbles: 2,

    };
  }
  if (width >= 768) {
    return {
      figureCount: 18,
      gridSize: 10,
      enableMouse: true,
      mouseMode: "look-only",
      enableSpeechBubbles: true,
      maxVisibleBubbles: 1,

    };
  }
  return {
    figureCount: 10,
    gridSize: 10,
    enableMouse: false,
    mouseMode: "tap",
    enableSpeechBubbles: false,
    maxVisibleBubbles: 0,
  };
}

export interface SimulationRefs {
  sceneManager: SceneManager | null;
  halftonePass: HalftonePass | null;
  figureManager: FigureManager | null;
  rippleEffect: RippleEffect | null;
  clusterManager: ClusterManager | null;
  animationId: number | null;
  running: boolean;
}

export function useSimulation(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  containerRef: React.RefObject<HTMLDivElement | null>,
  widgetRef?: React.RefObject<HTMLDivElement | null>
) {
  const refs = useRef<SimulationRefs>({
    sceneManager: null,
    halftonePass: null,
    figureManager: null,
    rippleEffect: null,
    clusterManager: null,
    animationId: null,
    running: false,
  });

  const animate = useCallback(() => {
    const { sceneManager, halftonePass, figureManager, rippleEffect, clusterManager, running } =
      refs.current;
    if (!sceneManager || !halftonePass || !figureManager || !running) return;

    const delta = sceneManager.clock.getDelta();

    // Update figures (handles all behavior internally)
    figureManager.update(delta);

    // Update ripple animation
    if (rippleEffect) {
      rippleEffect.update(delta);
    }

    // Update cluster lifecycle
    if (clusterManager) {
      clusterManager.update(delta);
    }

    // Render scene to offscreen target
    sceneManager.renderToTarget();

    // Update halftone texture uniform
    halftonePass.uniforms.tScene.value = sceneManager.renderTarget.texture;

    // Render halftone pass to screen
    halftonePass.render(sceneManager.renderer);

    refs.current.animationId = requestAnimationFrame(animate);
  }, []);

  const start = useCallback(() => {
    if (refs.current.running) return;
    refs.current.running = true;
    refs.current.sceneManager?.clock.start();
    refs.current.animationId = requestAnimationFrame(animate);
  }, [animate]);

  const stop = useCallback(() => {
    refs.current.running = false;
    if (refs.current.animationId !== null) {
      cancelAnimationFrame(refs.current.animationId);
      refs.current.animationId = null;
    }
  }, []);

  /**
   * Re-compute the exclusion zone from the widgetRef DOM rect and pass it
   * to FigureManager. Called after init and whenever the container resizes.
   */
  const updateExclusionZone = useCallback(() => {
    const { sceneManager, figureManager } = refs.current;
    if (!sceneManager || !figureManager) return;
    if (!widgetRef?.current || !containerRef.current) {
      figureManager.setExclusionZone(null);
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const widgetRect = widgetRef.current.getBoundingClientRect();

    // Convert widget rect to coordinates relative to the canvas/container
    const relRect = {
      x: widgetRect.left - containerRect.left,
      y: widgetRect.top - containerRect.top,
      width: widgetRect.width,
      height: widgetRect.height,
    };

    const bounds = sceneManager.screenRectToGroundBounds(relRect);
    figureManager.setExclusionZone(bounds);
  }, [widgetRef, containerRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Check WebGL support
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    if (!gl) return; // No WebGL — render nothing

    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    if (width === 0 || height === 0) return;

    // Init scene
    const sceneManager = new SceneManager(canvas, width, height);
    const halftonePass = new HalftonePass(
      sceneManager.renderTarget.texture,
      width,
      height
    );
    const figureManager = new FigureManager(sceneManager.scene);
    const rippleEffect = new RippleEffect(halftonePass.uniforms);
    const clusterManager = new ClusterManager();

    refs.current.sceneManager = sceneManager;
    refs.current.halftonePass = halftonePass;
    refs.current.figureManager = figureManager;
    refs.current.rippleEffect = rippleEffect;
    refs.current.clusterManager = clusterManager;

    // Responsive config
    const config = getResponsiveConfig(width);
    halftonePass.setGridSize(config.gridSize);
    figureManager.spawn(config.figureCount);

    // Set initial exclusion zone from widget ref
    updateExclusionZone();

    // Check reduced motion
    const reducedMotionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotionMq.matches) {
      // Render single frame
      figureManager.update(0);
      sceneManager.renderToTarget();
      halftonePass.uniforms.tScene.value = sceneManager.renderTarget.texture;
      halftonePass.render(sceneManager.renderer);
    } else {
      start();
    }

    // Reduced motion change handler
    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        stop();
        // Render one static frame
        figureManager.update(0);
        sceneManager.renderToTarget();
        halftonePass.uniforms.tScene.value = sceneManager.renderTarget.texture;
        halftonePass.render(sceneManager.renderer);
      } else {
        start();
      }
    };
    reducedMotionMq.addEventListener("change", handleReducedMotionChange);

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target !== container) continue;
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        if (newWidth === 0 || newHeight === 0) continue;

        sceneManager.resize(newWidth, newHeight);
        halftonePass.resize(newWidth, newHeight);

        const newConfig = getResponsiveConfig(newWidth);
        halftonePass.setGridSize(newConfig.gridSize);
        figureManager.setTargetCount(newConfig.figureCount);

        // Recompute exclusion zone after container resize
        updateExclusionZone();
      }
    });
    resizeObserver.observe(container);

    // Visibility API — pause when hidden
    const handleVisibility = () => {
      if (reducedMotionMq.matches) return;
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Cleanup
    return () => {
      stop();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      reducedMotionMq.removeEventListener("change", handleReducedMotionChange);
      figureManager.dispose();
      halftonePass.dispose();
      sceneManager.dispose();
      refs.current.sceneManager = null;
      refs.current.halftonePass = null;
      refs.current.figureManager = null;
      refs.current.rippleEffect = null;
      refs.current.clusterManager = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { start, stop, refs };
}
