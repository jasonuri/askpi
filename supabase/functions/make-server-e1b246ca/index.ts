import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";
import Anthropic from "npm:@anthropic-ai/sdk@0.39.0";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getSupabase() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
}

function getAnthropic() {
  return new Anthropic({ apiKey: Deno.env.get("ANTHROPIC_API_KEY")! });
}

async function scrapeWebsite(url: string): Promise<string> {
  const jinaUrl = `https://r.jina.ai/${url}`;
  const res = await fetch(jinaUrl, {
    headers: { Accept: "text/markdown" },
  });
  if (!res.ok) {
    throw new Error(`Failed to scrape website: ${res.status}`);
  }
  const text = await res.text();
  // Truncate to ~8000 chars to keep Claude prompt reasonable
  return text.slice(0, 8000);
}

const REPORT_PART1_PROMPT = `You are an ICP (Ideal Customer Profile) analyst. You analyze websites to figure out who is actually paying a company money, and whether their marketing matches reality.

You will receive:
1. Scraped content from a company's website
2. The audience description the company believes is their target

Your task: Analyze the website content and produce a structured ICP report. Be direct, evidence-based, and write in plain language. No marketing jargon or buzzwords.

ANALYSIS APPROACH:
- Start with "Who is paying them money?" — look at pricing signals, testimonials, case studies, language patterns
- Identify the PRIMARY buyer based on evidence from the website, not assumptions
- For each audience segment, build a psychographic sketch: what they value, what frustrates them, what triggers them to seek a solution
- Compare what the company SAYS their audience is vs what the website SIGNALS
- Note what you're confident about and what you couldn't verify from the website alone

WRITING STYLE:
- Plain, direct language — write like you're briefing a smart friend
- Specific over generic — "Series B SaaS founders who just hired a VP of Marketing" not "business leaders"
- Evidence-based — cite specific signals from the website (pricing page language, testimonial quotes, feature framing)
- Honest about limitations — if the website doesn't give enough signal, say so

AVOID: "actionable insights", "data-driven", "customer-centric", "holistic", "comprehensive", "leverage", "synergy", "customer journey", "pain points"

Return ONLY valid JSON matching this exact schema (no markdown, no explanation, just JSON):

{
  "companyOverview": {
    "name": "string",
    "description": "string (2-3 sentences in plain language — what do they actually do?)",
    "valueProp": "string (their core promise, in their own words if possible)",
    "businessModel": "string (e.g. SaaS, marketplace, agency, etc.)",
    "industry": "string",
    "stage": "string (e.g. Early Stage, Growth, Enterprise)",
    "confidence": "high|moderate|low"
  },
  "primaryICP": {
    "summary": "string (2-3 sentences — who is most likely paying them money and why?)",
    "jobTitles": ["string array of 3-5 likely buyer job titles"],
    "companyTypes": ["string array of 2-4 company types"],
    "problemsSolved": ["string array of 3-5 problems these buyers are trying to solve"],
    "evidence": ["string array of 3-5 specific evidence points from the website"],
    "confidence": "high|moderate|low"
  },
  "audienceSegments": [
    {
      "name": "string (descriptive segment name)",
      "description": "string (1-2 sentences — who are these people?)",
      "demographics": "string",
      "behaviors": ["string array of 3-4 observable behavioral patterns"],
      "needs": ["string array of 2-3 things they're trying to accomplish"],
      "triggers": ["string array of 2-3 events that make them start looking for a solution"],
      "confidence": "high|moderate|low"
    }
  ],
  "gapAnalysis": {
    "statedAudience": "string (what they said their audience is)",
    "actualAudience": "string (what the website actually signals)",
    "alignmentScore": 0-100,
    "gaps": [
      {
        "category": "string",
        "stated": "string (what they believe)",
        "reality": "string (what signals suggest)",
        "severity": "low|medium|high"
      }
    ],
    "blindSpots": ["string array of 2-4 things they seem to be missing"],
    "limitations": ["string array of 1-3 things we couldn't verify from the website alone"]
  }
}`;

