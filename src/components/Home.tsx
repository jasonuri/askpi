import { Helmet } from "react-helmet-async";
import { Hero } from "./Hero";
import { Problem } from "./Problem";
import { HowItWorks } from "./HowItWorks";
import { UseCases } from "./UseCases";
import { Service } from "./Service";
import { FAQ } from "./FAQ";
import { BrandScroll } from "./BrandScroll";
import heroImage from 'figma:asset/e665c9f11ea03326d5d353882467fee42dd5af19.webp';
import heroImageSmall from 'figma:asset/e665c9f11ea03326d5d353882467fee42dd5af19-480w.webp';
import heroImageMedium from 'figma:asset/e665c9f11ea03326d5d353882467fee42dd5af19-800w.webp';
import heroImageLarge from 'figma:asset/e665c9f11ea03326d5d353882467fee42dd5af19-1200w.webp';
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useMemo } from "react";

export function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const missionContainerRef = useRef<HTMLDivElement>(null);
  const missionContentRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Track scroll progress of the mission section for card collapse effect
  const { scrollYProgress: missionCollapseProgress } = useScroll({
    target: missionContainerRef,
    offset: ["start start", "end start"]
  });
  
  // Track scroll progress of the mission section for word fade animation
  const { scrollYProgress: missionScrollProgress } = useScroll({
    target: missionContentRef,
    offset: ["start end", "end end"]
  });
  
  // Transform scale from 1 to 0.85 as user scrolls (hero section)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);
  
  // Transform scale and opacity for mission section card collapse
  const missionScale = useTransform(missionCollapseProgress, [0, 1], [1, 0.85]);
  const missionOpacity = useTransform(missionCollapseProgress, [0, 0.5, 1], [1, 0.8, 0.6]);
  
  // Mission statement text
  const missionText = "We build AI personas of your Gen Z customers to help you nail your positioning, creatives, and brand launch confidently. Powered by the latest LLMs, we transform your data to deeply understand your ICP and their customer journey.";
  const words = useMemo(() => missionText.split(" "), []);
  
  return (
    <main>
      <Helmet>
        <title>Uri - Consumer Research Platform for Gen Z</title>
        <meta
          name="description"
          content="Uri helps businesses understand Gen Z consumers through real-time insights, focus groups, and authentic research."
        />
        <meta property="og:title" content="Uri - Consumer Research Platform for Gen Z" />
        <meta
          property="og:description"
          content="Uri helps businesses understand Gen Z consumers through real-time insights, focus groups, and authentic research."
        />
        <meta property="og:image" content="https://www.hellouri.ai/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Uri - AI-powered consumer research platform for Gen Z" />
        <meta property="og:url" content="https://www.hellouri.ai/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Uri" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:site" content="@hellouri_ai" />
        <meta name="twitter:creator" content="@hellouri_ai" />
        <link rel="canonical" href="https://www.hellouri.ai/" />

        {/* Organization JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Uri",
            "url": "https://www.hellouri.ai",
            "logo": "https://www.hellouri.ai/favicon.png",
            "description": "Consumer research platform helping businesses understand Gen Z",
            "sameAs": [
              "https://www.linkedin.com/company/hellouri"
            ]
          })}
        </script>
      </Helmet>

      {/* Scrollable container for card stacking effect */}
      <div ref={containerRef} className="relative h-screen">
        {/* Hero Section with Image Background - Sticky */}
        <motion.div 
          style={{ scale, opacity }}
          className="sticky top-0 w-full h-screen bg-[#2a2a2a] px-4 pt-4 pb-0 origin-top flex items-center justify-center"
        >
          {/* Background Image */}
          <img
            src={heroImageLarge}
            srcSet={`${heroImageSmall} 480w, ${heroImageMedium} 800w, ${heroImageLarge} 1200w`}
            sizes="(max-width: 480px) 480px, (max-width: 800px) 800px, 1200px"
            alt="Uri AI persona dashboard showing synthetic Gen Z audience insights"
            className="w-full h-auto rounded-3xl"
            loading="eager"
          />
          
          {/* Overlay Content with Glassmorphism */}
          <div className="absolute inset-0 flex items-center justify-center px-4 py-12">
            <div className="max-w-6xl w-full">
              <Hero isOverlay={true} />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Mission Statement Section with Card Collapse */}
      <div ref={missionContainerRef} className="relative h-screen">
        <motion.section 
          ref={missionContentRef}
          style={{ scale: missionScale, opacity: missionOpacity }}
          className="sticky top-0 w-full h-screen bg-[#2a2a2a] flex flex-col items-center justify-center px-4 pt-20 pb-12 gap-12 origin-top"
        >
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-white font-[Instrument_Serif] text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight px-4">
              {words.map((word, index) => {
                // Calculate staggered opacity for each word based on its position
                const wordProgress = index / words.length;
                const start = wordProgress * 0.6;
                const end = Math.min(start + 0.4, 1);
                
                return (
                  <WordFade
                    key={index}
                    word={word}
                    scrollProgress={missionScrollProgress}
                    start={start}
                    end={end}
                    isLast={index === words.length - 1}
                  />
                );
              })}
            </p>
          </div>
          
          {/* Brand Scroll Section */}
          <div className="w-full">
            <BrandScroll />
          </div>
        </motion.section>
      </div>
      
      {/* Rest of the content - normal scroll */}
      <div className="relative z-10">
        {/* Challenge Header Section */}
        <Problem showOnlyHeader={true} />
        
        {/* Challenge Cards and Opportunity Section */}
        <Problem showOnlyCards={true} />
        
        <section id="features">
          <HowItWorks />
        </section>
        <section id="use-cases">
          <UseCases />
        </section>
        <Service />
        <section id="faq">
          <FAQ />
        </section>
      </div>
    </main>
  );
}

// Separate component for individual word fade animation
function WordFade({ 
  word, 
  scrollProgress, 
  start, 
  end, 
  isLast 
}: { 
  word: string; 
  scrollProgress: any; 
  start: number; 
  end: number; 
  isLast: boolean;
}) {
  const wordOpacity = useTransform(scrollProgress, [start, end], [0.15, 1]);
  
  return (
    <>
      <motion.span
        style={{ opacity: wordOpacity }}
        className="inline-block"
      >
        {word}
      </motion.span>
      {!isLast && " "}
    </>
  );
}