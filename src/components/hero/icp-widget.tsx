"use client";

import { useState, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChatInput } from "./chat-input";
import { StreamingTeaser } from "./streaming-teaser";
import { EmailCapture } from "./email-capture";
import { Confirmation } from "./confirmation";
import { startTeaserStream } from "@/lib/api";
import {
  isValidUrlOrDomain,
  extractDisplayDomain,
  normalizeUrl,
} from "@/lib/url";

type Step = "url" | "audience" | "streaming" | "email_capture" | "confirmation";

interface ChatMessage {
  role: "assistant" | "user";
  content: string;
}

export function IcpWidget() {
  const [step, setStep] = useState<Step>("url");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [leadId, setLeadId] = useState("");
  const [teaserText, setTeaserText] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [statedAudience, setStatedAudience] = useState("");
  const [displayDomain, setDisplayDomain] = useState("");
  const [inputError, setInputError] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  const handleUrlSubmit = useCallback((value: string) => {
    setInputError("");

    if (!value.trim()) {
      setInputError("Please enter your website URL");
      return;
    }

    if (!isValidUrlOrDomain(value)) {
      setInputError("Please enter a valid URL or domain");
      return;
    }

    const domain = extractDisplayDomain(value);
    const normalized = normalizeUrl(value);
    setWebsiteUrl(normalized);
    setDisplayDomain(domain);

    setMessages([{ role: "user", content: domain }]);
    setInputError("");

    // Small delay so the user message renders before the follow-up appears
    setTimeout(() => {
      setStep("audience");
    }, 300);
  }, []);

  const handleAudienceSubmit = useCallback(
    async (value: string) => {
      setInputError("");

      if (!value.trim()) {
        setInputError("Please describe who you think your audience is");
        return;
      }

      const audience = value.trim();
      setStatedAudience(audience);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Who do you think ${displayDomain}'s ideal customer is?`,
        },
        { role: "user", content: audience },
      ]);

      setTeaserText("");
      setStep("streaming");

      abortRef.current = new AbortController();

      try {
        for await (const event of startTeaserStream(
          websiteUrl,
          audience,
          abortRef.current.signal
        )) {
          if (event.type === "leadId" && event.leadId) {
            setLeadId(event.leadId);
          } else if (event.type === "text" && event.text) {
            setTeaserText((prev) => prev + event.text);
          } else if (event.type === "done") {
            setStep("email_capture");
          } else if (event.type === "error") {
            setStep("url");
            setMessages([]);
          }
        }
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Stream error:", err);
          setStep("url");
          setMessages([]);
        }
      }
    },
    [websiteUrl, displayDomain]
  );

  const handleReset = useCallback(() => {
    abortRef.current?.abort();
    setStep("url");
    setMessages([]);
    setLeadId("");
    setTeaserText("");
    setWebsiteUrl("");
    setStatedAudience("");
    setDisplayDomain("");
    setInputError("");
  }, []);

  const handleEmailSubmitted = useCallback(() => {
    setStep("confirmation");
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto text-left">
      {/* Chat thread */}
      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {/* Message history */}
          {messages.map((msg, i) => (
            <motion.div
              key={`msg-${i}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i === messages.length - 1 ? 0.05 : 0 }}
            >
              <ChatBubble role={msg.role} content={msg.content} />
            </motion.div>
          ))}

          {/* Audience prompt from assistant */}
          {step === "audience" && (
            <motion.div
              key="audience-prompt"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <ChatBubble
                role="assistant"
                content={`Who do you think ${displayDomain}'s ideal customer is?`}
              />
            </motion.div>
          )}

          {/* Streaming analysis */}
          {(step === "streaming" || step === "email_capture") && (
            <motion.div
              key="streaming"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <StreamingTeaser
                text={teaserText}
                domain={displayDomain}
                isStreaming={step === "streaming"}
              />
            </motion.div>
          )}

          {/* Email capture */}
          {step === "email_capture" && (
            <motion.div
              key="email-capture"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <EmailCapture
                leadId={leadId}
                websiteUrl={websiteUrl}
                statedAudience={statedAudience}
                onSubmitted={handleEmailSubmitted}
              />
            </motion.div>
          )}

          {/* Confirmation */}
          {step === "confirmation" && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Confirmation onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input area */}
      <AnimatePresence mode="wait">
        {step === "url" && (
          <motion.div
            key="url-input"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mt-4"
          >
            <ChatInput
              placeholder="Enter your website URL..."
              buttonLabel="Decode"
              onSubmit={handleUrlSubmit}
              error={inputError}
            />
            <p className="text-center text-xs text-muted-foreground mt-2">
              Free preview — no signup required
            </p>
          </motion.div>
        )}

        {step === "audience" && (
          <motion.div
            key="audience-input"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, delay: 0.2 }}
            className="mt-4"
          >
            <ChatInput
              placeholder="e.g. Series B SaaS founders scaling their marketing team"
              buttonLabel="Analyze"
              onSubmit={handleAudienceSubmit}
              error={inputError}
              autoFocus
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ChatBubble({
  role,
  content,
}: {
  role: "assistant" | "user";
  content: string;
}) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-muted text-foreground rounded-bl-md"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
