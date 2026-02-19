import { Check, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { CALENDAR_URL } from "@/lib/constants";

const sprintFeatures = [
  "Digital Presence & Positioning Analysis",
  "Behavioural Audience Modelling",
  "Decision Force Map",
  "Trigger & Timing Analysis",
  "Behavioural Segment Profiles",
  "Audience Language Brief",
  "60-Min Strategy Debrief",
];

export function Service() {
  return (
    <section id="service" className="w-full px-4 py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Service"
          title="Your Audience Intelligence Sprint"
        />
        <div className="max-w-xl mx-auto">
          <div className="bg-card rounded-xl border-2 border-foreground overflow-hidden">
            <div className="bg-foreground text-card py-3 px-6 text-center">
              <p className="font-semibold text-sm uppercase tracking-wide">
                Results in 72 hours
              </p>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center">
                  <Rocket className="h-5 w-5 text-card" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">
                  Audience Intelligence Sprint
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We map the behavioural forces behind your audience&apos;s
                decisions — the triggers, motivations, and barriers that explain
                why they choose you (or don&apos;t). Stanford research shows
                AI-powered audience models replicate human behavioural patterns
                with up to 85% accuracy. Complete intelligence in 72 hours.
              </p>
              <div className="space-y-2">
                {sprintFeatures.map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-600" strokeWidth={3} />
                    </div>
                    <span className="text-foreground">{f}</span>
                  </div>
                ))}
              </div>
              <Button asChild className="w-full rounded-full py-3">
                <a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start Your Sprint
                </a>
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Pricing discussed on call
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
