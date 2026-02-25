import type { Metadata } from "next";
import { MapPin, Linkedin, Mail } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const CALENDAR_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ07I4FMFs15WyD9hK8XiTRQm2lYhBp_CiBHxeml2xwZ7Vs1O12mDV8y6h4QWEr0CP0C6nAwwO5z";

export const metadata: Metadata = {
  title: "About AskPhi - Meet the Team Behind Audience Intelligence",
  description:
    "Meet the team behind AskPhi. We combine behavioural science and AI to deliver audience intelligence — mapping the decision forces that drive real behaviour.",
  openGraph: {
    title: "About AskPhi - Meet the Team Behind Audience Intelligence",
    description:
      "Meet the team behind AskPhi. We combine behavioural science and AI to deliver audience intelligence — mapping the decision forces that drive real behaviour.",
    url: "https://www.askphi.ai/about",
  },
};

const founders = [
  {
    name: "Jason Nguyen",
    role: "Co-Founder & CEO",
    location: "London",
    bio: "Former pro poker player — 11 years reading human decision patterns under pressure. Now applied to mapping audience behaviour and decision intelligence.",
    linkedin: "https://www.linkedin.com/in/jasonvunguyen/",
    email: "jason@hellouri.ai",
    photo: "/team/jason.webp",
  },
  {
    name: "Elliott Prince",
    role: "Co-Founder & CPTO",
    location: "London",
    bio: "7+ years as Director of Product & Design. Delivering multi-million products built on deep audience understanding for Post Office, Mitie, Bacardi.",
    linkedin: "https://www.linkedin.com/in/elliott-prince-a5a42a18/",
    email: "elliott@hellouri.ai",
    photo: "/team/elliott.webp",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="w-full px-4 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <p className="text-sm font-medium text-primary uppercase tracking-widest">
              Our Story & Mission
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-foreground">
              About <span className="text-primary">AskPhi</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Most research tells you what people say. We built AskPhi to reveal
              why they act — combining behavioural science and AI to deliver
              intelligence you can act on in 72 hours.
            </p>
          </div>
        </section>

        {/* Founders */}
        <section className="w-full px-4 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {founders.map((founder) => (
                <div
                  key={founder.name}
                  className="bg-card rounded-xl border border-border p-8 text-center space-y-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-32 h-32 rounded-full bg-muted mx-auto flex items-center justify-center text-3xl font-serif font-normal tracking-tight text-muted-foreground">
                    {founder.name[0]}
                  </div>
                  <h3 className="text-xl font-serif font-normal tracking-tight text-foreground">
                    {founder.name}
                  </h3>
                  <p className="text-sm font-medium text-foreground">
                    {founder.role}
                  </p>
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{founder.location}</span>
                  </div>
                  <p className="text-sm text-muted-foreground italic leading-relaxed">
                    {founder.bio}
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-primary" />
                    </a>
                    <a
                      href={`mailto:${founder.email}`}
                      className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                    >
                      <Mail className="w-4 h-4 text-primary" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <p className="text-muted-foreground text-lg">
                Their backgrounds couldn&apos;t be more different, but through
                their own experiences they discovered the same truth —
              </p>
              <blockquote className="text-xl md:text-2xl font-serif font-normal tracking-tight text-foreground italic leading-relaxed">
                &ldquo;If you can&apos;t explain why your audience chose you,
                you can&apos;t replicate it. Every growth strategy starts with
                understanding the decision moment.&rdquo;
              </blockquote>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full px-4 py-16">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-serif font-normal tracking-tight text-foreground">
              Ready to understand your audience?
            </h2>
            <p className="text-muted-foreground">
              Book a call to discuss how an Audience Intelligence Sprint can
              work for your team.
            </p>
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-primary-foreground rounded-full px-8 py-3 font-medium hover:bg-primary/90 transition-colors"
            >
              Book a Call
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
