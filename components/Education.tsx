"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { education } from "@/lib/data";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Education() {
  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">Education</p>
          <h2 className="text-4xl font-bold text-white mb-16">Academic Background</h2>
        </FadeIn>

        <div className="space-y-6 relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-accent/10 to-transparent" />

          {education.map((edu, i) => (
            <FadeIn key={edu.qualification} delay={0.1 + i * 0.12}>
              <div className="pl-12 relative">
                <div className="absolute left-0 top-1.5 w-8 h-8 glass rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: edu.color }} />
                </div>
                <div className="glass rounded-xl p-6 hover:border-accent/20 transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <h3 className="text-white font-semibold leading-snug">{edu.qualification}</h3>
                    <span className="text-sm font-mono shrink-0" style={{ color: edu.color }}>
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-4">{edu.institution}</p>
                  <div className="flex flex-wrap gap-2">
                    {edu.notes.map((note) => (
                      <span
                        key={note}
                        className="px-2.5 py-1 rounded-full text-xs text-slate-400"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
