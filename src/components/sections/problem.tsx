import { Users, Zap, Clock, Target } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

const challenges = [
  {
    title: "Profiles That Miss the Story",
    description:
      "Demographics and firmographics tell you who your audience is — but not what triggers their decisions. Without behavioural context, your profiles are snapshots, not strategies.",
    icon: Users,
  },
  {
    title: "Research That Captures Opinions, Not Behaviour",
    description:
      "Surveys and focus groups capture what people say they want. But stated preferences rarely match actual decision behaviour — the gap between intent and action is where insight lives.",
    icon: Zap,
  },
  {
    title: "Messaging That Sounds Right but Doesn't Land",
    description:
      "Your positioning was built on internal consensus, not audience decision forces. Without mapping what frustrates, attracts, and holds your audience back, messaging stays generic.",
    icon: Clock,
  },
  {
    title: "Competitors Are Already Closing This Gap",
    description:
      "Leading organisations are segmenting by motivation and decision triggers — not just demographics. The ones who understand why audiences act will win the next brief, pitch, or campaign.",
    icon: Target,
  },
];

export function Problem() {
  return (
    <section className="w-full px-4 py-24 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="The Challenge"
          title="You Know Your Audience. You Don't Know Their Decisions."
          description="Flat personas. Insight decks that gather dust. Strategy built on what people say, not what they do."
          descriptionClassName="text-lg max-w-3xl mx-auto"
        />
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
