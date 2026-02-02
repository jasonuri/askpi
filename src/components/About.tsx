import { Helmet } from "react-helmet-async";
import { Button } from "./ui/button";
import { MapPin, Linkedin, Mail } from "lucide-react";
import jasonPhoto from 'figma:asset/c7a094102c04770a049649678bee8972612e4311.webp';
import jasonPhotoSmall from 'figma:asset/c7a094102c04770a049649678bee8972612e4311-160w.webp';
import vanessaPhoto from 'figma:asset/d226d88d03af27ba316f2c80bdbe64f77c542eb7.webp';
import vanessaPhotoSmall from 'figma:asset/d226d88d03af27ba316f2c80bdbe64f77c542eb7-160w.webp';
import elliottPhoto from 'figma:asset/84de9bd378b84833b5d3c9a87db70b876161a95a.webp';
import elliottPhotoSmall from 'figma:asset/84de9bd378b84833b5d3c9a87db70b876161a95a-160w.webp';

export function About() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>About Uri - Meet the Team Behind Gen Z Research</title>
        <meta
          name="description"
          content="Learn about Uri's mission and meet the founders dedicated to revolutionizing consumer research for Gen Z audiences."
        />
        <meta property="og:title" content="About Uri - Meet the Team Behind Gen Z Research" />
        <meta
          property="og:description"
          content="Learn about Uri's mission and meet the founders dedicated to revolutionizing consumer research for Gen Z audiences."
        />
        <meta property="og:image" content="https://www.hellouri.ai/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Uri - AI-powered consumer research platform for Gen Z" />
        <meta property="og:url" content="https://www.hellouri.ai/about" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Uri" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:site" content="@hellouri_ai" />
        <meta name="twitter:creator" content="@hellouri_ai" />
        <link rel="canonical" href="https://www.hellouri.ai/about" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "mainEntity": {
              "@type": "Organization",
              "name": "Uri",
              "url": "https://www.hellouri.ai",
              "description": "AI-powered consumer research platform for Gen Z",
              "founder": [
                {
                  "@type": "Person",
                  "name": "Jason Nguyen",
                  "jobTitle": "Co-Founder & CEO",
                  "workLocation": {
                    "@type": "Place",
                    "address": "London"
                  },
                  "sameAs": "https://www.linkedin.com/in/jasonvunguyen/",
                  "email": "jason@hellouri.ai"
                },
                {
                  "@type": "Person",
                  "name": "Vanessa Hoh",
                  "jobTitle": "Co-Founder",
                  "workLocation": {
                    "@type": "Place",
                    "address": "New York"
                  },
                  "sameAs": "https://www.linkedin.com/in/vanessa-hoh-aa73928a/",
                  "email": "vanessa@hellouri.ai"
                },
                {
                  "@type": "Person",
                  "name": "Elliott Prince",
                  "jobTitle": "Co-Founder & CPTO",
                  "workLocation": {
                    "@type": "Place",
                    "address": "London"
                  },
                  "sameAs": "https://www.linkedin.com/in/elliott-prince-a5a42a18/",
                  "email": "elliott@hellouri.ai"
                }
              ]
            }
          })}
        </script>
      </Helmet>

      {/* Hero Section - Soft gradient like home page */}
      <section className="w-full px-4 py-12 md:py-24 bg-[#2a2a2a]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4 text-[12px] md:text-[14px] font-bold">
            OUR STORY & MISSION
          </p>
          <h1 className="mb-4 md:mb-6 md:text-[57px] font-bold leading-tight font-[Instrument_Serif] text-[64px]">
            About <span className="text-primary">Uri</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Meet the team behind Uri and discover how we're transforming consumer research with AI-powered audiences.
          </p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="w-full px-4 py-8 md:py-16 bg-[#2a2a2a]">
        <div className="max-w-7xl mx-auto text-center">
          
          {/* Founder Cards - Updated to minimal theme with black borders */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-16">
            <div className="bg-background/40 backdrop-blur-md rounded-3xl p-8 md:p-10 text-center shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden mx-auto mb-6 ring-2 ring-primary/20">
                <img
                  src={jasonPhoto}
                  srcSet={`${jasonPhotoSmall} 160w, ${jasonPhoto} 320w`}
                  sizes="(max-width: 768px) 160px, 192px"
                  alt="Jason Nguyen, Co-Founder and CEO of Uri"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="mb-2 text-foreground font-[Instrument_Serif] text-[32px]">Jason Nguyen</h3>
              <p className="text-foreground font-medium mb-2 text-sm">Co-Founder & CEO</p>
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-4">
                <MapPin className="w-4 h-4" />
                <span>London</span>
              </div>
              <p className="text-sm text-muted-foreground italic leading-relaxed">Former pro poker player - 11 years+ in reading human patterns, decision-making, and predicting behaviour under uncertainty.</p>
              <div className="flex items-center justify-center gap-3 mt-6">
                <a 
                  href="https://www.linkedin.com/in/jasonvunguyen/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-primary/20 hover:bg-primary/30 p-2.5 rounded-full transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-primary" />
                </a>
                <a 
                  href="mailto:jason@hellouri.ai"
                  className="bg-primary/20 hover:bg-primary/30 p-2.5 rounded-full transition-colors"
                >
                  <Mail className="w-5 h-5 text-primary" />
                </a>
              </div>
            </div>
            
            <div className="bg-background/40 backdrop-blur-md rounded-3xl p-8 md:p-10 text-center shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden mx-auto mb-6 ring-2 ring-primary/20">
                <img
                  src={vanessaPhoto}
                  srcSet={`${vanessaPhotoSmall} 160w, ${vanessaPhoto} 320w`}
                  sizes="(max-width: 768px) 160px, 192px"
                  alt="Vanessa Hoh, Co-Founder of Uri"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="mb-2 text-foreground font-[Instrument_Serif] text-[32px]">Vanessa Hoh</h3>
              <p className="text-foreground font-medium mb-2 text-sm">Co-Founder</p>
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-4">
                <MapPin className="w-4 h-4" />
                <span>New York</span>
              </div>
              <p className="text-sm text-muted-foreground italic leading-relaxed">Former FCA regulator, wellness brand founder and content creator for brands. Understands corporate and consumer brand communication.</p>
              <div className="flex items-center justify-center gap-3 mt-6">
                <a 
                  href="https://www.linkedin.com/in/vanessa-hoh-aa73928a/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-primary/20 hover:bg-primary/30 p-2.5 rounded-full transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-primary" />
                </a>
                <a 
                  href="mailto:vanessa@hellouri.ai"
                  className="bg-primary/20 hover:bg-primary/30 p-2.5 rounded-full transition-colors"
                >
                  <Mail className="w-5 h-5 text-primary" />
                </a>
              </div>
            </div>
            
            <div className="bg-background/40 backdrop-blur-md rounded-3xl p-8 md:p-10 text-center shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden mx-auto mb-6 ring-2 ring-primary/20">
                <img
                  src={elliottPhoto}
                  srcSet={`${elliottPhotoSmall} 160w, ${elliottPhoto} 320w`}
                  sizes="(max-width: 768px) 160px, 192px"
                  alt="Elliott Prince, Co-Founder and CPTO of Uri"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="mb-2 text-foreground font-[Instrument_Serif] text-[32px]">Elliott Prince</h3>
              <p className="text-foreground font-medium mb-2 text-sm">Co-Founder & CPTO</p>
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-4">
                <MapPin className="w-4 h-4" />
                <span>London</span>
              </div>
              <p className="text-sm text-muted-foreground italic leading-relaxed">7+ yrs as Director of Product & Design. Delivering multi-million £ projects for Post Office, Mitie, Bacardi.</p>
              <div className="flex items-center justify-center gap-3 mt-6">
                <a 
                  href="https://www.linkedin.com/in/elliott-prince-a5a42a18/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-primary/20 hover:bg-primary/30 p-2.5 rounded-full transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-primary" />
                </a>
                <a 
                  href="mailto:elliott@hellouri.ai"
                  className="bg-primary/20 hover:bg-primary/30 p-2.5 rounded-full transition-colors"
                >
                  <Mail className="w-5 h-5 text-primary" />
                </a>
              </div>
            </div>
          </div>

          {/* Story Section - Updated with gradient background */}
          <div className="mb-8 md:mb-16">
            <p className="text-muted-foreground mb-4 md:mb-6 text-base md:text-lg leading-relaxed">
              Their backgrounds couldn't be more different but through their own personal experiences they learnt -
            </p>
            <blockquote className="md:text-2xl font-medium text-foreground italic md:pl-6 bg-background p-4 md:p-6 rounded-lg shadow-sm leading-relaxed font-[Instrument_Serif] text-[36px] font-bold font-normal">
              "If you don't understand your target audience deeply, you can't build a product, community or tell stories that resonate."
            </blockquote>
          </div>
        </div>
      </section>

      {/* What We Built Section - Updated with softer gradient */}
      <section className="w-full px-4 py-8 md:py-16 bg-[#2a2a2a]">
        <div className="max-w-4xl mx-auto">
          <div className="relative group">
          </div>
        </div>
      </section>

      {/* CTA Section - Updated styling */}
      <section className="w-full px-4 py-8 md:py-16 bg-[#2a2a2a]">
        <div className="max-w-4xl mx-auto">
        </div>
      </section>

    </div>
  );
}