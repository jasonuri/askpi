import { Check, Rocket } from "lucide-react";

const fullServiceFeatures = [
  "Website Audience Signal Analysis",
  "Synthetic Audience Research (JTBD)",
  "Decision Force Mapping",
  "Switching Trigger Identification",
  "Commitment Pattern Analysis",
  "Messaging Language Brief",
  "60-Min Strategy Debrief",
];

const selfServiceFeatures = [
  "Instant Positioning Gap Analysis",
  "AI-Powered Switching Diagnostics",
  "Decision Force Reports",
  "Export & Share Results",
];

const CALENDAR_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ07I4FMFs15WyD9hK8XiTRQm2lYhBp_CiBHxeml2xwZ7Vs1O12mDV8y6h4QWEr0CP0C6nAwwO5z";

export function Service() {
  return (
    <section id="service" className="w-full px-4 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm font-medium text-primary uppercase tracking-widest">
            Service
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground">
            Choose Your Intelligence Path
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Full Service Card */}
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
                  Customer Intelligence Sprint
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We map your buyers' switching story — the forces, triggers, and
                commitment patterns that explain why customers choose you (or
                don't). Complete demand-side intelligence in 72 hours.
              </p>
              <div className="space-y-2">
                {fullServiceFeatures.map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-600" strokeWidth={3} />
                    </div>
                    <span className="text-foreground">{f}</span>
                  </div>
                ))}
              </div>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-primary text-primary-foreground text-center rounded-full py-3 font-medium hover:bg-primary/90 transition-colors"
              >
                Start Your Sprint
              </a>
            </div>
          </div>

          {/* Self Service Card */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="bg-secondary text-secondary-foreground py-3 px-6 text-center">
              <p className="font-semibold text-sm uppercase tracking-wide">
                Coming Soon
              </p>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <Rocket className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">
                  Self-Serve Diagnostic
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Enter your website URL. Get an instant positioning-reality gap
                analysis powered by AI. See where your messaging misses the
                switching moment.
              </p>
              <div className="space-y-2">
                {selfServiceFeatures.map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" strokeWidth={3} />
                    </div>
                    <span className="text-foreground">{f}</span>
                  </div>
                ))}
              </div>
              <div className="bg-muted rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Join the waitlist to be notified at launch
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
