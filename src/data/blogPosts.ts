export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
  };
  date: string;
  readTime: number;
  metaDescription: string;
  keywords: string[];
  image?: string;
  imageAlt?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "understanding-gen-z-consumer-behavior",
    title: "Understanding Gen Z Consumer Behavior in 2026",
    excerpt: "Discover the key trends shaping how Gen Z makes purchasing decisions and what brands need to know to connect authentically with this generation.",
    content: "[Content to be added by content team]",
    author: {
      name: "Jason Nguyen",
      role: "Co-Founder & CEO"
    },
    date: "2026-01-24",
    readTime: 8,
    metaDescription: "Explore the latest insights into Gen Z consumer behavior and learn how to create authentic connections with the most digitally-native generation.",
    keywords: ["Gen Z", "consumer behavior", "market research", "consumer insights", "Gen Z marketing"]
  },
  {
    slug: "ai-powered-market-research-guide",
    title: "The Complete Guide to AI-Powered Market Research",
    excerpt: "Learn how artificial intelligence is revolutionizing market research and enabling businesses to gather deeper insights faster than ever before.",
    content: "[Content to be added by content team]",
    author: {
      name: "Elliott Prince",
      role: "Co-Founder & CPTO"
    },
    date: "2026-01-20",
    readTime: 10,
    metaDescription: "A comprehensive guide to using AI for market research, including best practices, tools, and real-world applications.",
    keywords: ["AI", "market research", "artificial intelligence", "consumer insights", "research automation"]
  },
  {
    slug: "building-authentic-brand-connections",
    title: "Building Authentic Brand Connections with Gen Z",
    excerpt: "Gen Z values authenticity above all else. Learn the strategies successful brands use to build genuine connections with this discerning audience.",
    content: "[Content to be added by content team]",
    author: {
      name: "Vanessa Hoh",
      role: "Co-Founder"
    },
    date: "2026-01-15",
    readTime: 7,
    metaDescription: "Discover proven strategies for building authentic brand connections with Gen Z consumers through transparency, purpose, and genuine engagement.",
    keywords: ["brand authenticity", "Gen Z marketing", "brand strategy", "consumer engagement", "brand building"]
  }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
