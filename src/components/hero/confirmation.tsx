"use client";

import { CheckCircle2, RotateCcw } from "lucide-react";

interface ConfirmationProps {
  onReset: () => void;
}

export function Confirmation({ onReset }: ConfirmationProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-8 shadow-sm text-center">
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 className="h-6 w-6 text-green-600" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Your full report is on its way
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        Check your inbox — you'll receive a detailed ICP analysis with audience
        segments, gap analysis, and a messaging playbook.
      </p>
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
      >
        <RotateCcw className="h-4 w-4" />
        Analyze another website
      </button>
    </div>
  );
}
