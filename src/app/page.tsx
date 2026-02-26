import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { IcpWidget } from "@/components/hero/icp-widget";
import { Mission } from "@/components/sections/mission";
import { Problem } from "@/components/sections/problem";
import { HowItWorks } from "@/components/sections/how-it-works";
import { UseCases } from "@/components/sections/use-cases";
import { Service } from "@/components/sections/service";
import { FAQ } from "@/components/sections/faq";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="w-full px-4 pt-20 pb-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-tight text-foreground">
              Switching Intelligence in{" "}
              <span className="text-primary italic">Days</span>, Not Months
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              AskPhi replaces traditional focus groups with AI personas.
              Marketing teams test campaigns without recruiting, scheduling, or
              waiting.
            </p>
            <IcpWidget />
          </div>
        </section>

        <Mission />
        <Problem />
        <HowItWorks />
        <UseCases />
        <Service />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
