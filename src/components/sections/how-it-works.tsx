const steps = [
  {
    step: "01",
    title: "Decode Your Switching Story",
    description:
      "We analyze your website, competitive landscape, and market positioning. Our AI identifies the gap between who you think your audience is and the decision forces that actually drive purchases.",
  },
  {
    step: "02",
    title: "Map the Decision Forces",
    description:
      "Using JTBD methodology and synthetic audience research, we map the four forces of every buying decision — Push, Pull, Anxiety, and Inertia — for your specific buyers.",
  },
  {
    step: "03",
    title: "Build Your Demand-Side Playbook",
    description:
      "Receive a complete switching intelligence brief: decision timeline with trigger events, commitment patterns, language brief with exact buyer words, and a messaging playbook.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full px-4 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm font-medium text-primary uppercase tracking-widest">
            How It Works
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground">
            From website signals to decision force mapping in 72 hours
          </h2>
        </div>
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
                  <h3 className="text-xl md:text-2xl font-serif font-medium text-foreground">
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
