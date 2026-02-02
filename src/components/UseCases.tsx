import { Zap, Shield, Palette } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Pill } from "./Pill";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function UseCases() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress through the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Text opacity: appears when image locks
  const textOpacity = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.35], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.1], [50, 0]);
  
  // Description paragraph opacity and position (appears below cards and stays during flip)
  const descriptionOpacity = useTransform(scrollYProgress, [0, 0.1, 0.75, 0.85], [0, 1, 1, 0]);
  const descriptionY = useTransform(scrollYProgress, [0, 0.1], [30, 0]);

  // Scale: shrink before splitting, then collapse at the end
  const containerScale = useTransform(scrollYProgress, [0.25, 0.35, 0.85, 1], [1, 0.9, 0.9, 0.3]);

  // Card positions: start touching (forming one image), then split apart with overlap, then collapse back
  const leftCardX = useTransform(scrollYProgress, [0.35, 0.5, 0.85, 0.98], [-350, -340, -340, 0]);
  const centerCardX = useTransform(scrollYProgress, [0.35, 0.5, 0.85, 0.98], [0, 0, 0, 0]);
  const rightCardX = useTransform(scrollYProgress, [0.35, 0.5, 0.85, 0.98], [350, 340, 340, 0]);
  
  // Fan rotation on Z-axis - rotate out then back to flat
  const leftCardRotateZ = useTransform(scrollYProgress, [0.35, 0.5, 0.85, 0.98], [0, -12, -12, 0]);
  const rightCardRotateZ = useTransform(scrollYProgress, [0.35, 0.5, 0.85, 0.98], [0, 12, 12, 0]);
  
  // Slight Y offset for fan effect - then collapse vertically
  const leftCardY = useTransform(scrollYProgress, [0.35, 0.5, 0.85, 0.98], [0, 30, 30, 0]);
  const rightCardY = useTransform(scrollYProgress, [0.35, 0.5, 0.85, 0.98], [0, 30, 30, 0]);
  
  // Opacity: fade out during collapse
  const cardsOpacity = useTransform(scrollYProgress, [0.88, 1], [1, 0]);

  const useCases = [
    {
      icon: Shield,
      title: "Stress Test Your Campaign",
      description: "If you need to test the full campaign before launch. Walk into your launch knowing what will work—not hoping it will.",
      translateX: leftCardX,
      translateY: leftCardY,
      rotateZ: leftCardRotateZ,
      zIndex: 1,
      backgroundColor: "#E9D5FF" // Electric purple
    },
    {
      icon: Palette,
      title: "Campaign Creative & Messaging",
      description: "If you need to know what catches attention and resonates—before production. Test ad variants and messaging with up to 50 AI personas.",
      translateX: centerCardX,
      translateY: useTransform(scrollYProgress, [0, 1], [0, 0]),
      rotateZ: useTransform(scrollYProgress, [0, 1], [0, 0]), // stays flat
      zIndex: 2,
      backgroundColor: "#D1FAE5" // Neon mint
    },
    {
      icon: Zap,
      title: "Product Positioning & Concepts",
      description: "If you need to validate positioning strategies and product ideas before development.",
      translateX: rightCardX,
      translateY: rightCardY,
      rotateZ: rightCardRotateZ,
      zIndex: 3,
      backgroundColor: "#CFFAFE" // Soft cyan
    }
  ];

  return (
    <section id="use-cases" className="w-full px-4 py-16 bg-[#2a2a2a]">
      <div className="max-w-7xl mx-auto">
        
        {/* MOBILE VERSION - Simple Stacked Cards */}
        <div className="block lg:hidden">
          <div className="text-center space-y-4 mb-12">
            <Pill>Use Cases</Pill>
            <h2 className="text-3xl font-bold text-foreground font-[Instrument_Serif]">
              What do you <em className="italic">need</em> testing?
            </h2>
            <p className="text-base text-muted-foreground max-w-xl mx-auto px-4">
              Test it here, before it's out there. From brand narratives to product launch positioning, get data-backed insights that help you understand, position and launch with confidence.
            </p>
          </div>
          
          <div className="space-y-6 max-w-md mx-auto">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="rounded-xl overflow-hidden border-2 border-black/20 shadow-xl">
                  <CardContent 
                    className="p-6 space-y-4"
                    style={{ backgroundColor: useCase.backgroundColor }}
                  >
                    <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <useCase.icon className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="font-semibold text-black text-xl">{useCase.title}</h3>
                    <p className="text-black leading-relaxed">{useCase.description}</p>
                  </CardContent>
                </Card>
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
                opacity: textOpacity,
                y: textY
              }}
              className="absolute top-8 left-1/2 -translate-x-1/2 text-center space-y-4 z-10 w-full max-w-3xl px-4"
            >
              <Pill>Use Cases</Pill>
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground font-[Instrument_Serif]">
                What do you <em className="italic">need</em> testing?
              </h2>
            </motion.div>
            
            {/* Description paragraph below cards */}
            <motion.div 
              style={{ 
                opacity: descriptionOpacity,
                y: descriptionY
              }}
              className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center z-10 w-full max-w-2xl px-4"
            >
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Test it here, before it's out there. From brand narratives to product launch positioning, get data-backed insights that help you understand, position and launch with confidence.
              </p>
            </motion.div>

            <motion.div 
              style={{ 
                scale: containerScale,
                opacity: cardsOpacity
              }}
              className="relative w-full max-w-6xl mx-auto h-[500px]"
            >
              {useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  style={{
                    x: useCase.translateX,
                    y: useCase.translateY,
                    rotateZ: useCase.rotateZ,
                    zIndex: useCase.zIndex,
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4)) drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
                  }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[450px] lg:w-[300px] lg:h-[475px] xl:w-[350px] xl:h-[500px]"
                >
                  <Card className="h-full rounded-xl overflow-hidden border-2 border-black/20">
                    <CardContent
                      className="p-8 space-y-4 rounded-xl h-full flex flex-col justify-center relative"
                      style={{ backgroundColor: useCase.backgroundColor }}
                    >
                      {/* Shimmer overlay effect */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.3) 100%)',
                          mixBlendMode: 'overlay'
                        }}
                      />
                      {/* Subtle gradient for depth */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 70%)'
                        }}
                      />

                      <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                        <useCase.icon className="w-6 h-6 text-black" />
                      </div>
                      <h3 className="font-semibold text-black text-xl relative z-10 text-[20px]">{useCase.title}</h3>
                      <p className="text-black leading-relaxed relative z-10">{useCase.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}