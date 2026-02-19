import { Users, Zap, Clock, Target } from "lucide-react";

const challenges = [
  {
    title: "Marketing to Who You Think Bought",
    description:
      "Your ICP is based on stated preferences and firmographic data. But that describes demographics — not the switching moment that actually drove the purchase.",
    icon: Users,
  },
  {
    title: "Messaging Built on Assumptions",
    description:
      "Your positioning sounds right internally, but it's built on what customers say they want — not the push, pull, anxiety, and inertia forces that shaped their real decision.",
    icon: Zap,
  },
  {
    title: "No Map of the Switching Moment",
    description:
      "You can't see the trigger events, the decision timeline, or the commitment patterns that predict when and why buyers actually move.",
    icon: Clock,
  },
  {
    title: "Competitors Are Moving Faster",
    description:
      "While you're running surveys and guessing, your competitors are mapping demand-side intelligence — the causal forces behind every buying decision.",
    icon: Target,
  },
];

export function Problem() {
  return (
    <section className="w-full px-4 py-24 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm font-medium text-primary uppercase tracking-widest">
            The Challenge
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground">
            You're Describing Customers, Not Decoding Decisions
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Stalled pipelines. Weak differentiation. Positioning built on
            guesswork.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {challenges.map((challenge, i) => {
            const Icon = challenge.icon;
            return (
              <div
                key={i}
                className="bg-card rounded-xl border border-border p-6 space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {challenge.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {challenge.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
