"use client";

import { AnimatePresence } from "framer-motion";
import { SpeechBubble } from "./SpeechBubble";

interface BubbleSlot {
  id: number;
  x: number;
  y: number;
  text: string;
  source?: string;
  year?: number;
  visible: boolean;
}

export interface OverlayManagerProps {
  bubbleSlots: BubbleSlot[];
}

export function OverlayManager({ bubbleSlots }: OverlayManagerProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 20,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Speech bubbles — each wrapped in its own AnimatePresence for clean exit */}
      <AnimatePresence>
        {bubbleSlots.map((slot) => (
          <SpeechBubble
            key={slot.id}
            text={slot.text}
            source={slot.source}
            year={slot.year}
            x={slot.x}
            y={slot.y}
            visible={slot.visible}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
