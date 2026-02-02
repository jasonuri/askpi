import { Users, MessageCircle, TrendingUp, Clock, Target, FileText, BarChart3, Zap, AlertTriangle, DollarSign } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { Pill } from "./Pill";
import exampleImage from 'figma:asset/840fa504e4320458f1b634a3fb3954aab9226079.webp';
import challengeImage from 'figma:asset/6be16f7f596dd076321aa52cf56618b9901eae4e.webp';
import secondImage from 'figma:asset/22f125e73dc7b00276116335ee29315f06475c2f.webp';
import thirdImage from 'figma:asset/6955d5d8200c43264a095dbe397d6301c04edf05.webp';
import { useRef } from "react";

interface ProblemProps {
  showOnlyHeader?: boolean;
  showOnlyCards?: boolean;
}

export function Problem({ showOnlyHeader = false, showOnlyCards = false }: ProblemProps) {
  const challenges = [
    {
      title: "Hard to Recruit for Focus Groups",
      description: "Getting Gen Zs into a focus group can be slow, expensive, because of their lack of enthusiasm for it.",
      icon: Users,
      color: "from-yellow-400 to-yellow-500",
      borderColor: "border-yellow-400"
    },
    {
      title: "Living in Private Channels",
      description: "Gen Z spends time on closed apps like Snapchat, Discord, and WhatsApp - making them harder to reach and understand.",
      icon: Zap,
      color: "from-green-400 to-green-500",
      borderColor: "border-green-400"
    },
    {
      title: "Culture Moves Too Fast",
      description: "By the time you get the insights from focus groups and surveys, the trend has shifted. Gen Z culture evolves daily.",
      icon: Clock,
      color: "from-pink-400 to-pink-500",
      borderColor: "border-pink-400"
    },
    {
      title: "The Opportunity Cost",
      description: "Gen Z is projected to have $12 trillion in spending power by 2030. They make up 32% of the global population. You can't afford to guess.",
      icon: Target,
      color: "from-purple-400 to-purple-500",
      borderColor: "border-purple-400"
    }
  ];

  // Hooks must be called at the top level, not conditionally
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"]
  });

  // Each challenge occupies roughly 1/4 of the scroll with smooth, slower transitions
  // All challenges start from bottom and slide up
  // Challenge 1: starts from bottom, slowly slides to center, stays longer, then slides up and out
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.25], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.25], [500, 0, 0, -300]);
  
  // Challenge 2: starts from bottom, slowly slides to center, stays longer, then slides up and out
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.5], [500, 0, 0, -300]);
  
  // Challenge 3: starts from bottom, slowly slides to center, stays longer, then slides up and out
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.75], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.75], [500, 0, 0, -300]);
  
  // Challenge 4: starts from bottom, slowly slides to center, stays visible
  const opacity4 = useTransform(scrollYProgress, [0.75, 0.85, 1], [0, 1, 1]);
  const y4 = useTransform(scrollYProgress, [0.75, 0.85, 1], [500, 0, 0]);

  // Image transitions: fade between images as cards change
  const imageOpacity1 = useTransform(scrollYProgress, [0, 0.25, 0.3], [1, 1, 0]);
  const imageOpacity2 = useTransform(scrollYProgress, [0.25, 0.3, 0.5, 0.55], [0, 1, 1, 0]);
  const imageOpacity3 = useTransform(scrollYProgress, [0.5, 0.55, 0.75, 0.8], [0, 1, 1, 0]);
  const imageOpacity4 = useTransform(scrollYProgress, [0.75, 0.8, 1], [0, 1, 1]);

  // Show only header section
  if (showOnlyHeader) {
    return (
      <section className="w-full px-4 pt-6 pb-16 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[#2a2a2a]" />
        
        {/* Floating geometric shapes */}
        <motion.div 
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-gray-300/20 to-gray-400/20 rounded-full blur-xl"
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        
        <motion.div 
          className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-gray-200/20 to-gray-300/20 rounded-lg rotate-45 blur-xl"
          animate={{ 
            rotate: [45, 75, 45],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <motion.div 
          className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-br from-gray-300/30 to-gray-400/30 rounded-full blur-lg"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -15, 0]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* SECTION 1: Problem/Pain Points */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Pill>The Challenge</Pill>
            
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mt-8 mb-6 font-[Instrument_Serif]"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              The Traditional Research Playbook is Broken for Gen Z
            </motion.h2>
            
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Globally, businesses spend up to <span className="font-bold text-[rgba(255,113,78,1)]">$140 billion</span> a year on consumer research and insights, yet struggle to connect with Gen Zs.
            </motion.p>
            
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
            >
              This means: Wasted Budget. Missed Opportunities. Launching Based on Guesswork.
            </motion.p>
          </motion.div>
        </div>
      </section>
    );
  }

  // Show only cards and opportunity section
  if (showOnlyCards) {
    return (
      <section className="w-full relative bg-[#2a2a2a]">
        {/* MOBILE VERSION - Simple Stacked Cards */}
        <div className="block lg:hidden px-4 py-16">
          <div className="max-w-2xl mx-auto space-y-8">
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#3a3a3a] rounded-2xl p-6 border-2 border-white/20 shadow-xl"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-peach rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                    <span className="text-lg font-bold text-black">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-[Instrument_Serif] mb-2">
                      {challenge.title}
                    </h3>
                    <p className="text-base text-white/80 leading-relaxed">
                      {challenge.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* DESKTOP VERSION - Scroll-triggered sticky section with challenges */}
        <div ref={scrollContainerRef} className="hidden lg:block relative bg-[#2a2a2a]" style={{ height: '700vh' }}>
          {/* Animated Background - positioned absolutely to cover the tall container */}
          <div className="absolute inset-0 bg-[#2a2a2a] pointer-events-none" />
          
          {/* Floating geometric shapes */}
          <motion.div 
            className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-gray-300/20 to-gray-400/20 rounded-full blur-xl pointer-events-none"
            animate={{ 
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          
          <motion.div 
            className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-gray-200/20 to-gray-300/20 rounded-lg rotate-45 blur-xl pointer-events-none"
            animate={{ 
              rotate: [45, 75, 45],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          <motion.div 
            className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-br from-gray-300/30 to-gray-400/30 rounded-full blur-lg pointer-events-none"
            animate={{ 
              x: [0, 30, 0],
              y: [0, -15, 0]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          {/* Sticky content - this stays in view while scrolling through the 300vh */}
          <div className="sticky top-32 h-screen w-full flex items-start justify-center pt-16">
            <div className="max-w-7xl mx-auto w-full px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
                {/* Left: Sticky Image */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Progress Bar on the left */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-8 h-64 w-1 bg-white/20 rounded-full overflow-hidden">
                    <motion.div 
                      className="w-full bg-gradient-to-b from-accent via-primary to-coral rounded-full"
                      style={{ 
                        height: useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
                      }}
                    />
                  </div>

                  <div className="relative">
                    <motion.div 
                      className="absolute -inset-8 bg-gradient-to-br from-primary/20 via-accent/20 to-coral/20 rounded-3xl blur-2xl"
                      animate={{ 
                        scale: [1, 1.05, 1],
                        opacity: [0.3, 0.5, 0.3]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    
                    <div className="relative w-full">
                      {/* First image - fades out when second card appears */}
                      <motion.img
                        src={challengeImage}
                        alt="Gen Z Focus Group"
                        className="relative w-full h-auto object-cover rounded-3xl shadow-2xl"
                        style={{ opacity: imageOpacity1 }}
                        loading="lazy"
                      />

                      {/* Second image - fades in when second card appears, fades out for third */}
                      <motion.img
                        src={secondImage}
                        alt="Gen Z on Private Channels"
                        className="absolute top-0 left-0 w-full h-auto object-cover rounded-3xl shadow-2xl"
                        style={{ opacity: imageOpacity2 }}
                        loading="lazy"
                      />

                      {/* Third image - fades in when third card appears */}
                      <motion.img
                        src={thirdImage}
                        alt="Fast-Moving Culture"
                        className="absolute top-0 left-0 w-full h-auto object-cover rounded-3xl shadow-2xl"
                        style={{ opacity: imageOpacity3 }}
                        loading="lazy"
                      />

                      {/* Fourth image - fades in when fourth card appears */}
                      <motion.img
                        src={exampleImage}
                        alt="Gen Z Consumer"
                        className="absolute top-0 left-0 w-full h-auto object-cover rounded-3xl shadow-2xl"
                        style={{ opacity: imageOpacity4 }}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Right: Changing content based on scroll - slides up */}
                <div className="relative h-[400px] overflow-hidden">
                  {/* Challenge 1 */}
                  <motion.div
                    className="absolute inset-0 w-full"
                    style={{ 
                      opacity: opacity1,
                      y: y1
                    }}
                  >
                    <div className="relative">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-peach rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-lg font-bold text-black">1</span>
                        </div>
                        <h3 className="text-4xl font-bold text-white" style={{ fontFamily: "'Instrument Serif', serif" }}>
                          {challenges[0].title}
                        </h3>
                      </div>
                      
                      <p className="text-lg text-white/80 leading-relaxed">
                        {challenges[0].description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Challenge 2 */}
                  <motion.div
                    className="absolute inset-0 w-full"
                    style={{ 
                      opacity: opacity2,
                      y: y2
                    }}
                  >
                    <div className="relative">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-peach rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-lg font-bold text-black">2</span>
                        </div>
                        <h3 className="text-4xl font-bold text-white" style={{ fontFamily: "'Instrument Serif', serif" }}>
                          {challenges[1].title}
                        </h3>
                      </div>
                      
                      <p className="text-lg text-white/80 leading-relaxed">
                        {challenges[1].description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Challenge 3 */}
                  <motion.div
                    className="absolute inset-0 w-full"
                    style={{ 
                      opacity: opacity3,
                      y: y3
                    }}
                  >
                    <div className="relative">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-peach rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-lg font-bold text-black">3</span>
                        </div>
                        <h3 className="text-4xl font-bold text-white" style={{ fontFamily: "'Instrument Serif', serif" }}>
                          {challenges[2].title}
                        </h3>
                      </div>
                      
                      <p className="text-lg text-white/80 leading-relaxed">
                        {challenges[2].description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Challenge 4 */}
                  <motion.div
                    className="absolute inset-0 w-full"
                    style={{ 
                      opacity: opacity4,
                      y: y4
                    }}
                  >
                    <div className="relative">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-peach rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-lg font-bold text-black">4</span>
                        </div>
                        <h3 className="text-4xl font-bold text-white" style={{ fontFamily: "'Instrument Serif', serif" }}>
                          {challenges[3].title}
                        </h3>
                      </div>
                      
                      <p className="text-lg text-white/80 leading-relaxed">
                        {challenges[3].description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Original full section (not used with current implementation)
  return (
    <section className="w-full px-4 pt-32 pb-16 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[#2a2a2a]" />
      
      {/* Floating geometric shapes */}
      <motion.div 
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-gray-300/20 to-gray-400/20 rounded-full blur-xl"
        animate={{ 
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      
      <motion.div 
        className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-gray-200/20 to-gray-300/20 rounded-lg rotate-45 blur-xl"
        animate={{ 
          rotate: [45, 75, 45],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div 
        className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-br from-gray-300/30 to-gray-400/30 rounded-full blur-lg"
        animate={{ 
          x: [0, 30, 0],
          y: [0, -15, 0]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* SECTION 1: Problem/Pain Points */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Pill>The Challenge</Pill>
          
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-8 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Marketing to Gen Z is harder than ever.
          </motion.h2>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-4xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            Don't worry you're not alone. Globally, businesses spend up to <span className="font-bold text-[rgba(255,113,78,1)]">$140 billion</span> a year on consumer research and insights, yet struggle to connect with Gen Zs.
          </motion.p>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
          >
            This means: Wasted Budget. Missed Opportunities. Launching Based on Guesswork.
          </motion.p>
        </motion.div>

        {/* Challenge cards - centered */}
        <motion.div 
          className="mb-32"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-3 gap-8">
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 30, rotateX: 45 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  rotateX: -5,
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className={`absolute -inset-1 ${
                  index === 0 ? 'bg-gradient-to-br from-accent/40 to-coral/30' :
                  index === 1 ? 'bg-gradient-to-br from-primary/40 to-accent/30' :
                  'bg-gradient-to-br from-coral/40 to-peach/40'
                } rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300`} />
                
                <div className="relative bg-[#3a3a3a] rounded-2xl p-6 h-64 flex flex-col border-2 border-white/20 shadow-xl">
                  <div className={`w-12 h-12 bg-peach rounded-full flex items-center justify-center mb-4 shadow-lg`}>
                    <span className="text-lg font-bold text-black">{index + 1}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-3 leading-tight">
                    {challenge.title}
                  </h3>
                  
                  <p className="text-sm text-white/80 leading-relaxed flex-1">
                    {challenge.description}
                  </p>
                  
                  <motion.div 
                    className="mt-4 h-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full overflow-hidden"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: 1 + index * 0.3 }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className={`h-full ${
                        index === 0 ? 'bg-gradient-to-r from-accent to-coral' :
                        index === 1 ? 'bg-gradient-to-r from-primary to-accent' :
                        'bg-gradient-to-r from-coral to-peach'
                      } rounded-full`}
                      initial={{ x: "-100%" }}
                      whileInView={{ x: "0%" }}
                      transition={{ duration: 1, delay: 1.5 + index * 0.3 }}
                      viewport={{ once: true }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SECTION 2: Opportunity & Urgency */}
        <div className="relative">
          {/* Dark background for opportunity section */}
          <div className="absolute inset-0 bg-[#1f1f1f] rounded-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(101,236,135,0.1),transparent_50%)] rounded-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,130,122,0.1),transparent_50%)] rounded-3xl" />
          
          <div className="relative p-8 md:p-12">
            {/* Opportunity headline */}
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
                style={{ fontFamily: "'Instrument Serif', serif" }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Gen Z is expected to have up to{" "}
                <span className="bg-gradient-to-r from-accent to-coral bg-clip-text text-transparent">
                  $12 trillion
                </span>
                <br />
                in spending power by 2030.
              </motion.h2>
            </motion.div>

            {/* Main content area with creative layout */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Opportunity description */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl blur-xl" />
                  <div className="relative bg-[#3a3a3a]/90 backdrop-blur-sm p-8 rounded-2xl border-2 border-white/20 shadow-xl">
                    <p className="text-lg text-white/80 leading-relaxed mb-4">
                      <span className="font-bold text-white">Gen Z makes up 32% of the global population.</span> You know you need to reach them.
                    </p>

                    <p className="text-lg text-white/80 leading-relaxed mb-6">
                      But whether it's campaigns, product positioning, brand messaging, or content strategy - all your marketing efforts feel like they're hitting a brick wall.
                    </p>

                    {/* Impact list */}
                    <div className="mt-6">
                      <p className="text-lg text-white/80 mb-3">This means:</p>
                      <ul className="space-y-2">
                        <li className="text-lg text-white/80 flex items-center font-bold">
                          <span className="mr-3">→</span>
                          Wasted Budget
                        </li>
                        <li className="text-lg text-white/80 flex items-center font-bold">
                          <span className="mr-3">→</span>
                          Missed Opportunities
                        </li>
                        <li className="text-lg text-white/80 flex items-center font-bold">
                          <span className="mr-3">→</span>
                          Launching Based on Guesswork
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right: Gen Z image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative">
                  <motion.div 
                    className="absolute -inset-8 bg-gradient-to-br from-primary/20 via-accent/20 to-coral/20 rounded-3xl blur-2xl"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  
                  <img
                    src={exampleImage}
                    alt="Young woman representing Gen Z consumer"
                    className="relative w-full max-w-lg mx-auto h-auto object-contain rounded-3xl shadow-2xl border-4 border-white/20"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}