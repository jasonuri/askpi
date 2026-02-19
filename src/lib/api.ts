import { FUNCTIONS_BASE, authHeaders } from "./supabase";
import { normalizeUrl } from "./url";

export interface TeaserStreamEvent {
  type: "leadId" | "text" | "done" | "error";
  leadId?: string;
  text?: string;
  error?: string;
}

/**
 * Starts a teaser stream for the given URL and audience.
 * Returns an async generator yielding SSE events.
 */
export async function* startTeaserStream(
  websiteUrl: string,
  statedAudience: string,
  signal?: AbortSignal
): AsyncGenerator<TeaserStreamEvent> {
  const response = await fetch(`${FUNCTIONS_BASE}/diagnostic/teaser`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({
      websiteUrl: normalizeUrl(websiteUrl),
      statedAudience,
    }),
    signal,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        try {
          yield JSON.parse(line.slice(6)) as TeaserStreamEvent;
        } catch {
          // skip malformed events
        }
      }
    }
  }
}

/**
 * Unlock the full report by submitting email.
 */
export async function unlockReport(params: {
  leadId: string;
  email: string;
  bookDemo?: boolean;
  websiteUrl?: string;
  statedAudience?: string;
}): Promise<{ success: boolean }> {
  const response = await fetch(`${FUNCTIONS_BASE}/diagnostic/unlock`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const json = await response.json().catch(() => ({}));
    throw new Error(
      json?.error ?? `Request failed with status ${response.status}`
    );
  }

  return response.json();
}

/**
 * Subscribe to newsletter.
 */
export async function subscribeNewsletter(
  email: string
): Promise<{ success: boolean }> {
  const response = await fetch(`${FUNCTIONS_BASE}/subscribe`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const json = await response.json().catch(() => ({}));
    throw new Error(json?.error ?? "Subscription failed");
  }

  return response.json();
}
