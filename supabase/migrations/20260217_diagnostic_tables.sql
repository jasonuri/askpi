-- Migration: Create diagnostic_leads and diagnostic_reports tables
-- Date: 2026-02-17

CREATE TABLE diagnostic_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  website_url TEXT NOT NULL,
  stated_audience TEXT NOT NULL,
  email TEXT,
  company_name TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE diagnostic_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES diagnostic_leads(id) ON DELETE CASCADE,
  report_part1 JSONB NOT NULL,
  report_part2 JSONB,
  raw_research TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_diagnostic_reports_lead_id ON diagnostic_reports(lead_id);
