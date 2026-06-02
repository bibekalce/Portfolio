"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function CoverLetterGenerator() {
  const [form, setForm] = useState({ jobTitle: "", company: "", jobDescription: "" });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const generate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult("");
    try {
      const res = await fetch("/api/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data.content);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    if (result) navigator.clipboard.writeText(result);
  };

  return (
    <section
      id="cover-letter"
      className="py-24 px-6"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">AI Tool</p>
          <h2 className="text-3xl font-bold text-white mb-3">Cover Letter Generator</h2>
          <p className="text-slate-400 mb-10 text-sm max-w-xl">
            Generate a tailored cover letter for any role — powered by Claude AI, grounded in Manish&apos;s actual background.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.form
            onSubmit={generate}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass rounded-xl p-6 space-y-4"
          >
            {(["jobTitle", "company"] as const).map((field) => (
              <div key={field}>
                <label className="block text-slate-400 text-xs uppercase tracking-wider font-mono mb-2">
                  {field === "jobTitle" ? "Job Title *" : "Company *"}
                </label>
                <input
                  type="text"
                  value={form[field]}
                  onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                  required
                  placeholder={
                    field === "jobTitle"
                      ? "e.g. Software Engineer, AI/ML Engineer"
                      : "e.g. Accenture"
                  }
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
                Job Description (optional)
              </label>
              <textarea
                value={form.jobDescription}
                onChange={(e) => setForm((f) => ({ ...f, jobDescription: e.target.value }))}
                rows={5}
                placeholder="Paste the job description for a more tailored letter..."
                className="w-full rounded-lg px-4 py-3 text-white text-sm outline-none resize-none focus:border-accent/50 transition-colors"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !form.jobTitle || !form.company}
              className="w-full py-3 bg-accent text-navy-950 font-semibold rounded-lg text-sm hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Generating..." : "Generate Cover Letter"}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass rounded-xl p-6 min-h-64 relative"
          >
            {!result && !loading && !error && (
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <p className="text-4xl mb-4 opacity-10">✉</p>
                <p className="text-slate-600 text-sm">
                  Fill in the fields and generate a tailored cover letter
                </p>
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center h-full py-16">
                <div
                  className="w-6 h-6 rounded-full mb-3"
                  style={{
                    border: "2px solid rgba(20,184,166,0.2)",
                    borderTopColor: "#14b8a6",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
                <p className="text-slate-400 text-sm">Writing your cover letter...</p>
              </div>
            )}

            {error && <p className="text-red-400 text-sm p-2">{error}</p>}

            {result && (
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-accent text-xs font-mono">// generated</span>
                  <button
                    onClick={copy}
                    className="text-xs text-slate-400 hover:text-accent transition-colors font-mono"
                  >
                    Copy ↗
                  </button>
                </div>
                <pre className="text-slate-300 text-xs leading-relaxed whitespace-pre-wrap font-sans overflow-y-auto flex-1">
                  {result}
                </pre>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
