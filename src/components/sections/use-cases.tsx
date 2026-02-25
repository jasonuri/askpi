"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TabKey = "startups" | "agencies" | "enterprise";

interface TabData {
  label: string;
  problem: string;
  useCases: string[];
  quote: string;
  attribution: string;
}

const tabs: Record<TabKey, TabData> = {
  startups: {
    label: "Startups",
    problem:
      "You've built for an audience you defined in a pitch deck. Now you need to validate that ICP against real decision behaviour before your next raise or launch.",
    useCases: [
      "Pressure-test your ICP against behavioural evidence, not assumptions",
      "Discover the decision triggers your landing page is missing",
      "Build positioning that speaks to why people switch, not just what they want",
    ],
    quote:
      "We thought we knew our audience. The sprint showed us we were solving the right problem for the wrong reason.",
    attribution: "Founder, Handicaddie",
  },
  agencies: {
    label: "Agencies",
    problem:
      "Your clients expect audience insight that goes beyond demographics. You need research you can deliver fast, brand, and build strategy on.",
    useCases: [
      "Deliver behavioural audience research your clients can act on",
      "Add a decision-science layer to existing strategy work",
      "White-label the deliverables under your own brand",
    ],
    quote:
      "It gave us a research depth we couldn't produce internally — and our client couldn't tell it wasn't a 6-week project.",
    attribution: "Strategy Director, Agency Partner",
  },
  enterprise: {
    label: "Enterprise",
    problem:
      "You're making audience-dependent decisions at scale — commissioning, campaigns, product strategy — but your segmentation is still geography and salary.",
    useCases: [
      "Inform strategy with decision-force mapping, not just demographics",
      "Reach hard-to-access audiences without expensive panel recruitment",
      "Get actionable insight in days, not the 3-4 weeks your current process takes",
    ],
    quote:
      "We'd been segmenting by geography and income for years. This showed us the behavioural segments we were actually dealing with.",
    attribution: "Audience Lead, Major UK Broadcaster",
  },
};

const tabKeys: TabKey[] = ["startups", "agencies", "enterprise"];

export function UseCases() {
  const [active, setActive] = useState<TabKey>("startups");
  const data = tabs[active];

  return (
    <section id="use-cases" className="w-full px-4 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="space-y-4 mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-widest">
            Who it&apos;s for
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-tight text-foreground">
            Built for teams that make audience-dependent decisions.
          </h2>
        </div>

        {/* Tab pills */}
        <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
          {tabKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                active === key
                  ? "bg-foreground text-card"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tabs[key].label}
            </button>
          ))}
        </div>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid md:grid-cols-5 gap-10"
          >
            {/* Text — 3/5 */}
            <div className="md:col-span-3 space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {data.problem}
              </p>
              <ul className="space-y-3">
                {data.useCases.map((uc) => (
                  <li key={uc} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-foreground">{uc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Case study card — 2/5 */}
            <div className="md:col-span-2">
              <div className="bg-muted/50 border border-border rounded-xl p-6 space-y-4">
                <p className="text-foreground leading-relaxed italic">
                  &ldquo;{data.quote}&rdquo;
                </p>
                <p className="text-sm text-muted-foreground">
                  — {data.attribution}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
