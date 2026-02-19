"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

type FAQCategory =
  | "Getting Started"
  | "The Research"
  | "Process & Delivery"
  | "Accuracy & Trust";

const faqs: { question: string; answer: string; category: FAQCategory }[] = [
  {
    question: "What is a Customer Intelligence Sprint?",
    answer:
      "A Customer Intelligence Sprint is a 72-hour engagement where we decode your buyers' switching story — the forces, triggers, and commitment patterns that explain why your best customers chose you. Using JTBD methodology combined with AI-powered synthetic audience research, we deliver a complete demand-side intelligence brief.",
    category: "Getting Started",
  },
  {
    question: "What is JTBD and why does it matter?",
    answer:
      "Jobs to Be Done (JTBD) is a framework that explains buying decisions through the lens of progress — what job was the buyer hiring your product to do? Unlike traditional research that asks 'who is your customer?', JTBD asks 'why did they switch?' Understanding that switching moment gives you a causal understanding of demand.",
    category: "Getting Started",
  },
  {
    question: "What is a switching moment?",
    answer:
      "The switching moment is the point where a buyer decides their current situation is no longer acceptable and commits to change. Every switching moment has a structure: a trigger event, growing dissatisfaction (push), attraction to alternatives (pull), fear of the new (anxiety), and attachment to the current way (inertia). We map all four forces.",
    category: "Getting Started",
  },
  {
    question: "How is this different from traditional market research?",
    answer:
      "Traditional research asks customers what they want and takes their answers at face value. We decode what they actually did and why. Surveys capture stated preferences. We map revealed behavior — the causal forces behind real switching decisions.",
    category: "Getting Started",
  },
  {
    question: "What is demand-side intelligence?",
    answer:
      "Demand-side intelligence is the understanding of why buyers switch — the forces, triggers, and circumstances that create demand for your solution. Most companies operate on supply-side thinking. Demand-side intelligence flips this: 'Here's why buyers are switching, let's align everything to that moment.'",
    category: "The Research",
  },
  {
    question: "What are decision forces?",
    answer:
      "Every buying decision is shaped by four forces: Push (frustration with the current situation), Pull (attraction to the new solution), Anxiety (fear about the new), and Inertia (attachment to current habits). We map all four forces for your specific buyers.",
    category: "The Research",
  },
  {
    question: "What is synthetic audience research?",
    answer:
      "Synthetic audience research uses AI to create representations of your target buyers based on real behavioral patterns, market data, and JTBD frameworks. Stanford studies show AI representations can replicate human behavioral patterns with up to 85% accuracy — and they're available instantly.",
    category: "The Research",
  },
  {
    question: "How does the sprint work?",
    answer:
      "Day 1: We analyze your website, competitive landscape, and market positioning. Day 2: Using JTBD methodology and synthetic audience research, we map decision forces, switching triggers, and commitment patterns. Day 3: We compile your intelligence brief and deliver it with a 60-minute strategy debrief.",
    category: "Process & Delivery",
  },
  {
    question: "What do I receive?",
    answer:
      "Your Sprint deliverable includes: positioning-reality gap analysis with alignment scoring, decision force map for each buyer segment, switching trigger identification, commitment pattern analysis, messaging language brief, and a 60-minute strategy debrief.",
    category: "Process & Delivery",
  },
  {
    question: "What do I need to provide?",
    answer:
      "Just your website URL and a brief description of who you believe your audience is. We handle all the research, analysis, and synthesis. You show up for the 60-minute debrief ready to sharpen your strategy.",
    category: "Process & Delivery",
  },
  {
    question: "How accurate is synthetic audience research?",
    answer:
      "Stanford research shows AI representations can replicate human behavioral patterns with up to 85% accuracy. While not a replacement for real customer interviews, synthetic research excels at pattern recognition and hypothesis generation.",
    category: "Accuracy & Trust",
  },
  {
    question: "How do I validate the findings?",
    answer:
      "We recommend a 'trust but verify' approach. Your brief includes specific validation prompts — exact questions to ask real customers. Most clients find that 70-80% of findings match their intuition while 20-30% reveal genuine blind spots.",
    category: "Accuracy & Trust",
  },
  {
    question: "Is my data confidential?",
    answer:
      "Absolutely. Your research, analysis, and results are completely confidential. We never use your data to train AI models, share with other clients, or publish findings. We use Anthropic's Claude specifically because of their commitment to data privacy.",
    category: "Accuracy & Trust",
  },
];

const categories: FAQCategory[] = [
  "Getting Started",
  "The Research",
  "Process & Delivery",
  "Accuracy & Trust",
];

export function FAQ() {
  const [activeCategory, setActiveCategory] =
    useState<FAQCategory>("Getting Started");

  const filtered = faqs.filter((f) => f.category === activeCategory);

  return (
    <section id="faq" className="w-full px-4 py-24 bg-muted/50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm font-medium text-primary uppercase tracking-widest">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground">
            Got Questions?
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about switching intelligence
          </p>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <Accordion type="single" collapsible className="space-y-2">
          {filtered.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-card rounded-lg border border-border px-6"
            >
              <AccordionTrigger className="text-left text-foreground hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
