import { ArrowRight } from "lucide-react";
import { ResearchPlanMockup } from "./ResearchPlanMockup";
import { FocusGroupMockup } from "./FocusGroupMockup";
import { PollingResultsMockup } from "./PollingResultsMockup";
import { Pill } from "./Pill";
import { Button } from "./ui/button";
import { PersonaMockup } from "./PersonaMockup";

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Tell Us Your Audience",
      description: "Describe your target Gen Z segment and research goals.\n\nWe instantly generate up to 50 authentic personas.",
      component: <ResearchPlanMockup />
    },
    {
      step: "02", 
      title: "Test & Validate",
      description: "Upload campaigns, ads, product positioning—anything.\n\nOur AI personas engage with your content through natural conversations—not rigid surveys.\n\nWe conduct qualitative interviews and quantitative polling simultaneously across 50 personas.\n\nNo recruiting. No scheduling. No facilitation overhead.",
      component: <FocusGroupMockup />
    },
    {
      step: "03",
      title: "Get Actionable Insights",
      description: "Receive clear recommendations on:\n- What messaging resonates (and what doesn't)\n- Why Gen Z responds the way they do\n- Which positioning option to invest in\n- Exact language Gen Z uses",
      component: <PollingResultsMockup />
    }
  ];

  return (
    <section id="how-it-works" className="w-full px-4 py-16 bg-[#2a2a2a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <Pill>How It Works</Pill>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-[Instrument_Serif] text-[48px]">
            Understand Your Audience With <span className="text-primary">Uri</span>
          </h2>
          <div className="max-w-5xl mx-auto space-y-4">
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
              Know what resonates or stress test before launch.
            </p>
            <div className="flex justify-center my-8">
              <Button 
                onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ07I4FMFs15WyD9hK8XiTRQm2lYhBp_CiBHxeml2xwZ7Vs1O12mDV8y6h4QWEr0CP0C6nAwwO5z', '_blank')}
                className="bg-primary text-black px-6 py-2 h-auto font-medium text-base text-center rounded-full"
              >
                See uri in action
              </Button>
            </div>
            
            {/* Chat with Zara Section */}
            <div className="space-y-3 md:space-y-4 mb-8 md:mb-12 mt-12">
              <div className="text-center px-4">
                <p className="text-white/80 text-xs sm:text-sm md:text-base lg:text-lg">
                  Chat with an{" "}
                  <span className="text-accent font-semibold">AI persona</span> generated based on your target Gen Z audience
                </p>
              </div>
              
              <div className="max-w-7xl mx-auto">
                <PersonaMockup />
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col lg:flex-row items-center gap-8">
              <div className={`flex-1 space-y-4 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <span className="font-bold text-primary-foreground">{step.step}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground font-[Instrument_Serif] text-[32px]">{step.title}</h3>
                </div>
                <div className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed space-y-4">
                  {step.description.split('\n\n').map((paragraph, pIndex) => (
                    <div key={pIndex}>
                      {paragraph.includes('\n-') ? (
                        <>
                          {paragraph.split('\n').map((line, lineIndex) => {
                            if (line.trim().startsWith('-')) {
                              return (
                                <div key={lineIndex} className="flex items-start gap-2 ml-4">
                                  <span className="text-primary mt-1">•</span>
                                  <span>{line.trim().substring(1).trim()}</span>
                                </div>
                              );
                            } else if (line.trim()) {
                              return <div key={lineIndex} className="mb-2">{line}</div>;
                            }
                            return null;
                          })}
                        </>
                      ) : (
                        <p>{paragraph}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={`flex-1 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className={`w-full transform scale-100`}>
                  {step.component}
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="lg:hidden flex justify-center">
                  <ArrowRight className="w-6 h-6 text-primary rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-16">
          <Button 
            onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ07I4FMFs15WyD9hK8XiTRQm2lYhBp_CiBHxeml2xwZ7Vs1O12mDV8y6h4QWEr0CP0C6nAwwO5z', '_blank')}
            className="bg-primary hover:bg-primary/90 text-black px-6 py-2 h-auto font-medium text-base text-center transition-all duration-200 hover:scale-105 rounded-full"
          >
            See Uri in Action
          </Button>
        </div>
      </div>
    </section>
  );
}