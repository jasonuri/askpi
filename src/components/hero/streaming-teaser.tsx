"use client";

import { useMemo } from "react";
import { Loader2 } from "lucide-react";

interface StreamingTeaserProps {
  text: string;
  domain: string;
  isStreaming: boolean;
}

/**
 * Lightweight markdown-to-HTML for the teaser output.
 * Handles: **bold**, bullet lines (- or *), and paragraphs.
 * No external dependency needed for this scope.
 */
function renderMarkdown(raw: string): string {
  const lines = raw.split("\n");
  const html: string[] = [];
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Empty line — close list if open, add spacing
    if (!trimmed) {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
      continue;
    }

    // Bullet item
    const bulletMatch = trimmed.match(/^[-*]\s+(.*)/);
    if (bulletMatch) {
      if (!inList) {
        html.push('<ul class="space-y-2 my-3">');
        inList = true;
      }
      html.push(`<li>${inlineFormat(bulletMatch[1])}</li>`);
      continue;
    }

    // Regular paragraph
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
    html.push(`<p class="mb-3 last:mb-0">${inlineFormat(trimmed)}</p>`);
  }

  if (inList) html.push("</ul>");

  return html.join("\n");
}

/** Handle **bold** inline formatting */
function inlineFormat(text: string): string {
  return text.replace(
    /\*\*(.+?)\*\*/g,
    '<strong class="font-semibold text-foreground">$1</strong>'
  );
}

export function StreamingTeaser({
  text,
  domain,
  isStreaming,
}: StreamingTeaserProps) {
  const html = useMemo(() => renderMarkdown(text), [text]);

  return (
    <div className="bg-card rounded-xl border border-border p-5 shadow-sm text-left">
      <div className="flex items-center gap-2 mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {isStreaming && (
          <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
        )}
        <span>
          {isStreaming
            ? `Analysing ${domain}...`
            : `Analysis preview — ${domain}`}
        </span>
      </div>
      <div
        className="text-sm text-muted-foreground leading-relaxed [&_ul]:list-none [&_ul]:pl-0 [&_li]:relative [&_li]:pl-5 [&_li]:before:content-['→'] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-primary [&_li]:before:font-medium"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {isStreaming && (
        <span className="inline-block w-0.5 h-4 bg-primary animate-blink align-text-bottom mt-1" />
      )}
    </div>
  );
}