const REPORT_PART2_PROMPT = `You are an ICP analyst producing a deep Part 2 report. You have already produced a Part 1 report. Now go deeper on psychographics, language patterns, and communication strategy.

Write in plain, direct language. Be specific and evidence-based. No marketing jargon.

Using the Part 1 report and original website content, produce:

1. PSYCHOGRAPHIC PROFILES — For each segment, go deep:
   - What do they value? What are they optimizing for in their career/life?
   - What are they aspiring to become or achieve?
   - What keeps them up at night? What are they afraid of?
   - Where do they get information? Who do they trust?
   - How do they make decisions? (fast/slow, data-driven/gut, committee/solo)

2. LANGUAGE & VOICE ANALYSIS — For each segment:
   - What vocabulary do they actually use? (pull from the website's testimonials, case studies, reviews)
   - What's their emotional tone when talking about this problem?
   - What phrases come up again and again?
   - What questions are they asking before they buy?
   - What words or framings would turn them off?
   - Include real or realistic quotes with sources

3. COMMUNICATION PLAYBOOK — For each segment:
   - What to say (messages that resonate)
   - What NOT to say (messages that backfire)
   - Best channels to reach them
   - Events or situations that make them receptive to outreach
   - 3-5 behavioral science principles that apply (e.g. social proof, loss aversion, authority bias) — explain WHY each one works for this specific segment

Return ONLY valid JSON matching this exact schema:

{
  "psychographicProfiles": [
    {
      "segmentName": "string",
      "values": ["string array"],
      "aspirations": ["string array"],
      "fears": ["string array"],
      "informationSources": ["string array"],
      "decisionStyle": "string"
    }
  ],
  "languageAnalysis": [
    {
      "segmentName": "string",
      "vocabulary": ["string array of words/phrases they actually use"],
      "emotionalTone": "string",
      "recurringPhrases": ["string array"],
      "questionsTheyAsk": ["string array"],
      "wordsTheyAvoid": ["string array"],
      "realQuotes": [{ "quote": "string", "source": "string" }]
    }
  ],
  "communicationPlaybook": [
    {
      "segmentName": "string",
      "doSay": ["string array"],
      "dontSay": ["string array"],
      "channelRecommendations": ["string array"],
      "behavioralTriggers": ["string array"],
      "cognitiveBiasesToLeverage": ["string array — format: 'Principle Name: Why it works for this segment'"]
    }
  ]
}`;

const TEASER_PROMPT = `You are an ICP (Ideal Customer Profile) analyst giving a compelling preview of what a full analysis would reveal.

You will receive:
1. Scraped content from a company's website
2. The audience description the company believes is their target

Your task: Generate exactly 5 compelling bullet points (~250 words total) that preview key insights from an ICP analysis. Each bullet should cover one of these themes:

1. **Audience Gap** — A surprising disconnect between who they think they're targeting and who their website actually signals to
2. **Hidden Buyer** — A buyer segment they're likely missing that their product/content accidentally attracts
3. **Messaging Mismatch** — Where their positioning language doesn't match how real buyers think about the problem
4. **Decision Force** — A key push, pull, anxiety, or inertia force they haven't addressed in their messaging
5. **Opportunity** — A specific, actionable insight about an untapped positioning angle or segment

WRITING STYLE:
- Direct, specific, and evidence-based — cite signals from the website
- Each bullet should feel like a revelation, not generic advice
- Use plain language, no marketing jargon
- Each bullet: bold theme label, then 1-2 sentences of insight
- Make the reader think "I need to see the full report"

Format each bullet as:
**Theme Label:** Insight text here.

Start directly with the first bullet. No preamble or introduction.`;

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-e1b246ca/health", (c) => {
  return c.json({ status: "ok" });
});

