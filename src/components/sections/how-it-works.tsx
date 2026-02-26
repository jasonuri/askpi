import { SectionHeader } from "@/components/ui/section-header";

const steps = [
  {
    step: "01",
    title: "Analyse Your Digital Signals",
    description:
      "We analyse your website, competitive landscape, and market positioning. Our AI identifies the gap between how you present your offer and the decision forces that actually move your audience.",
  },
  {
    step: "02",
    title: "Map the Behavioural Forces",
    description:
      "Using AI-powered audience modelling, we map the four behavioural forces behind every decision — what frustrates them, what attracts them, what makes them hesitate, and what keeps them stuck in old habits.",
  },
  {
    step: "03",
    title: "Receive Your Intelligence Brief",
    description:
      "Get a complete intelligence brief: behavioural segment profiles, decision trigger analysis, a language brief with the exact words your people use, and a messaging playbook.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full px-4 py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="How It Works"
          title="From your website to audience intelligence. 72 hours."
        />
        <div className="space-y-12">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`flex flex-col md:flex-row items-start gap-8 ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                    {step.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg pl-16">
                  {step.description}
                </p>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="w-full max-w-sm h-48 rounded-xl bg-muted/50 border border-border flex items-center justify-center text-muted-foreground text-sm">
                  Step {step.step} illustration
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
