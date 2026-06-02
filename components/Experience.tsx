"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experience } from "@/lib/data";

function FadeSlide({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <FadeSlide>
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">Experience</p>
          <h2 className="text-4xl font-bold text-white mb-16">Work History</h2>
        </FadeSlide>

        {/* ICT Experience */}
        <div className="mb-16">
          <FadeSlide delay={0.05}>
            <p className="text-accent font-mono text-sm mb-8">// ICT Experience</p>
          </FadeSlide>

          <div className="space-y-6 relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent" />

            {experience.ict.map((role, i) => (
              <FadeSlide key={role.company} delay={0.1 + i * 0.1}>
                <div className="pl-12 relative">
                  <div className="absolute left-0 top-1.5 w-8 h-8 glass rounded-full flex items-center justify-center border-accent/30">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                  </div>
                  <div className="glass rounded-xl p-6 hover:border-accent/20 transition-all">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-white font-semibold text-lg">{role.title}</h3>
                        <p className="text-accent text-sm">{role.company}</p>
                        {role.note && (
                          <p className="text-slate-500 text-xs mt-1 font-mono">{role.note}</p>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-slate-400 text-sm">{role.dates}</p>
                        <p className="text-slate-500 text-xs">{role.location}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {role.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded text-xs font-mono"
                          style={{
                            background: "rgba(20,184,166,0.08)",
                            color: "#14b8a6",
                            border: "1px solid rgba(20,184,166,0.2)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <ul className="space-y-2">
                      {role.bullets.map((bullet, j) => (
                        <li key={j} className="flex gap-3 text-slate-400 text-sm leading-relaxed">
                          <span className="text-accent mt-1.5 shrink-0 text-xs">▸</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeSlide>
            ))}
          </div>
        </div>

        {/* Other Experience */}
        <div>
          <FadeSlide delay={0.05}>
            <p className="text-slate-600 font-mono text-sm mb-6">// Other Experience (While Studying)</p>
          </FadeSlide>

          {experience.other.map((role, i) => (
            <FadeSlide key={role.company} delay={0.1 + i * 0.1}>
              <div
                className="rounded-xl p-5 border border-white/5 hover:border-white/10 transition-all"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-slate-400 font-medium">{role.title}</h3>
                    <p className="text-slate-500 text-sm">{role.company}</p>
                    {role.note && (
                      <p className="text-slate-600 text-xs mt-1 font-mono italic">{role.note}</p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-slate-500 text-sm">{role.dates}</p>
                    <p className="text-slate-600 text-xs">{role.location}</p>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {role.bullets.map((bullet, j) => (
                    <li key={j} className="flex gap-3 text-slate-600 text-sm leading-relaxed">
                      <span className="text-slate-700 mt-1.5 shrink-0 text-xs">▸</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeSlide>
          ))}
        </div>
      </div>
    </section>
  );
}
