import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { IcpWidget } from "@/components/hero/icp-widget";
import { SocialProof } from "@/components/sections/social-proof";
import { Problem } from "@/components/sections/problem";
import { HowItWorks } from "@/components/sections/how-it-works";
import { UseCases } from "@/components/sections/use-cases";
import { Service } from "@/components/sections/service";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section id="top" className="w-full px-4 pt-20 pb-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal tracking-tight leading-tight text-foreground">
              Do You Really Know Your{" "}
              <span className="text-primary">Audience</span>?
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We help you understand what moves and motivates your audience. Let&apos;s find out.
            </p>
            <IcpWidget />
          </div>
        </section>

        <SocialProof />
        <Problem />
        <HowItWorks />
        <UseCases />
        <Service />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
