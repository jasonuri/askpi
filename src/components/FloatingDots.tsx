import { useEffect, useState } from "react";

interface Dot {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

export function FloatingDots() {
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    // Generate random dots
    const generateDots = () => {
      const newDots: Dot[] = [];
      const dotCount = 30; // More dots for better coverage

      for (let i = 0; i < dotCount; i++) {
        newDots.push({
          id: i,
          x: Math.random() * 100, // Percentage position
          y: Math.random() * 40 + 60, // Start from 60% down to avoid hero section
          size: Math.random() * 4 + 6, // 6-10px size (larger)
          delay: Math.random() * 5, // 0-5s delay
        });
      }
      setDots(newDots);
    };

    generateDots();
  }, []);

  return (
    <>
      {/* Add custom keyframes to global styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes floatUp {
            0% {
              transform: translateY(0px) scale(1);
              opacity: 0.6;
            }
            50% {
              transform: translateY(-20px) scale(1.1);
              opacity: 0.8;
            }
            100% {
              transform: translateY(-40px) scale(0.9);
              opacity: 0.4;
            }
          }
          
          @keyframes floatSide {
            0% {
              transform: translateX(0px) translateY(0px) scale(1);
              opacity: 0.5;
            }
            25% {
              transform: translateX(15px) translateY(-10px) scale(1.2);
              opacity: 0.7;
            }
            50% {
              transform: translateX(-10px) translateY(-20px) scale(0.8);
              opacity: 0.6;
            }
            75% {
              transform: translateX(-15px) translateY(-10px) scale(1.1);
              opacity: 0.8;
            }
            100% {
              transform: translateX(0px) translateY(0px) scale(1);
              opacity: 0.5;
            }
          }
          
          .floating-dot-up {
            animation: floatUp 8s ease-in-out infinite;
          }
          
          .floating-dot-side {
            animation: floatSide 12s ease-in-out infinite;
          }
        `
      }} />
      
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {dots.map((dot, index) => {
          // Create different color variations for visual interest
          const colorVariant = index % 4;
          let dotColor = '';
          
          switch (colorVariant) {
            case 0:
              dotColor = 'bg-blue-400/30'; // Soft blue
              break;
            case 1:
              dotColor = 'bg-purple-400/25'; // Soft purple
              break;
            case 2:
              dotColor = 'bg-indigo-400/35'; // Soft indigo
              break;
            case 3:
              dotColor = 'bg-sky-400/30'; // Soft sky blue
              break;
            default:
              dotColor = 'bg-blue-400/30';
          }
          
          return (
            <div
              key={dot.id}
              className={`absolute ${dotColor} rounded-full shadow-sm ${
                index % 2 === 0 ? 'floating-dot-up' : 'floating-dot-side'
              }`}
              style={{
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                width: `${dot.size}px`,
                height: `${dot.size}px`,
                animationDelay: `${dot.delay}s`,
                boxShadow: `0 0 ${dot.size * 2}px rgba(59, 130, 246, 0.15)`, // Soft blue glow
              }}
            />
          );
        })}
      </div>
    </>
  );
}