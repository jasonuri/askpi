"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeNewsletter } from "@/lib/api";

const CALENDAR_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ07I4FMFs15WyD9hK8XiTRQm2lYhBp_CiBHxeml2xwZ7Vs1O12mDV8y6h4QWEr0CP0C6nAwwO5z";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      await subscribeNewsletter(email);
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="w-full border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <span className="font-serif text-2xl text-foreground">AskPhi</span>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AskPhi turns buyer behavior into competitive advantage. We map the
              switching moment — the forces, triggers, and commitment patterns
              behind every purchase.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-sm">Product</h4>
            <div className="space-y-2 text-sm">
              <Link
                href="/#how-it-works"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="/#use-cases"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Use Cases
              </Link>
              <Link
                href="/#service"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Service
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-sm">Company</h4>
            <div className="space-y-2 text-sm">
              <Link
                href="/about"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-sm">
              Stay Updated
            </h4>
            <p className="text-sm text-muted-foreground">
              Get the latest on switching intelligence and demand-side strategy.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
              />
              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-full"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            {status === "success" && (
              <p className="text-sm text-green-600">
                Thanks for subscribing!
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-destructive">
                Something went wrong. Try again.
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 AskPhi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
