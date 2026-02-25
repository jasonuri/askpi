import { Button } from "@/components/ui/button";
import { CALENDAR_URL } from "@/lib/constants";

const features = [
  "Refined ICP definition",
  "Synthetic buyer personas",
  "Decision force mapping",
  "Switching behaviour analysis",
  "Trigger & timing analysis",
  "Audience language brief",
  "Messaging playbook",
  "60-min strategy debrief",
];

export function Service() {
  return (
    <section id="service" className="w-full px-4 py-24 bg-muted/50">
      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
          {/* Dark header band */}
          <div className="bg-foreground px-8 py-6">
            <h2 className="text-2xl md:text-3xl font-serif font-normal tracking-tight text-card">
              Audience Intelligence Sprint
            </h2>
            <p className="text-card/70 mt-1">
              Synthetic research meets behavioural science
            </p>
          </div>

          {/* Body */}
          <div className="p-8 space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              We combine synthetic user research, Jobs to Be Done analysis, and
              behavioural science to map how your audience actually decides — not
              what they say in surveys. You get a playbook you can act on, not a
              report that gathers dust.
            </p>

            {/* What you'll get — 2-column list */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                What you&apos;ll get
              </h3>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {features.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-foreground text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social proof line */}
            <p className="text-sm text-muted-foreground">
              Delivered to teams at Handicaddie, Run It Once, Teleya
              Hospitality, and others.
            </p>

            {/* CTA */}
            <div className="space-y-3 pt-2">
              <Button asChild className="w-full rounded-full py-3" size="lg">
                <a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a Discovery Call
                </a>
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                We&apos;ll discuss your challenges and whether the sprint is
                right for you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
