"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, ArrowRight } from "lucide-react";

interface ChatInputProps {
  placeholder: string;
  buttonLabel: string;
  onSubmit: (value: string) => void;
  error?: string;
  autoFocus?: boolean;
}

export function ChatInput({
  placeholder,
  buttonLabel,
  onSubmit,
  error,
  autoFocus,
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 bg-card rounded-full border border-border shadow-sm pl-5 pr-2 py-2 focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary/50 transition-all">
          <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none min-w-0"
          />
          <button
            type="submit"
            className="shrink-0 bg-primary text-primary-foreground text-sm font-medium px-5 py-2 rounded-full hover:bg-primary/90 active:scale-[0.97] transition-all flex items-center gap-1.5"
          >
            {buttonLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </form>
      {error && (
        <p className="text-destructive text-xs mt-2 ml-5">{error}</p>
      )}
    </div>
  );
}
