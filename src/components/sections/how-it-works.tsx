"use client";

import { motion } from "framer-motion";

const fourForces = [
  { label: "Push", description: "Frustration with the status quo", position: "top-left" },
  { label: "Pull", description: "Attraction to a new solution", position: "top-right" },
  { label: "Anxiety", description: "Fear of change or the unknown", position: "bottom-left" },
  { label: "Habit", description: "Comfort with the current way", position: "bottom-right" },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full px-4 py-24 bg-muted/50">
      <div className="max-w-4xl mx-auto">
        {/* Header — no SectionHeader component */}
        <div className="space-y-4 mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-widest">
            How it works
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-tight text-foreground">
            From a conversation to a playbook you can act on.
          </h2>
          <p className="text-lg text-muted-foreground">
            No surveys. No focus groups. No 6-month research cycle.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative pl-8 md:pl-12 border-l-2 border-border space-y-16">
          {/* Phase 1 */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute -left-[calc(1rem+5px)] md:-left-[calc(1.5rem+5px)] top-1 w-3 h-3 rounded-full bg-primary border-2 border-background" />
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Phase 1
              </p>
              <h3 className="text-xl md:text-2xl font-serif font-normal tracking-tight text-foreground">
                Discovery
              </h3>
              <p className="text-sm font-medium text-primary">
                We learn your context
              </p>
              <p className="text-muted-foreground leading-relaxed">
                A discovery call where we understand your ICP definition, GTM
                challenges, and growth priorities. You talk, we listen — then we
                go to work.
              </p>
            </div>
          </motion.div>

          {/* Phase 2 */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="absolute -left-[calc(1rem+5px)] md:-left-[calc(1.5rem+5px)] top-1 w-3 h-3 rounded-full bg-primary border-2 border-background" />
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Phase 2
              </p>
              <h3 className="text-xl md:text-2xl font-serif font-normal tracking-tight text-foreground">
                Research &amp; Modelling
              </h3>
              <p className="text-sm font-medium text-primary">
                Synthetic personas meet behavioural science
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We combine synthetic user research with Jobs to Be Done analysis
                and switching behaviour modelling to map how your audience
                actually decides.
              </p>

              {/* Four Forces diagram */}
              <div className="grid grid-cols-2 gap-3 pt-4 max-w-sm">
                {fourForces.map((force) => (
                  <div
                    key={force.label}
                    className="bg-card border border-border rounded-lg p-4 space-y-1"
                  >
                    <p className="text-sm font-semibold text-foreground">
                      {force.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {force.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Phase 3 */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="absolute -left-[calc(1rem+5px)] md:-left-[calc(1.5rem+5px)] top-1 w-3 h-3 rounded-full bg-primary border-2 border-background" />
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Phase 3
              </p>
              <h3 className="text-xl md:text-2xl font-serif font-normal tracking-tight text-foreground">
                Delivery
              </h3>
              <p className="text-sm font-medium text-primary">
                A playbook, not a report
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You receive findings you can act on — not a PDF that gathers
                dust.
              </p>
              <ul className="space-y-2 pt-2">
                {[
                  "Refined ICP",
                  "Synthetic buyer personas",
                  "Switching behaviour analysis",
                  "Language brief",
                  "Messaging playbook",
                  "Strategy debrief",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
