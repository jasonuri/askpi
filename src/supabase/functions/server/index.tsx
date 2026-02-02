import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

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

Deno.serve(app.fetch);