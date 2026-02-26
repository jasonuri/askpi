import type { Metadata } from "next";
import { MapPin, Linkedin, Mail } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "About AskPhi - Meet the Team Behind Customer Intelligence",
  description:
    "Meet the founders decoding why buyers switch. AskPhi combines JTBD methodology, behavioral science, and AI to deliver demand-side intelligence.",
  openGraph: {
    title: "About AskPhi - Meet the Team Behind Customer Intelligence",
    description:
      "Meet the founders decoding why buyers switch. AskPhi combines JTBD methodology, behavioral science, and AI to deliver demand-side intelligence.",
    url: "https://www.askphi.ai/about",
  },
};

const founders = [
  {
    name: "Jason Nguyen",
    role: "Co-Founder & CEO",
    location: "London",
    bio: "Former pro poker player — 11 years reading human decision patterns under pressure. Now applied to decoding buyer switching behavior and commitment signals.",
    linkedin: "https://www.linkedin.com/in/jasonvunguyen/",
    email: "jason@hellouri.ai",
    photo: "/team/jason.webp",
  },
  {
    name: "Vanessa Hoh",
    role: "Co-Founder",
    location: "New York",
    bio: "Former FCA regulator, wellness brand founder, and content creator. Bridges the gap between corporate positioning and how real buyers actually make decisions.",
    linkedin: "https://www.linkedin.com/in/vanessa-hoh-aa73928a/",
    email: "vanessa@hellouri.ai",
    photo: "/team/vanessa.webp",
  },
  {
    name: "Elliott Prince",
    role: "Co-Founder & CPTO",
    location: "London",
    bio: "7+ years as Director of Product & Design. Delivering multi-million products built on deep customer understanding for Post Office, Mitie, Bacardi.",
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground">
              About <span className="text-primary">AskPhi</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We decode why buyers switch. Our team combines JTBD methodology,
              behavioral science, and AI to map the decision forces behind every
              purchase.
            </p>
          </div>
        </section>

        {/* Founders */}
        <section className="w-full px-4 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {founders.map((founder) => (
                <div
                  key={founder.name}
                  className="bg-card rounded-xl border border-border p-8 text-center space-y-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-32 h-32 rounded-full bg-muted mx-auto flex items-center justify-center text-3xl font-serif text-muted-foreground">
                    {founder.name[0]}
                  </div>
                  <h3 className="text-xl font-serif text-foreground">
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
                Their backgrounds couldn't be more different, but through their
                own experiences they discovered the same truth —
              </p>
              <blockquote className="text-xl md:text-2xl font-serif text-foreground italic leading-relaxed">
                "If you can't explain why your best customers switched to you,
                you can't replicate it. Every growth strategy starts with
                decoding the switching moment."
              </blockquote>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
