import { SUPABASE_URL, publicAnonKey } from "./supabase";

export interface Insight {
  text: string;
  source: string;
  year: number;
}

// Hardcoded fallback — used when Supabase is unreachable
const fallbackInsights: Insight[] = [
  { text: "77% of B2B buyers do own research first", source: "Gartner", year: 2025 },
  { text: "65% of deals shaped by digital content", source: "Forrester", year: 2024 },
  { text: "71% expect personalised interactions", source: "McKinsey", year: 2024 },
  { text: "Only 5% of buyers are in-market now", source: "LinkedIn", year: 2025 },
  { text: "Buyers are 70% decided before contact", source: "Gartner", year: 2024 },
  { text: "Companies with ICP win 68% more deals", source: "HubSpot", year: 2025 },
  { text: "80% of revenue from 20% of customers", source: "Salesforce", year: 2024 },
  { text: "B2B buying groups average 11 people", source: "Gartner", year: 2025 },
  { text: "Personalisation lifts revenue by 40%", source: "McKinsey", year: 2024 },
  { text: "95% of decisions driven by emotion", source: "Harvard", year: 2024 },
  { text: "47% view 3–5 pieces before engaging", source: "Demand Gen", year: 2024 },
  { text: "Aligned teams grow 19% faster", source: "Forrester", year: 2025 },
  { text: "92% trust peer recommendations", source: "Nielsen", year: 2024 },
  { text: "60% of pipeline from existing accounts", source: "6sense", year: 2025 },
  { text: "Average B2B deal cycle is 6–9 months", source: "Gartner", year: 2025 },
  { text: "73% frustrated by irrelevant outreach", source: "Salesforce", year: 2024 },
  { text: "Marketers waste 26% of budget on wrong audience", source: "Rakuten", year: 2024 },
  { text: "88% value experience as much as product", source: "Salesforce", year: 2025 },
  { text: "ICP-targeted ads get 2.3x higher CTR", source: "Google", year: 2024 },
  { text: "62% drop vendors with poor content", source: "DemandBase", year: 2024 },
  { text: "Top 10% of leads drive 80% of revenue", source: "Forrester", year: 2025 },
  { text: "Audience research cuts CAC by 50%", source: "HubSpot", year: 2025 },
  { text: "42% of startups fail on no market need", source: "CB Insights", year: 2024 },
  { text: "Data-driven firms are 23x more likely to acquire customers", source: "McKinsey", year: 2024 },
  { text: "B2B buyers shortlist only 2–3 vendors", source: "G2", year: 2025 },
];

export async function fetchInsights(): Promise<Insight[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/insight_phrases?select=text,source,year&active=eq.true`,
      {
        headers: {
          apikey: publicAnonKey,
          Authorization: `Bearer ${publicAnonKey}`,
        },
      }
    );
    if (!res.ok) throw new Error(res.statusText);
    const data: Insight[] = await res.json();
    return data.length > 0 ? data : fallbackInsights;
  } catch {
    return fallbackInsights;
  }
}
