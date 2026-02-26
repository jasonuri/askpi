"use client";

import { useState, useEffect } from "react";

export type ChatPhase = "idle" | "analyzing" | "complete";

interface ChatEventState {
  phase: ChatPhase;
  segments: string[];
  domain: string;
}

/**
 * Listens for ICP analysis custom events and returns the current phase and
 * segment data. Events are dispatched by the IcpWidget via
 * `src/lib/canvas/events.ts`.
 *
 * Event names:
 *   "icp-analysis-started"  — fired when streaming begins
 *   "icp-analysis-complete" — fired when streaming finishes (includes segments)
 *   "icp-analysis-reset"    — fired when the widget resets
 */
export function useChatEvents(): ChatEventState {
  const [state, setState] = useState<ChatEventState>({
    phase: "idle",
    segments: [],
    domain: "",
  });

  useEffect(() => {
    const handleStarted = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setState({ phase: "analyzing", segments: [], domain: detail?.domain ?? "" });
    };

    const handleComplete = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setState({
        phase: "complete",
        segments: detail?.segments ?? [],
        domain: detail?.domain ?? "",
      });
    };

    const handleReset = () => {
      setState({ phase: "idle", segments: [], domain: "" });
    };

    window.addEventListener("icp-analysis-started", handleStarted);
    window.addEventListener("icp-analysis-complete", handleComplete);
    window.addEventListener("icp-analysis-reset", handleReset);

    return () => {
      window.removeEventListener("icp-analysis-started", handleStarted);
      window.removeEventListener("icp-analysis-complete", handleComplete);
      window.removeEventListener("icp-analysis-reset", handleReset);
    };
  }, []);

  return state;
}
