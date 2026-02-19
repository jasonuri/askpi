"use client";

import { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isValidUrlOrDomain, extractDisplayDomain, normalizeUrl } from "@/lib/url";

interface UrlInputProps {
  onAnalyze: (url: string, audience: string, domain: string) => void;
}

export function UrlInput({ onAnalyze }: UrlInputProps) {
  const [url, setUrl] = useState("");
  const [audience, setAudience] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Please enter your website URL");
      return;
    }

    if (!isValidUrlOrDomain(url)) {
      setError("Please enter a valid URL or domain");
      return;
    }

    if (!audience.trim()) {
      setError("Please describe your target audience");
      return;
    }

    const domain = extractDisplayDomain(url);
    onAnalyze(normalizeUrl(url), audience.trim(), domain);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="yourcompany.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
        <textarea
          placeholder="Describe your target audience (e.g., 'Series B SaaS founders looking to scale their marketing team')"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          rows={2}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
        />
        {error && (
          <p className="text-destructive text-sm">{error}</p>
        )}
        <Button
          type="submit"
          className="w-full rounded-full h-11 text-base font-medium"
        >
          Analyze My Positioning
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Free preview — no signup required
      </p>
    </form>
  );
}
