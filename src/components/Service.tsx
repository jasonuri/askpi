import { Check, Rocket } from "lucide-react";
import { Pill } from "./Pill";
import { Button } from "./ui/button";
import { useState, useRef } from "react";
import { toast } from "sonner@2.0.3";
import { motion, useScroll, useTransform } from "motion/react";

export function Service() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Header opacity and position
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1, 0.75, 0.85], [0, 1, 1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.1], [50, 0]);

  // Scale and collapse
  const containerScale = useTransform(scrollYProgress, [0.25, 0.35, 0.85, 1], [1, 0.9, 0.9, 0.3]);
  const containerOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

  // Split animation - cards move apart
  const leftCardX = useTransform(scrollYProgress, [0.35, 0.45], [0, -70]);
  const rightCardX = useTransform(scrollYProgress, [0.35, 0.45], [0, 70]);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Submit to ConvertKit form
      const response = await fetch('https://api.kit.com/forms/0ad37bd38b/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (response.ok) {
        toast.success("You're on the waitlist! We'll notify you when Self Service launches.");
        setEmail("");
      } else {
        toast.error("Failed to join waitlist. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fullServiceFeatures = [
    "Design Custom Research",
    "Create Synthetic Samples",
    "Conduct Qual Interviews",
    "Field Quant Surveys",
    "Analyze Results",
    "Present Recommendations",
    "Generate Marketing Plan"
  ];

  const selfServiceFeatures = [
    "24/7 Access",
    "Run Quant and Qual Research",
    "Export Results to PowerPoint",
    "Team and Organization Access"
  ];

  const services = [
    {
      id: 'full-service',
      title: 'Full Service',
      badge: 'Results in 72 hours',
      badgeColor: '#444444',
      description: 'Bespoke consulting powered by our platform. Give us the objective, we run the research, and bring you the results.',
      features: fullServiceFeatures,
      buttonText: 'GET A PROPOSAL',
      buttonColor: '#444444',
      buttonHoverColor: '#333333',
      buttonAction: () => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ07I4FMFs15WyD9hK8XiTRQm2lYhBp_CiBHxeml2xwZ7Vs1O12mDV8y6h4QWEr0CP0C6nAwwO5z', '_blank'),
      backgroundColor: '#ffffff',
      translateX: leftCardX
    },
    {
      id: 'self-service',
      title: 'Self Service',
      badge: 'Coming Soon',
      badgeColor: '#ffd2bd',
      description: 'Run your own research via access to our software platform. Results in hours.',
      features: selfServiceFeatures,
      buttonColor: '#ffd2bd',
      buttonHoverColor: '#ffcaaa',
      backgroundColor: '#ffffff',
      translateX: rightCardX,
      hasForm: true
    }
  ];

  return (
    <section id="service" className="w-full px-4 py-16 bg-[#2a2a2a]">
      {/* Service structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Uri Research Services",
          "description": "AI-powered consumer research services for understanding Gen Z audiences",
          "itemListElement": [
            {
              "@type": "Service",
              "position": 1,
              "name": "Full Service Research",
              "description": "Bespoke consulting powered by our platform. Give us the objective, we run the research, and bring you the results. Results in 72 hours.",
              "provider": {
                "@type": "Organization",
                "name": "Uri",
                "url": "https://www.hellouri.ai"
              },
              "serviceType": "Consumer Research Consulting"
            },
            {
              "@type": "Service",
              "position": 2,
              "name": "Self Service Research Platform",
              "description": "Run your own research via access to our software platform. Results in hours.",
              "provider": {
                "@type": "Organization",
                "name": "Uri",
                "url": "https://www.hellouri.ai"
              },
              "serviceType": "Consumer Research Software"
            }
          ]
        })}
      </script>

      <div className="max-w-7xl mx-auto">
        
        {/* MOBILE VERSION - Simple Stacked Cards */}
        <div className="block lg:hidden">
          <div className="text-center space-y-4 mb-12">
            <Pill>Service</Pill>
            <h2 className="text-3xl font-bold text-foreground font-[Instrument_Serif]">
              Choose Your <span className="text-primary">Research Path</span>
            </h2>
          </div>
          
          <div className="space-y-8 max-w-md mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border-2 border-black bg-white rounded-xl overflow-hidden shadow-xl"
              >
                {/* Badge Header */}
                <div 
                  className="py-4 px-6 text-center"
                  style={{ 
                    backgroundColor: service.badgeColor,
                    color: service.id === 'full-service' ? 'white' : 'black'
                  }}
                >
                  <p className="font-semibold uppercase tracking-wide text-sm">{service.badge}</p>
                </div>
                
                {/* Card Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: service.id === 'full-service' ? '#444444' : '#ffd2bd' }}
                    >
                      <Rocket className="w-6 h-6" style={{ color: service.id === 'full-service' ? 'white' : 'black' }} />
                    </div>
                    <h3 className="text-black font-semibold text-2xl">{service.title}</h3>
                  </div>
                  
                  <p className="text-black leading-relaxed text-base">
                    {service.description}
                  </p>
                  
                  {/* Features List */}
                  <div className="space-y-2 pt-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-[#65EC87] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-black" strokeWidth={3} />
                        </div>
                        <span className="text-black text-base">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA Button or Form */}
                  {service.hasForm ? (
                    <form onSubmit={handleWaitlistSubmit} className="pt-4">
                      <input
                        type="email"
                        placeholder="Work email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#65EC87] text-black placeholder:text-gray-400 text-base mb-4"
                        disabled={isSubmitting}
                      />
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full text-black rounded-full py-6 text-sm font-semibold"
                        style={{ 
                          backgroundColor: service.buttonColor
                        }}
                      >
                        {isSubmitting ? "JOINING..." : "JOIN WAITLIST"}
                      </Button>
                    </form>
                  ) : (
                    <div className="pt-4">
                      <Button
                        onClick={service.buttonAction}
                        className="w-full text-white rounded-full py-6 text-sm font-semibold"
                        style={{ 
                          backgroundColor: service.buttonColor
                        }}
                      >
                        {service.buttonText}
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* DESKTOP VERSION - Scroll-triggered sticky and flip animation container */}
        <div ref={containerRef} className="hidden lg:block relative h-[400vh]">
          <div className="sticky top-20 h-screen flex items-center justify-center overflow-hidden">
            
            {/* Header text that appears when locked */}
            <motion.div 
              style={{ 
                opacity: headerOpacity,
                y: headerY
              }}
              className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center space-y-4"
            >
              <Pill>Service</Pill>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground font-[Instrument_Serif] text-[48px]">
                Choose Your <span className="text-primary">Research Path</span>
              </h2>
            </motion.div>

            {/* Cards container with scale animation */}
            <motion.div
              style={{ 
                scale: containerScale,
                opacity: containerOpacity
              }}
              className="relative w-full max-w-6xl"
            >
              <div className="relative flex items-center justify-center gap-0">
                
                {services.map((service, index) => (
                  <motion.div
                    key={service.id}
                    style={{
                      x: service.translateX,
                      filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4)) drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
                    }}
                    className="w-[380px] h-[500px] lg:w-[420px] lg:h-[525px] xl:w-[500px] xl:h-[550px]"
                  >
                    <div className="w-full h-full border-2 border-black bg-white flex flex-col overflow-hidden rounded-xl">
                      <div
                        className="py-4 px-6 text-center flex-shrink-0"
                        style={{
                          backgroundColor: service.badgeColor,
                          color: service.id === 'full-service' ? 'white' : 'black'
                        }}
                      >
                        <p className="font-semibold uppercase tracking-wide text-lg">{service.badge}</p>
                      </div>
                      <div
                        className="flex-1 flex flex-col relative"
                        style={{ backgroundColor: service.backgroundColor }}
                      >
                        <div className="flex items-center gap-3 relative z-10 px-6 pt-6">
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: service.id === 'full-service' ? '#444444' : '#ffd2bd' }}
                          >
                            <Rocket className="w-6 h-6" style={{ color: service.id === 'full-service' ? 'white' : 'black' }} />
                          </div>
                          <h3 className="text-black font-semibold text-3xl">{service.title}</h3>
                        </div>

                        <p className="text-black leading-relaxed relative z-10 px-6 pt-4 text-lg">
                          {service.description}
                        </p>

                        <div className="relative z-10 flex-1 px-6 pt-4">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2 mb-2">
                              <div className="w-5 h-5 rounded-full bg-[#65EC87] flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="w-4 h-4 text-black" strokeWidth={3} />
                              </div>
                              <span className="text-black text-lg">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {service.hasForm ? (
                          <form onSubmit={handleWaitlistSubmit} className="relative z-10 px-6 pb-6">
                            <input
                              type="email"
                              placeholder="Work email address"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#65EC87] text-black placeholder:text-gray-400 text-base mb-4"
                              disabled={isSubmitting}
                            />
                            <Button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full text-black rounded-full py-5 text-sm font-semibold"
                              style={{ backgroundColor: service.buttonColor }}
                            >
                              {isSubmitting ? "JOINING..." : "JOIN WAITLIST"}
                            </Button>
                          </form>
                        ) : (
                          <div className="px-6 pb-6 relative z-10">
                            <Button
                              onClick={service.buttonAction}
                              className="w-full text-white rounded-full py-5 text-sm font-semibold"
                              style={{ backgroundColor: service.buttonColor }}
                            >
                              {service.buttonText}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}