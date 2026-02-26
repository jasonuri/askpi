"use client";

import { AnimatePresence, motion } from "framer-motion";

export interface SpeechBubbleProps {
  text: string;
  x: number;
  y: number;
  visible: boolean;
}

export function SpeechBubble({ text, x, y, visible }: SpeechBubbleProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={text}
          variants={{
            hidden: { opacity: 0, scale: 0.9, transition: { duration: 0.5, ease: "easeIn" } },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
          style={{
            position: "fixed",
            left: x,
            top: y,
            transform: "translate(-50%, -100%) translateY(-12px)",
            pointerEvents: "none",
          }}
        >
          {/* Bubble body */}
          <div
            className="bg-white rounded-lg shadow-md px-3 py-1.5"
            style={{ position: "relative" }}
          >
            <span
              style={{
                fontSize: "11px",
                color: "#1A1A2E",
                fontFamily: "var(--font-sans, Inter, sans-serif)",
                whiteSpace: "nowrap",
                display: "block",
                lineHeight: 1.4,
              }}
            >
              {text}
            </span>

            {/* Downward-pointing caret */}
            <span
              style={{
                position: "absolute",
                bottom: "-6px",
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: "6px solid white",
                display: "block",
                // Drop shadow continuation — match the box shadow visually
                filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.08))",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