// Newsletter subscription endpoint
app.post("/make-server-e1b246ca/subscribe", async (c) => {
  try {
    const { email } = await c.req.json();
    
    if (!email) {
      return c.json({ error: "Email is required" }, 400);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ error: "Invalid email format" }, 400);
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.log("Error sending subscription email: RESEND_API_KEY not configured");
      return c.json({ error: "Email service not configured" }, 500);
    }

    // Send email using Resend
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: "Subscriptions@hellouri.ai",
        subject: "New Newsletter Subscription",
        html: `<p>New newsletter subscription request:</p><p><strong>Email:</strong> ${email}</p>`,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.log(`Error sending subscription email: ${errorData}`);
      return c.json({ error: "Failed to send subscription email" }, 500);
    }

    const data = await response.json();
    console.log("Subscription email sent successfully:", data);
    
    return c.json({ success: true, message: "Subscription email sent successfully" });
  } catch (error) {
    console.log(`Error in subscription endpoint: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// ---------------------------------------------------------------------------
// POST /diagnostic/start — Analyze a website and produce ReportPart1
// ---------------------------------------------------------------------------
app.post("/make-server-e1b246ca/diagnostic/start", async (c) => {
  const startTime = Date.now();
  try {
    const { websiteUrl, statedAudience } = await c.req.json();

    if (!websiteUrl || !statedAudience) {
      return c.json({ error: "websiteUrl and statedAudience are required" }, 400);
    }

    const supabase = getSupabase();
    const anthropic = getAnthropic();

    // 1. Create lead record
    const { data: lead, error: leadError } = await supabase
      .from("diagnostic_leads")
      .insert({
        website_url: websiteUrl,
        stated_audience: statedAudience,
        status: "processing",
      })
      .select("id")
      .single();

    if (leadError) {
      console.error("Lead insert error:", leadError);
      return c.json({ error: "Failed to create lead" }, 500);
    }

    // 2. Scrape website content
    let scrapedContent: string;
    try {
      scrapedContent = await scrapeWebsite(websiteUrl);
    } catch (err) {
      console.error("Scrape error:", err);
      scrapedContent = `[Could not scrape website. URL: ${websiteUrl}. Analyze based on URL structure and stated audience only.]`;
    }

    // 3. Call Claude for ReportPart1
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: `${REPORT_PART1_PROMPT}

--- WEBSITE CONTENT ---
${scrapedContent}

--- STATED AUDIENCE ---
${statedAudience}

Produce the JSON report now.`,
        },
      ],
    });

    // Extract text from Claude response
    const responseText = message.content
      .filter((block: any) => block.type === "text")
      .map((block: any) => block.text)
      .join("");

    // Parse JSON — Claude may wrap in ```json ... ```
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("No JSON found in Claude response:", responseText.slice(0, 500));
      return c.json({ error: "Failed to parse analysis" }, 500);
    }

    const report = JSON.parse(jsonMatch[0]);

    // Ensure statedAudience is filled in the gap analysis
    if (report.gapAnalysis) {
      report.gapAnalysis.statedAudience = statedAudience;
    }

    // 4. Store report
    const { error: reportError } = await supabase
      .from("diagnostic_reports")
      .insert({
        lead_id: lead.id,
        report_part1: report,
        raw_research: scrapedContent,
      });

    if (reportError) {
      console.error("Report insert error:", reportError);
    }

    // 5. Update lead status
    const processingTime = Date.now() - startTime;
    await supabase
      .from("diagnostic_leads")
      .update({
        status: "complete",
        company_name: report.companyOverview?.name || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", lead.id);

    console.log(`Diagnostic complete for ${websiteUrl} in ${processingTime}ms`);

    return c.json({ leadId: lead.id, report });
  } catch (error) {
    console.error("Diagnostic start error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// ---------------------------------------------------------------------------
// POST /diagnostic/teaser — Stream a teaser preview via SSE
// ---------------------------------------------------------------------------
app.post("/make-server-e1b246ca/diagnostic/teaser", async (c) => {
  try {
    const { websiteUrl, statedAudience } = await c.req.json();

    if (!websiteUrl || !statedAudience) {
      return c.json({ error: "websiteUrl and statedAudience are required" }, 400);
    }

    const supabase = getSupabase();
    const anthropic = getAnthropic();

    // 1. Create lead record
    const { data: lead, error: leadError } = await supabase
      .from("diagnostic_leads")
      .insert({
        website_url: websiteUrl,
        stated_audience: statedAudience,
        status: "teaser_streaming",
      })
      .select("id")
      .single();

    if (leadError) {
      console.error("Lead insert error:", leadError);
      return c.json({ error: "Failed to create lead" }, 500);
    }

    // 2. Scrape website content
    let scrapedContent: string;
    try {
      scrapedContent = await scrapeWebsite(websiteUrl);
    } catch (err) {
      console.error("Scrape error:", err);
      scrapedContent = `[Could not scrape website. URL: ${websiteUrl}. Analyze based on URL structure and stated audience only.]`;
    }

    // 3. Stream Claude response as SSE
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        const sendEvent = (data: any) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        };

        // Send leadId first
        sendEvent({ type: "leadId", leadId: lead.id });

        let fullText = "";

        try {
          const messageStream = anthropic.messages.stream({
            model: "claude-sonnet-4-5-20250929",
            max_tokens: 1024,
            messages: [
              {
                role: "user",
                content: `${TEASER_PROMPT}\n\n--- WEBSITE CONTENT ---\n${scrapedContent}\n\n--- STATED AUDIENCE ---\n${statedAudience}\n\nGenerate the 5 bullet point preview now.`,
              },
            ],
          });

          for await (const event of messageStream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              const text = event.delta.text;
              fullText += text;
              sendEvent({ type: "text", text });
            }
          }

          // Save teaser content to lead record
          await supabase
            .from("diagnostic_leads")
            .update({
              teaser_content: fullText,
              status: "teaser_complete",
              updated_at: new Date().toISOString(),
            })
            .eq("id", lead.id);

          sendEvent({ type: "done" });
        } catch (err) {
          console.error("Stream error:", err);
          sendEvent({ type: "error", error: "Analysis failed" });
        }

        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error("Diagnostic teaser error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// ---------------------------------------------------------------------------
// POST /diagnostic/unlock — Capture email, queue ReportPart2
// ---------------------------------------------------------------------------
app.post("/make-server-e1b246ca/diagnostic/unlock", async (c) => {
  try {
    const { leadId, email, bookDemo, websiteUrl, statedAudience } = await c.req.json();

    if (!leadId || !email) {
      return c.json({ error: "leadId and email are required" }, 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ error: "Invalid email format" }, 400);
    }

    const supabase = getSupabase();

    // Update lead with email
    const { error: updateError } = await supabase
      .from("diagnostic_leads")
      .update({
        email,
        status: "unlocked",
        updated_at: new Date().toISOString(),
      })
      .eq("id", leadId);

    if (updateError) {
      console.error("Lead update error:", updateError);
      return c.json({ error: "Failed to update lead" }, 500);
    }

    // Fetch the lead and report
    const { data: lead } = await supabase
      .from("diagnostic_leads")
      .select("*, diagnostic_reports(*)")
      .eq("id", leadId)
      .single();

    if (!lead) {
      return c.json({ error: "Lead not found" }, 404);
    }

    const anthropic = getAnthropic();
    let report1: any;
    let rawResearch: string = "";

    if (lead.diagnostic_reports?.length > 0) {
      // Existing flow — report already exists
      report1 = lead.diagnostic_reports[0].report_part1;
      rawResearch = lead.diagnostic_reports[0].raw_research || "";
    } else {
      // Teaser-only flow — generate Part 1 first
      try {
        const siteUrl = websiteUrl || lead.website_url;
        const audience = statedAudience || lead.stated_audience;

        // Scrape website
        try {
          rawResearch = await scrapeWebsite(siteUrl);
        } catch (err) {
          console.error("Scrape error:", err);
          rawResearch = `[Could not scrape website. URL: ${siteUrl}. Analyze based on URL structure and stated audience only.]`;
        }

        // Generate Part 1
        const message = await anthropic.messages.create({
          model: "claude-sonnet-4-5-20250929",
          max_tokens: 4096,
          messages: [
            {
              role: "user",
              content: `${REPORT_PART1_PROMPT}\n\n--- WEBSITE CONTENT ---\n${rawResearch}\n\n--- STATED AUDIENCE ---\n${audience}\n\nProduce the JSON report now.`,
            },
          ],
        });

        const responseText = message.content
          .filter((block: any) => block.type === "text")
          .map((block: any) => block.text)
          .join("");

        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          report1 = JSON.parse(jsonMatch[0]);
          if (report1.gapAnalysis) {
            report1.gapAnalysis.statedAudience = audience;
          }

          // Store Part 1 report
          await supabase
            .from("diagnostic_reports")
            .insert({
              lead_id: lead.id,
              report_part1: report1,
              raw_research: rawResearch,
            });

          // Update lead with company name
          await supabase
            .from("diagnostic_leads")
            .update({
              company_name: report1.companyOverview?.name || null,
              updated_at: new Date().toISOString(),
            })
            .eq("id", lead.id);
        }
      } catch (err) {
        console.error("Part 1 generation error:", err);
      }
    }

    // Generate Part 2 and send email (if we have Part 1)
    if (report1) {
      try {
        const message = await anthropic.messages.create({
          model: "claude-sonnet-4-5-20250929",
          max_tokens: 4096,
          messages: [
            {
              role: "user",
              content: `${REPORT_PART2_PROMPT}\n\n--- PART 1 REPORT ---\n${JSON.stringify(report1, null, 2)}\n\n--- ORIGINAL WEBSITE CONTENT ---\n${rawResearch.slice(0, 4000)}\n\nProduce the Part 2 JSON report now.`,
            },
          ],
        });

        const responseText = message.content
          .filter((block: any) => block.type === "text")
          .map((block: any) => block.text)
          .join("");

        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const report2 = JSON.parse(jsonMatch[0]);

          // Store Part 2
          await supabase
            .from("diagnostic_reports")
            .update({ report_part2: report2 })
            .eq("lead_id", leadId);

          // Send email with full report
          const resendApiKey = Deno.env.get("RESEND_API_KEY");
          if (resendApiKey) {
            const companyName = report1.companyOverview?.name || "Your Company";
            const emailHtml = buildReportEmail(companyName, report1, report2);

            await fetch("https://api.resend.com/emails", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${resendApiKey}`,
              },
              body: JSON.stringify({
                from: "AskPhi <reports@askphi.ai>",
                to: email,
                subject: `Your ICP Analysis Report — ${companyName}`,
                html: emailHtml,
              }),
            });

            console.log(`Report email sent to ${email} for ${companyName}`);
          }

          // Demo notification
          if (bookDemo) {
            const resendApiKey = Deno.env.get("RESEND_API_KEY");
            if (resendApiKey) {
              await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${resendApiKey}`,
                },
                body: JSON.stringify({
                  from: "AskPhi <reports@askphi.ai>",
                  to: "jason@hellouri.ai",
                  subject: `Demo Request: ${email} — ${report1.companyOverview?.name || "Unknown"}`,
                  html: `<p><strong>${email}</strong> completed a diagnostic and wants to book a strategy call.</p>
                         <p>Company: ${report1.companyOverview?.name || "Unknown"}</p>
                         <p>Website: ${lead.website_url}</p>`,
                }),
              });
            }
          }
        }
      } catch (err) {
        console.error("Report Part 2 generation error:", err);
      }
    }

    return c.json({ success: true });
  } catch (error) {
    console.error("Diagnostic unlock error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// ---------------------------------------------------------------------------
// Email template builder
// ---------------------------------------------------------------------------
function buildReportEmail(companyName: string, part1: any, part2: any): string {
  const segments = part1.audienceSegments || [];
  const gaps = part1.gapAnalysis?.gaps || [];
  const blindSpots = part1.gapAnalysis?.blindSpots || [];
  const playbooks = part2.communicationPlaybook || [];

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#1f1f1f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<div style="max-width:640px;margin:0 auto;padding:40px 24px;">

  <div style="text-align:center;margin-bottom:32px;">
    <h1 style="color:#65EC87;font-size:28px;margin:0;">AskPhi</h1>
    <p style="color:#ffffff80;font-size:14px;margin-top:8px;">ICP Analysis Report</p>
  </div>

  <div style="background:#2a2a2a;border-radius:16px;padding:32px;margin-bottom:24px;">
    <h2 style="color:#fff;font-size:24px;margin:0 0 8px;">${companyName}</h2>
    <p style="color:#ffffff80;font-size:14px;margin:0 0 16px;">${part1.companyOverview?.description || ""}</p>
    <p style="color:#65EC87;font-size:14px;font-style:italic;margin:0;">"${part1.companyOverview?.valueProp || ""}"</p>
  </div>

  <div style="background:#2a2a2a;border-radius:16px;padding:32px;margin-bottom:24px;">
    <h2 style="color:#fff;font-size:20px;margin:0 0 16px;">Positioning vs Reality</h2>
    <div style="text-align:center;margin-bottom:16px;">
      <span style="font-size:48px;font-weight:bold;color:${(part1.gapAnalysis?.alignmentScore || 0) < 40 ? '#ef4444' : (part1.gapAnalysis?.alignmentScore || 0) <= 70 ? '#eab308' : '#22c55e'};">
        ${part1.gapAnalysis?.alignmentScore || "—"}
      </span>
      <p style="color:#ffffff60;font-size:12px;margin:4px 0 0;">Alignment Score</p>
    </div>
    ${gaps.map((g: any) => `
    <div style="background:#ffffff08;border-radius:8px;padding:12px;margin-bottom:8px;">
      <strong style="color:#fff;">${g.category}</strong>
      <span style="color:${g.severity === 'high' ? '#ef4444' : g.severity === 'medium' ? '#eab308' : '#22c55e'};font-size:12px;float:right;">${g.severity}</span>
      <p style="color:#ffffff80;font-size:13px;margin:8px 0 0;">Stated: ${g.stated}<br>Reality: ${g.reality}</p>
    </div>`).join("")}
    ${blindSpots.length > 0 ? `
    <h3 style="color:#ffffff60;font-size:13px;text-transform:uppercase;margin:16px 0 8px;">Blind Spots</h3>
    ${blindSpots.map((s: string) => `<p style="color:#ffffff80;font-size:13px;margin:4px 0;">⚠ ${s}</p>`).join("")}` : ""}
  </div>

  <div style="background:#2a2a2a;border-radius:16px;padding:32px;margin-bottom:24px;">
    <h2 style="color:#fff;font-size:20px;margin:0 0 12px;">Who Your Website Actually Targets</h2>
    <p style="color:#ffffff80;font-size:14px;margin:0 0 16px;">${part1.primaryICP?.summary || ""}</p>
    ${(part1.primaryICP?.jobTitles || []).map((t: string) => `<span style="display:inline-block;background:#65EC8720;color:#65EC87;border-radius:12px;padding:4px 12px;font-size:12px;margin:2px;">${t}</span>`).join("")}
  </div>

  ${segments.map((seg: any, i: number) => `
  <div style="background:#2a2a2a;border-radius:16px;padding:32px;margin-bottom:24px;">
    <h2 style="color:#fff;font-size:20px;margin:0 0 8px;">Segment ${i + 1}: ${seg.name}</h2>
    <p style="color:#ffffff80;font-size:14px;margin:0 0 12px;">${seg.description}</p>
    <p style="color:#ffffff60;font-size:13px;margin:0 0 8px;">${seg.demographics}</p>
    ${(seg.triggers || []).map((t: string) => `<p style="color:#65EC87;font-size:13px;margin:2px 0;">→ ${t}</p>`).join("")}
  </div>`).join("")}

  ${playbooks.length > 0 ? playbooks.map((pb: any) => `
  <div style="background:#2a2a2a;border-radius:16px;padding:32px;margin-bottom:24px;">
    <h2 style="color:#fff;font-size:20px;margin:0 0 12px;">Messaging Playbook: ${pb.segmentName}</h2>
    <h3 style="color:#65EC87;font-size:14px;margin:12px 0 8px;">✓ Do Say</h3>
    ${(pb.doSay || []).map((s: string) => `<p style="color:#ffffff80;font-size:13px;margin:2px 0;">• ${s}</p>`).join("")}
    <h3 style="color:#ef4444;font-size:14px;margin:12px 0 8px;">✗ Don't Say</h3>
    ${(pb.dontSay || []).map((s: string) => `<p style="color:#ffffff80;font-size:13px;margin:2px 0;">• ${s}</p>`).join("")}
  </div>`).join("") : ""}

  <div style="text-align:center;padding:32px 0;">
    <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ07I4FMFs15WyD9hK8XiTRQm2lYhBp_CiBHxeml2xwZ7Vs1O12mDV8y6h4QWEr0CP0C6nAwwO5z"
       style="display:inline-block;background:#65EC87;color:#000;text-decoration:none;padding:14px 32px;border-radius:24px;font-weight:600;font-size:16px;">
      Book a Strategy Call
    </a>
    <p style="color:#ffffff40;font-size:12px;margin-top:16px;">
      Questions? Reply to this email or reach us at jason@hellouri.ai
    </p>
  </div>

  <div style="text-align:center;border-top:1px solid #ffffff20;padding-top:24px;margin-top:24px;">
    <p style="color:#ffffff40;font-size:12px;">© 2026 AskPhi. All rights reserved.</p>
  </div>

</div>
</body>
</html>`;
}

Deno.serve(app.fetch);