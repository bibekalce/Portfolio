"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL: Message[] = [
  {
    role: "assistant",
    content:
      "Hi! I'm Manish's AI assistant. Ask me about his skills, experience, or projects.",
  },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }
  }, [messages, open]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.content || "Sorry, I couldn't get a response." },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 shadow-2xl"
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(13,20,36,0.96)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(20,184,166,0.2)",
              }}
            >
              <div
                className="px-4 py-3 flex items-center justify-between"
                style={{ background: "rgba(20,184,166,0.08)", borderBottom: "1px solid rgba(20,184,166,0.15)" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full" style={{ animation: "pulse 2s infinite" }} />
                  <span className="text-white text-sm font-medium">Ask about Manish</span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors text-xl leading-none"
                >
                  ×
                </button>
              </div>

              <div className="p-4 h-72 overflow-y-auto space-y-3">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className="max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed"
                      style={
                        msg.role === "user"
                          ? { background: "#14b8a6", color: "#080d1a", fontWeight: 500 }
                          : {
                              background: "rgba(255,255,255,0.05)",
                              color: "#cbd5e1",
                              border: "1px solid rgba(255,255,255,0.08)",
                            }
                      }
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div
                      className="px-3 py-2 rounded-xl text-sm text-slate-400"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <span style={{ animation: "pulse 1.5s infinite" }}>Thinking…</span>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              <div
                className="px-4 py-3 flex gap-2"
                style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Ask a question…"
                  className="flex-1 rounded-lg px-3 py-2 text-white text-sm outline-none"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
                <button
                  onClick={send}
                  disabled={!input.trim() || loading}
                  className="px-3 py-2 bg-accent text-navy-950 rounded-lg text-sm font-bold disabled:opacity-40 hover:brightness-110 transition-all"
                >
                  →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent rounded-full flex items-center justify-center text-navy-950 shadow-lg"
        style={{ boxShadow: open ? "0 0 24px rgba(20,184,166,0.4)" : "0 4px 20px rgba(0,0,0,0.4)" }}
        aria-label="Chat with Manish's AI assistant"
      >
        {open ? (
          <span className="text-xl font-bold leading-none">×</span>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </motion.button>
    </>
  );
}
