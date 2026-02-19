/**
 * Normalizes a URL string by trimming whitespace and ensuring it has a protocol.
 */
export function normalizeUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

/**
 * Validates if a string is a valid-looking domain or URL.
 */
export function isValidUrlOrDomain(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  const domainPattern =
    /^(https?:\/\/)?([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}(:\d+)?(\/.*)?$/i;
  return domainPattern.test(trimmed);
}

/**
 * Extracts the hostname for display purposes.
 */
export function extractDisplayDomain(url: string): string {
  try {
    const normalized = normalizeUrl(url);
    const urlObj = new URL(normalized);
    return urlObj.hostname.replace(/^www\./, "");
  } catch {
    return url
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .split("/")[0];
  }
}
