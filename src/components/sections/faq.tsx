"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

type FAQCategory = "The Sprint" | "The Science" | "Working With Us";

const faqs: { question: string; answer: string; category: FAQCategory }[] = [
  {
    question: "What actually is an Audience Intelligence Sprint?",
    answer:
      "A focused engagement where we map the behavioural forces behind your audience's decisions. We use synthetic user research, Jobs to Be Done analysis, and behavioural science to produce a playbook you can act on — not a PDF that gathers dust. Discovery call to deliverables, typically within a week.",
    category: "The Sprint",
  },
  {
    question: "What do I get at the end?",
    answer:
      "A refined ICP, synthetic buyer personas, a decision force map for each segment, switching behaviour analysis, trigger and timing analysis, an audience language brief, a messaging playbook, and a 60-minute strategy debrief. Everything you need to sharpen positioning and messaging.",
    category: "The Sprint",
  },
  {
    question: "What do I need to provide?",
    answer:
      "Your website URL, a description of who you think your audience is, and 45 minutes for a discovery call. We handle the rest.",
    category: "The Sprint",
  },
  {
    question: "How is this different from traditional market research?",
    answer:
      "Traditional research asks people what they want and takes the answer at face value. We map what they actually do and why. Surveys capture stated preferences. We reveal decision behaviour. The gap between what people say and what they do is where the real insight lives.",
    category: "The Science",
  },
  {
    question: "What are the four behavioural forces?",
    answer:
      "Every decision is shaped by four forces: Push (frustration with the status quo), Pull (attraction to something new), Anxiety (fear of change), and Habit (comfort with how things are). We map all four for your specific audience — so you know exactly what to amplify and what to address.",
    category: "The Science",
  },
  {
    question: "How accurate is synthetic audience modelling?",
    answer:
      "Stanford research shows AI representations can replicate human behavioural patterns with up to 85% accuracy. It's not a replacement for talking to real people — it's a way to generate hypotheses and map patterns in hours, not weeks. We include validation prompts so you can test findings against real conversations.",
    category: "The Science",
  },
  {
    question: "Who is this for?",
    answer:
      "Teams that make audience-dependent decisions. Startups sharpening their go-to-market. Agencies delivering audience research for clients. Enterprise teams informing campaigns, briefs, or product strategy. The common thread: you need to understand why your audience decides, not just who they are.",
    category: "Working With Us",
  },
  {
    question: "Can I white-label the deliverables?",
    answer:
      "Yes. If you're an agency or consultancy, we can deliver in a format ready for your clients. Several agency partners use our sprint as the behavioural research layer behind their own strategy work.",
    category: "Working With Us",
  },
  {
    question: "Is my data confidential?",
    answer:
      "Completely. We never use your data to train models, share with other clients, or publish findings. Your research stays yours.",
    category: "Working With Us",
  },
];

const categories: FAQCategory[] = [
  "The Sprint",
  "The Science",
  "Working With Us",
];

export function FAQ() {
  const [activeCategory, setActiveCategory] =
    useState<FAQCategory>("The Sprint");

  const filtered = faqs.filter((f) => f.category === activeCategory);

  return (
    <section id="faq" className="w-full px-4 py-24">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-4 mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-widest">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-tight text-foreground">
            Got questions?
          </h2>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? "bg-foreground text-card"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <Accordion type="single" collapsible className="space-y-2">
          {filtered.map((faq, i) => (
            <AccordionItem
              key={`${activeCategory}-${i}`}
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
