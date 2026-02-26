"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { SectionHeader } from "@/components/ui/section-header";

type FAQCategory =
  | "Getting Started"
  | "The Research"
  | "Process & Delivery"
  | "Accuracy & Trust";

const faqs: { question: string; answer: string; category: FAQCategory }[] = [
  {
    question: "What is an Audience Intelligence Sprint?",
    answer:
      "An Audience Intelligence Sprint is a 72-hour engagement where we map the behavioural forces behind your audience's decisions — the triggers, motivations, and barriers that explain why they choose you (or don't). Using AI-powered audience modelling grounded in behavioural science, we deliver a complete intelligence brief you can act on immediately.",
    category: "Getting Started",
  },
  {
    question: "How is this different from traditional market research?",
    answer:
      "Traditional research asks people what they want and takes their answers at face value. We map what they actually do and why. Surveys capture stated preferences — we reveal actual decision behaviour. The gap between what people say and what they do is where the real insight lives.",
    category: "Getting Started",
  },
  {
    question: "What are the four behavioural forces?",
    answer:
      "Every decision is shaped by four forces: Frustration (dissatisfaction pushing them away from the status quo), Attraction (what draws them toward a new solution), Hesitation (fear or uncertainty about change), and Habit (attachment to the current way of doing things). We map all four forces for your specific audience.",
    category: "Getting Started",
  },
  {
    question: "Who is this for?",
    answer:
      "AskPhi works with three types of clients: startups sharpening their go-to-market and audience definition, behavioural science agencies delivering audience research for their clients, and enterprise teams (like Channel 4, Fremantle, and Pion) who need strategic audience intelligence to inform campaigns, briefs, and business decisions.",
    category: "Getting Started",
  },
  {
    question: "What is AI-powered audience modelling?",
    answer:
      "We use AI to create representations of your target audience based on real behavioural patterns, market data, and decision science frameworks. Stanford research shows AI representations can replicate human behavioural patterns with up to 85% accuracy — and they're available in hours, not weeks.",
    category: "The Research",
  },
  {
    question: "Can I white-label the deliverables for my clients?",
    answer:
      "Yes. If you're an agency or consultancy, we can deliver the intelligence brief in a format ready for your clients. Many agencies use our sprint as the behavioural research layer behind their own strategy recommendations.",
    category: "The Research",
  },
  {
    question: "How does the sprint work day by day?",
    answer:
      "Day 1: We analyse your website, competitive landscape, and market positioning to identify gaps. Day 2: Using AI-powered audience modelling, we map behavioural forces, decision triggers, and segment profiles. Day 3: We compile your intelligence brief and deliver it with a 60-minute strategy debrief.",
    category: "Process & Delivery",
  },
  {
    question: "What do I receive?",
    answer:
      "Your Sprint deliverable includes: digital presence and positioning analysis, behavioural audience modelling, a decision force map for each audience segment, trigger and timing analysis, behavioural segment profiles, an audience language brief, and a 60-minute strategy debrief.",
    category: "Process & Delivery",
  },
  {
    question: "What do I need to provide?",
    answer:
      "Just your website URL and a brief description of who you believe your audience is. We handle all the research, analysis, and synthesis. You show up for the 60-minute debrief ready to sharpen your strategy.",
    category: "Process & Delivery",
  },
  {
    question: "How accurate is AI-powered audience modelling?",
    answer:
      "Stanford research shows AI representations can replicate human behavioural patterns with up to 85% accuracy. While not a replacement for real audience interviews, AI-powered modelling excels at pattern recognition and hypothesis generation — giving you a behavioural map to validate and build on.",
    category: "Accuracy & Trust",
  },
  {
    question: "How do I validate the findings?",
    answer:
      "We recommend a 'trust but verify' approach. Your brief includes specific validation prompts — exact questions to ask real audience members. Most clients find that 70-80% of findings match their intuition while 20-30% reveal genuine blind spots.",
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
        <SectionHeader
          label="FAQ"
          title="Got Questions?"
          description="Everything you need to know about audience intelligence"
        />

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
