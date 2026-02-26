create table insight_phrases (
  id bigint generated always as identity primary key,
  text text not null,
  source text not null,
  year smallint not null,
  active boolean default true,
  created_at timestamptz default now()
);

alter table insight_phrases enable row level security;
create policy "Public read" on insight_phrases for select using (true);

-- Seed data: curated audience intelligence stats
insert into insight_phrases (text, source, year) values
  ('77% of B2B buyers do own research first', 'Gartner', 2025),
  ('65% of deals shaped by digital content', 'Forrester', 2024),
  ('71% expect personalised interactions', 'McKinsey', 2024),
  ('Only 5% of buyers are in-market now', 'LinkedIn', 2025),
  ('Buyers are 70% decided before contact', 'Gartner', 2024),
  ('Companies with ICP win 68% more deals', 'HubSpot', 2025),
  ('80% of revenue from 20% of customers', 'Salesforce', 2024),
  ('B2B buying groups average 11 people', 'Gartner', 2025),
  ('Personalisation lifts revenue by 40%', 'McKinsey', 2024),
  ('95% of decisions driven by emotion', 'Harvard', 2024),
  ('47% view 3–5 pieces before engaging', 'Demand Gen', 2024),
  ('Aligned teams grow 19% faster', 'Forrester', 2025),
  ('92% trust peer recommendations', 'Nielsen', 2024),
  ('60% of pipeline from existing accounts', '6sense', 2025),
  ('Average B2B deal cycle is 6–9 months', 'Gartner', 2025),
  ('73% frustrated by irrelevant outreach', 'Salesforce', 2024),
  ('Marketers waste 26% of budget on wrong audience', 'Rakuten', 2024),
  ('88% value experience as much as product', 'Salesforce', 2025),
  ('ICP-targeted ads get 2.3x higher CTR', 'Google', 2024),
  ('62% drop vendors with poor content', 'DemandBase', 2024),
  ('Top 10% of leads drive 80% of revenue', 'Forrester', 2025),
  ('Audience research cuts CAC by 50%', 'HubSpot', 2025),
  ('42% of startups fail on no market need', 'CB Insights', 2024),
  ('Data-driven firms are 23x more likely to acquire customers', 'McKinsey', 2024),
  ('B2B buyers shortlist only 2–3 vendors', 'G2', 2025);
