"use client";

import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { unlockReport } from "@/lib/api";

interface EmailCaptureProps {
  leadId: string;
  websiteUrl: string;
  statedAudience: string;
  onSubmitted: () => void;
}

export function EmailCapture({
  leadId,
  websiteUrl,
  statedAudience,
  onSubmitted,
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [bookDemo, setBookDemo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    try {
      await unlockReport({
        leadId,
        email,
        bookDemo,
        websiteUrl,
        statedAudience,
      });
      onSubmitted();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-4 bg-secondary/50 rounded-xl border border-border p-6">
      <p className="text-sm font-medium text-foreground mb-1">
        Get the full audience intelligence report
      </p>
      <p className="text-xs text-muted-foreground mb-4">
        We'll email you a detailed report with audience segments, gap analysis, and messaging playbook.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            disabled={isSubmitting}
          />
        </div>
        <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
          <input
            type="checkbox"
            checked={bookDemo}
            onChange={(e) => setBookDemo(e.target.checked)}
            className="rounded border-border"
          />
          I'd also like to book a strategy call
        </label>
        {error && <p className="text-destructive text-xs">{error}</p>}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full h-10 text-sm font-medium"
        >
          {isSubmitting ? "Sending..." : "Get Full Report"}
          {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </form>
    </div>
  );
}
