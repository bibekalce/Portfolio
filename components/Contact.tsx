"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

const contactItems = [
  {
    label: "Email",
    value: "madhikari824@gmail.com",
    href: "mailto:madhikari824@gmail.com",
    icon: "E",
  },
  {
    label: "LinkedIn",
    value: "/in/manish-adhikari",
    href: "https://www.linkedin.com/in/manish-adhikari-b5667218b/",
    icon: "L",
  },
  {
    label: "GitHub",
    value: "github.com/bibekalce",
    href: "https://github.com/bibekalce",
    icon: "G",
  },
  {
    label: "Location",
    value: "Adelaide, South Australia",
    href: null,
    icon: "↟",
  },
];

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">Contact</p>
          <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-slate-400 mb-12 max-w-xl text-sm leading-relaxed">
            I&apos;m currently looking for ICT roles in Adelaide. Whether you have an opportunity, a question, or just want to connect — feel free to reach out.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            {contactItems.map((item) => (
              <div key={item.label} className="glass rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-mono text-sm text-accent"
                  style={{ background: "rgba(20,184,166,0.08)", border: "1px solid rgba(20,184,166,0.2)" }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wider font-mono">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-white hover:text-accent transition-colors text-sm"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white text-sm">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="glass rounded-xl p-4">
              <p className="text-slate-500 text-xs uppercase tracking-wider font-mono mb-1">
                Professional Membership
              </p>
              <p className="text-white text-sm">Australian Computer Society — Student Member</p>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass rounded-xl p-6 space-y-4"
          >
            {(["name", "email"] as const).map((field) => (
              <div key={field}>
                <label className="block text-slate-400 text-xs uppercase tracking-wider font-mono mb-2">
                  {field === "name" ? "Name" : "Email"}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  value={form[field]}
                  onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                  required
                  placeholder={field === "email" ? "your@email.com" : "Your name"}
                  className="w-full rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-accent/50 transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
              </div>
            ))}
            <div>
              <label className="block text-slate-400 text-xs uppercase tracking-wider font-mono mb-2">
                Message
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                required
                rows={5}
                placeholder="Your message..."
                className="w-full rounded-lg px-4 py-3 text-white text-sm outline-none resize-none focus:border-accent/50 transition-colors"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className="w-full py-3 bg-accent text-navy-950 font-semibold rounded-lg text-sm hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "sending"
                ? "Sending..."
                : status === "sent"
                ? "Message Sent ✓"
                : "Send Message"}
            </button>

            {status === "error" && (
              <p className="text-red-400 text-xs text-center">
                Something went wrong. Please email directly.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
