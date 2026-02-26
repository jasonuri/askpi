"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { IcpWidget } from "./icp-widget";

const PersonaSimulation = dynamic(
  () => import("@/components/PersonaSimulation/PersonaSimulation"),
  { ssr: false }
);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative w-full px-4 pt-20 pb-24 overflow-hidden"
    >
      <PersonaSimulation widgetRef={widgetRef} />
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal tracking-tight leading-tight text-foreground">
          Do You Really Know Your{" "}
          <span className="text-primary">Audience</span>?
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          We help you understand what moves and motivates your audience. Let&apos;s find out.
        </p>
        <div ref={widgetRef}>
          <IcpWidget />
        </div>
      </div>
    </section>
  );
}
