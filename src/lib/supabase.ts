export const projectId = "vpksqktpqosbepcpdrak";
export const publicAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwa3Nxa3RwcW9zYmVwY3BkcmFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NTc1NzcsImV4cCI6MjA4NzAzMzU3N30.q7SQFT0dONE-1Ah3mJFz5AcojVvuJaTUYdYwuvMKZzk";

export const SUPABASE_URL = `https://${projectId}.supabase.co`;
export const FUNCTIONS_BASE = `${SUPABASE_URL}/functions/v1/make-server-e1b246ca`;

export const authHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${publicAnonKey}`,
};
