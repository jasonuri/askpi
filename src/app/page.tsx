import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/hero/hero-section";
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
        <HeroSection />
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
