import { motion } from "motion/react";

export function BrandScroll() {
  // Sample brand names - replace with actual brands
  const brands = [
    "Glossier",
    "Warby Parker",
    "Allbirds",
    "Patagonia",
    "Spotify",
    "Notion",
    "Figma",
    "Discord",
    "Depop",
    "VSCO"
  ];

  // Duplicate brands for seamless loop
  const duplicatedBrands = [...brands, ...brands];

  return (
    <div className="w-full overflow-hidden py-4" style={{ display: 'none' }}>
      <p className="text-white/40 text-center mb-4 tracking-wide uppercase text-sm">
        Trusted by
      </p>
      <div className="relative">
        <motion.div
          className="flex gap-12"
          animate={{
            x: [0, -50 + "%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {duplicatedBrands.map((brand, index) => (
            <div
              key={index}
              className="flex-shrink-0 text-white/60 text-xl font-medium tracking-tight"
            >
              {brand}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}