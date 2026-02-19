import { Shield, Palette, Zap } from "lucide-react";

const useCases = [
  {
    icon: Shield,
    title: "ICP Sharpening",
    description:
      "Pressure-test your ICP against actual buyer switching behavior. Discover whether your ideal customer profile matches reality — or just internal assumptions.",
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: Palette,
    title: "Decision Driver Discovery",
    description:
      "Surface the push, pull, anxiety, and inertia forces behind every buying decision. Know exactly what moves your buyers to act — and what keeps them stuck.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Zap,
    title: "Messaging Validation",
    description:
      "Test your positioning against a synthetic switching audience. Find out if your messaging resonates with the forces that actually drive purchase decisions.",
    color: "bg-cyan-50 text-cyan-600",
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="w-full px-4 py-24 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm font-medium text-primary uppercase tracking-widest">
            Use Cases
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground">
            What do you need to decode?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From ICP validation to decision force mapping — decode the switching
            behavior that drives every purchase decision.
          </p>
        </div>
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
                <h3 className="text-xl font-semibold text-foreground">
                  {uc.title}
                </h3>
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
