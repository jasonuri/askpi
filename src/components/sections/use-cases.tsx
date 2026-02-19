import { Shield, Palette, Zap } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

const useCases = [
  {
    icon: Shield,
    title: "Audience Definition & Validation",
    segment: "Startups",
    description:
      "Pressure-test your target audience against real decision behaviour. Discover whether your ICP matches reality — or just internal assumptions. Sharpen your GTM with behavioural evidence.",
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: Palette,
    title: "Behavioural Audience Research",
    segment: "Agencies",
    description:
      "Go beyond stated preferences to map the forces that shape audience decisions. Deliver research your clients can act on — grounded in behavioural science, not just survey data.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Zap,
    title: "Strategic Audience Intelligence",
    segment: "Enterprise",
    description:
      "Inform strategy with deep audience intelligence. Understand the triggers, motivations, and barriers that drive your audience — so every campaign, brief, or pitch is built on evidence.",
    color: "bg-cyan-50 text-cyan-600",
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="w-full px-4 py-24 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Use Cases"
          title="Built for How You Work"
          description="Whether you're sharpening a go-to-market, delivering audience research for clients, or informing enterprise strategy — AskPhi adapts to your context."
          descriptionClassName="text-lg max-w-2xl mx-auto"
        />
        <div className="grid md:grid-cols-3 gap-6">
          {useCases.map((uc, i) => {
            const Icon = uc.icon;
            return (
              <div
                key={i}
                className="bg-card rounded-xl border border-border p-8 space-y-4 hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${uc.color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    {uc.title}
                  </h3>
                  {"segment" in uc && (
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {uc.segment}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {uc.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
