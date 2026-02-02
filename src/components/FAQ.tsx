import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Pill } from "./Pill";

type FAQCategory = "Getting Started" | "Features" | "Accuracy" | "Technical & Privacy";

interface FAQItem {
  question: string;
  answer: string;
  category: FAQCategory;
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<FAQCategory>("Getting Started");

  const faqs: FAQItem[] = [
    {
      question: "What is Uri and how does it work?",
      answer: "Uri is an AI-powered audience insights platform that helps you understand your target customers instantly and also test your marketing before you launch.\\n\\nTell Uri who you want to reach - from broad audiences like \"Gen Z consumers\" to specific ones like \"Gen Z college students in New York who care about sustainable fashion.\" Uri creates up to 50 AI personas with realistic personalities, communication styles, and behaviors that mirror real people.\\n\\nChat with these personas individually or as a group. Test your headlines, campaigns, or creative content and get instant feedback. Uri automatically extracts insights and creates reports you can share with your team.",
      category: "Getting Started"
    },
    {
      question: "What exactly are AI Audiences?",
      answer: "AI Audiences are groups of AI personas that think and respond just like your real customers would. Each persona has their own personality and communication style.\\n\\nThink of it like having your target audience ready to give feedback 24/7. You can test ideas and get responses instantly - faster and cheaper than traditional research.",
      category: "Getting Started"
    },
    {
      question: "Why should I use AI focus groups instead of traditional ones?",
      answer: "Traditional focus groups take weeks to set up and cost thousands of dollars. With Uri, you get feedback from up to 50 personas instantly for a fraction of the cost.\\n\\nNo scheduling, no-shows, or one person dominating the conversation. You can test multiple ideas, ask follow-up questions immediately, and revisit the same group whenever you need them.",
      category: "Getting Started"
    },
    {
      question: "What's the cost difference?",
      answer: "Uri costs about 80% less than traditional focus groups. While conventional research can cost up to $40,000 per project, Uri gives you results in minutes instead of months.",
      category: "Getting Started"
    },
    {
      question: "How long does setup take?",
      answer: "About 2-3 minutes. Describe your audience, generate personas, and start testing immediately.",
      category: "Getting Started"
    },
    {
      question: "How is this different from just sending out surveys?",
      answer: "Surveys give you static answers to set questions. Uri lets you have dynamic conversations where you can dig deeper and explore unexpected insights.\\n\\nInstead of yes/no answers, you get rich feedback that explains the \\\"why\\\" behind responses. You can change direction instantly based on what you're learning.",
      category: "Features"
    },
    {
      question: "How is Uri different from using ChatGPT for research?",
      answer: "ChatGPT gives you one generic perspective. Uri creates up to 50 specialized personas with consistent personalities and behavioral patterns.\\n\\nPut them all in a chat room, ask questions, and get diverse viewpoints. We've built in polling, analytics, and exportable insights specifically for marketing decisions.",
      category: "Features"
    },
    {
      question: "What types of content can I test?",
      answer: "You can test any text or visual content: ad campaigns, headlines, emails, social media posts, website copy, packaging designs, and brand messaging.\\n\\nFor video testing, email us at jason@hellouri.ai.",
      category: "Features"
    },
    {
      question: "How do I share results with my team?",
      answer: "Export conversation transcripts, summaries, and insight reports as PDFs. The dashboard automatically organizes findings, quotes, and recommendations in a clear format.",
      category: "Features"
    },
    {
      question: "Can I customize personas for specific audiences?",
      answer: "Yes. Be as specific or broad as you like when describing your target audience.\\n\\nYou can also import your own data like customer transcripts or spreadsheets to make personas more accurate. Plus, you can edit or delete individual personas after they're created.",
      category: "Features"
    },
    {
      question: "Do you only generate insights for Gen Z, or can I research other audiences?",
      answer: "While we focus on helping brands understand Gen Z, you can use Uri for any audience - millennials, Gen X, baby boomers, or niche segments.\\n\\nWe work on various projects outside of this core focus. If you're interested, email us at vanessa@hellouri.ai to discuss your specific needs.",
      category: "Features"
    },
    {
      question: "How accurate are these AI personas compared to real people?",
      answer: "Stanford research shows AI personas can replicate human behavior with up to 85% accuracy. While not perfect, they're highly accurate at representing group patterns and preferences.\\n\\nThe more data you provide about your audience, the more accurate your personas become. We're constantly improving based on real customer feedback.",
      category: "Accuracy"
    },
    {
      question: "How do I know these personas are accurate enough to trust?",
      answer: "We're not trying to replace real human interviews - we're making focus groups faster and more accessible.\\n\\nCombined with extensive prompt engineering, we're confident Uri creates personas that reflect human behavior well enough to guide decision-making. Many users validate key findings with small real-world tests.",
      category: "Accuracy"
    },
    {
      question: "Do the responses sound robotic?",
      answer: "We've trained our AI not to sound 'AI-like'. Each persona has their own communication style and vocabulary based on their background.\\n\\nYou'll get diverse, natural responses that reflect real personality differences.",
      category: "Accuracy"
    },
    {
      question: "Can you create personas for international markets?",
      answer: "Yes, but our data works best for Western markets. For other regions, we need specific audience data from you to capture cultural nuances accurately.\\n\\nIf you don't have that data, we work with partners to fill in the gaps and ensure authentic local insights.",
      category: "Accuracy"
    },
    {
      question: "How do you create these AI personas?",
      answer: "We use Claude as the LLM to generate the AI personas. Combined with extensive prompting Uri builds each persona based on demographic data, psychological profiles, behavioral patterns, and cultural context specific to your target audience to generate AI personas that predict human behaviour.",
      category: "Technical & Privacy"
    },
    {
      question: "How do you handle data bias?",
      answer: "We minimize bias through careful prompt engineering and explicitly instruct our AI not to inject assumptions into responses.\\n\\nWe use Anthropic as our AI provider because of their ethical approach to AI development and transparent research standards.",
      category: "Technical & Privacy"
    },
    {
      question: "Is my data used to train other AI models?",
      answer: "No, your data stays your data. We never use your research or conversations to train other AI models or share with other users.\\n\\nYour insights remain completely confidential to your organization.",
      category: "Technical & Privacy"
    }
  ];

