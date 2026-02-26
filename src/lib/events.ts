// Event names
export const ICP_ANALYSIS_STARTED = "icp-analysis-started";
export const ICP_ANALYSIS_COMPLETE = "icp-analysis-complete";
export const ICP_ANALYSIS_RESET = "icp-analysis-reset";

// Event detail types
export interface AnalysisStartedDetail {
  domain: string;
}

export interface AnalysisCompleteDetail {
  domain: string;
  segments: string[];
}

// Dispatch helpers
export function dispatchAnalysisStarted(domain: string): void {
  window.dispatchEvent(
    new CustomEvent<AnalysisStartedDetail>(ICP_ANALYSIS_STARTED, {
      detail: { domain },
    })
  );
}

export function dispatchAnalysisComplete(domain: string, segments: string[]): void {
  window.dispatchEvent(
    new CustomEvent<AnalysisCompleteDetail>(ICP_ANALYSIS_COMPLETE, {
      detail: { domain, segments },
    })
  );
}

export function dispatchAnalysisReset(): void {
  window.dispatchEvent(new CustomEvent(ICP_ANALYSIS_RESET));
}

/**
 * Extract segment labels from teaser markdown text.
 * Looks for **bold terms** in bullet points.
 * Falls back to generic labels if fewer than 3 found.
 */
export function extractSegments(teaserText: string): string[] {
  const boldPattern = /\*\*([^*]+)\*\*/g;
  const segments: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = boldPattern.exec(teaserText)) !== null) {
    const term = match[1].trim();
    // Skip very long matches (likely sentences, not segment labels)
    if (term.length <= 40 && !segments.includes(term)) {
      segments.push(term);
    }
  }

  // Fallback to generic labels if we didn't find enough
  if (segments.length < 3) {
    return ["Primary Audience", "Secondary Audience", "Emerging Segment", "Niche Segment"];
  }

  // Return up to 6 segments
  return segments.slice(0, 6);
}
