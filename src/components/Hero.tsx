import { Button } from "./ui/button";
import { PersonaMockup } from "./PersonaMockup";

interface HeroProps {
  isOverlay?: boolean;
}

export function Hero({ isOverlay = false }: HeroProps) {
  // If this is the overlay version, only show the main content with glassmorphism
  if (isOverlay) {
    return (
      <div className="text-center space-y-6 md:space-y-8 backdrop-blur-md bg-black/30 rounded-3xl p-6 md:p-12 border border-white/20">
          <div className="space-y-4 md:space-y-6">

            <h1 className="text-[32px] sm:text-[38.4px] md:text-[48px] lg:text-[57.6px] xl:text-[72px] 2xl:text-[96px] text-white leading-tight md:leading-none px-2 font-[Instrument_Serif]">
              Gen Z Insights in <span className="relative inline-block text-primary" style={{fontStyle: 'italic'}}>
                Days
              </span>, Not Months
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto px-2 leading-relaxed">
              Uri replaces traditional focus groups with AI personas. 
              <br />
              Marketing teams test campaigns without recruiting, scheduling, or waiting.
            </p>
          </div>
          
          {/* Benefits Section - Mobile Stack */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6 lg:gap-12 px-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
              <span className="text-white/80 text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap">See what resonates with Gen Z</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
              <span className="text-white/80 text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap">Test multiple concepts at once</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
              <span className="text-white/80 text-xs sm:text-sm md:text-base lg:text-lg text-center sm:whitespace-nowrap">Launch knowing, not guessing</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center px-4">
            <Button 
              onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ07I4FMFs15WyD9hK8XiTRQm2lYhBp_CiBHxeml2xwZ7Vs1O12mDV8y6h4QWEr0CP0C6nAwwO5z', '_blank')}
              className="bg-primary text-black hover:bg-primary/90 px-8 py-3 h-auto font-medium text-base text-center rounded-full min-h-[48px] touch-manipulation"
            >
              Book a Demo
            </Button>
          </div>
      </div>
    );
  }

  // If this is the non-overlay version, show the Persona Chat Demo
  return (
    <section className="w-full px-4 pt-12 md:pt-24 pb-12 md:pb-24 bg-[#2a2a2a]">
      <div className="max-w-6xl mx-auto">
        {/* Persona Chat Demo */}
        <div className="space-y-3 md:space-y-4 mb-8 md:mb-12">
          <div className="text-center px-4">
            <p className="text-white/80 text-xs sm:text-sm md:text-base lg:text-lg">
              Chat with <span className="text-primary font-semibold">Zara</span>, an{" "}
              <span className="text-accent font-semibold">AI persona</span> generated based on your target audience
            </p>
          </div>
          
          <div className="max-w-7xl mx-auto">
            <PersonaMockup />
          </div>
        </div>


      </div>
    </section>
  );
}