  const categories: FAQCategory[] = ["Getting Started", "Features", "Accuracy", "Technical & Privacy"];
  
  const filteredFaqs = faqs.filter(faq => faq.category === activeCategory);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full px-4 py-16 bg-[#2a2a2a]">
      {/* FAQPage JSON-LD structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer.replace(/\\n\\n/g, ' ')
            }
          }))
        })}
      </script>

      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <Pill>FAQ</Pill>
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-foreground font-[Instrument_Serif]">
            Got Questions?
          </h2>
          <p className="text-lg text-foreground/70">
            Everything you need to know about Uri's AI focus groups
          </p>
        </div>

        {/* Category Tabs - Sticky */}
        <div className="sticky top-0 z-10 bg-[#2a2a2a] pb-6 mb-8">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setOpenIndex(null);
                }}
                className={`px-6 py-3 rounded-full border transition-all whitespace-nowrap backdrop-blur-md ${
                  activeCategory === category
                    ? "bg-white text-black border-white/20"
                    : "bg-[#6a6a6a]/80 text-gray-300 border-white/20 hover:text-white hover:bg-[#6a6a6a]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#6a6a6a]/80 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden transition-all hover:bg-[#6a6a6a] hover:border-white/40"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <span className="text-white pr-4 text-lg">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6 text-gray-300 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-300 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-8 pb-6 animate-in slide-in-from-top-2 duration-200">
                  <div className="pt-4 border-t border-white/20">
                    <div className="text-gray-300 leading-relaxed space-y-4">
                      {faq.answer.split('\\n\\n').map((paragraph, pIndex) => (
                        <p key={pIndex}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}