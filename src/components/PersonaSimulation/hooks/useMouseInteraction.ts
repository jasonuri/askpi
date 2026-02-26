"use client";

import { useEffect, useRef, useState } from "react";

export interface MouseState {
  screenPosition: { x: number; y: number } | null;
  isIdle: boolean;
  speed: number;
  lastMoveTime: number;
}

const IDLE_THRESHOLD_MS = 5000;
const SPEED_SAMPLE_COUNT = 3;

export function useMouseInteraction(
  containerRef: React.RefObject<HTMLDivElement | null>,
  enabled: boolean
): MouseState {
  const [state, setState] = useState<MouseState>({
    screenPosition: null,
    isIdle: false,
    speed: 0,
    lastMoveTime: 0,
  });

  // Keep mutable refs for speed calculation without triggering renders mid-frame
  const speedSamples = useRef<number[]>([]);
  const lastPosition = useRef<{ x: number; y: number } | null>(null);
  const lastTime = useRef<number>(0);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!enabled) {
      setState({
        screenPosition: null,
        isIdle: false,
        speed: 0,
        lastMoveTime: 0,
      });
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const clearIdleTimer = () => {
      if (idleTimerRef.current !== null) {
        clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
    };

    const scheduleIdleTimer = () => {
      clearIdleTimer();
      idleTimerRef.current = setTimeout(() => {
        setState((prev) => ({ ...prev, isIdle: true, speed: 0 }));
      }, IDLE_THRESHOLD_MS);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const now = performance.now();

      // Calculate instantaneous speed (px/sec) from delta
      let instantaneousSpeed = 0;
      if (lastPosition.current !== null && lastTime.current > 0) {
        const dt = (now - lastTime.current) / 1000; // seconds
        if (dt > 0) {
          const dx = x - lastPosition.current.x;
          const dy = y - lastPosition.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          instantaneousSpeed = dist / dt;
        }
      }

      // Smooth speed over last SPEED_SAMPLE_COUNT frames
      speedSamples.current.push(instantaneousSpeed);
      if (speedSamples.current.length > SPEED_SAMPLE_COUNT) {
        speedSamples.current.shift();
      }
      const smoothedSpeed =
        speedSamples.current.reduce((sum, s) => sum + s, 0) /
        speedSamples.current.length;

      lastPosition.current = { x, y };
      lastTime.current = now;

      // Reset idle timer on each movement
      scheduleIdleTimer();

      setState({
        screenPosition: { x, y },
        isIdle: false,
        speed: smoothedSpeed,
        lastMoveTime: now,
      });
    };

    const handleMouseLeave = () => {
      clearIdleTimer();
      lastPosition.current = null;
      lastTime.current = 0;
      speedSamples.current = [];
      setState({
        screenPosition: null,
        isIdle: false,
        speed: 0,
        lastMoveTime: performance.now(),
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Start idle timer immediately so a motionless cursor counts as idle
    scheduleIdleTimer();

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      clearIdleTimer();
    };
  }, [containerRef, enabled]);

  return state;
}
