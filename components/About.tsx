"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { label: "Master's Degree", value: "AI & Machine Learning", sub: "University of Adelaide" },
  { label: "Industry Experience", value: "ICT Intern + IT Support", sub: "Multiple roles" },
  { label: "Independent Projects", value: "4 Built", sub: "2 deployed / ready" },
  { label: "Based In", value: "Adelaide", sub: "South Australia" },
];

const interests = ["Strategic sports", "Challenging puzzles", "Emerging AI", "IoT & Embedded"];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">About Me</p>
          <h2 className="text-4xl font-bold text-white mb-16">The person behind the code</h2>
        </FadeIn>

        {/* Desktop: photo left, text right. Mobile: photo top, text bottom. */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* LEFT — Photo card */}
          <FadeIn delay={0.1}>
            <div className="w-full lg:w-auto lg:flex-shrink-0 flex justify-center lg:justify-start">
              <div
                className="relative glass rounded-2xl overflow-visible"
                style={{ width: 340, minHeight: 420 }}
              >
                {/* Corner bracket — top-left */}
                <span
                  className="absolute -top-[3px] -left-[3px] w-6 h-6 pointer-events-none"
                  style={{
                    borderTop: "2px solid #14b8a6",
                    borderLeft: "2px solid #14b8a6",
                    borderRadius: "4px 0 0 0",
                  }}
                />
                {/* Corner bracket — top-right */}
                <span
                  className="absolute -top-[3px] -right-[3px] w-6 h-6 pointer-events-none"
                  style={{
                    borderTop: "2px solid #14b8a6",
                    borderRight: "2px solid #14b8a6",
                    borderRadius: "0 4px 0 0",
                  }}
                />
                {/* Corner bracket — bottom-left */}
                <span
                  className="absolute -bottom-[3px] -left-[3px] w-6 h-6 pointer-events-none"
                  style={{
                    borderBottom: "2px solid #14b8a6",
                    borderLeft: "2px solid #14b8a6",
                    borderRadius: "0 0 0 4px",
                  }}
                />
                {/* Corner bracket — bottom-right */}
                <span
                  className="absolute -bottom-[3px] -right-[3px] w-6 h-6 pointer-events-none"
                  style={{
                    borderBottom: "2px solid #14b8a6",
                    borderRight: "2px solid #14b8a6",
                    borderRadius: "0 0 4px 0",
                  }}
                />

                {/* Photo placeholder — replace with <Image> when /public/avatar.jpg is added */}
                <div
                  className="relative rounded-2xl overflow-hidden flex flex-col items-center justify-center"
                  style={{ width: 340, minHeight: 420 }}
                >
                  {/* Circuit board SVG texture overlay */}
                  <svg
                    className="absolute inset-0 w-full h-full opacity-[0.07]"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                  >
                    <defs>
                      <pattern id="pcb-bg" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                        <line x1="30" y1="0" x2="30" y2="60" stroke="#14b8a6" strokeWidth="0.5"/>
                        <line x1="0" y1="30" x2="60" y2="30" stroke="#14b8a6" strokeWidth="0.5"/>
                        <circle cx="30" cy="30" r="3" fill="none" stroke="#14b8a6" strokeWidth="0.5"/>
                        <circle cx="0"  cy="0"  r="2" fill="none" stroke="#14b8a6" strokeWidth="0.5"/>
                        <circle cx="60" cy="0"  r="2" fill="none" stroke="#14b8a6" strokeWidth="0.5"/>
                        <circle cx="0"  cy="60" r="2" fill="none" stroke="#14b8a6" strokeWidth="0.5"/>
                        <circle cx="60" cy="60" r="2" fill="none" stroke="#14b8a6" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#pcb-bg)"/>
                  </svg>

                  {/* Monogram */}
                  <span
                    className="relative font-mono font-bold text-accent select-none"
                    style={{ fontSize: "5rem", lineHeight: 1, letterSpacing: "-0.04em", textShadow: "0 0 40px rgba(20,184,166,0.35)" }}
                  >
                    MA
                  </span>

                  {/* Placeholder hint */}
                  <span className="relative mt-5 font-mono text-xs text-slate-600 tracking-wider">
                    [ /public/avatar.jpg ]
                  </span>
                </div>

                {/* Available for work badge */}
                <div
                  className="absolute -bottom-3 right-4 glass flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono"
                  style={{ border: "1px solid rgba(34,197,94,0.3)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400">Available for work</span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* RIGHT — Text content */}
          <div className="flex-1 min-w-0">
            <div className="space-y-5">
              <FadeIn delay={0.15}>
                <p className="text-slate-300 leading-relaxed text-lg">
                  I&apos;m a technically driven professional with a Master&apos;s in Artificial Intelligence and Machine Learning from the University of Adelaide. My background spans AI/ML research, full-stack web development, cloud infrastructure, and embedded systems — brought together through both academic projects and real-world industry work.
                </p>
              </FadeIn>
              <FadeIn delay={0.25}>
                <p className="text-slate-400 leading-relaxed">
                  Most recently, I completed an ICT internship at Jaba Pty Ltd in Adelaide, where I worked on full-stack development, Azure cloud migration, and AI agent tooling. Alongside my studies, I&apos;ve independently built and deployed a personal website and a PWA web application — projects I designed, developed, and shipped entirely on my own.
                </p>
              </FadeIn>
              <FadeIn delay={0.35}>
                <p className="text-slate-400 leading-relaxed">
                  I&apos;m methodical, self-directed, and genuinely curious about how technology can solve real problems. I&apos;m currently looking for my next role in Adelaide&apos;s ICT industry.
                </p>
              </FadeIn>
              <FadeIn delay={0.45}>
                <div className="flex flex-wrap gap-2 pt-2">
                  {interests.map((item) => (
                    <span
                      key={item}
                      className="glass px-3 py-1.5 text-slate-400 text-sm rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </FadeIn>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {stats.map((stat, i) => (
                <FadeIn key={stat.label} delay={0.2 + i * 0.1}>
                  <div className="glass rounded-xl p-5 hover:border-accent/30 transition-all group h-full">
                    <p className="text-slate-500 text-xs uppercase tracking-wider mb-2 font-mono">
                      {stat.label}
                    </p>
                    <p className="text-white font-semibold text-sm group-hover:text-accent transition-colors">
                      {stat.value}
                    </p>
                    <p className="text-slate-500 text-xs mt-1">{stat.sub}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
