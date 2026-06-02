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

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-5">
            <FadeIn delay={0.1}>
              <p className="text-slate-300 leading-relaxed text-lg">
                I&apos;m a technically driven professional with a Master&apos;s in Artificial Intelligence and Machine Learning from the University of Adelaide. My background spans AI/ML research, full-stack web development, cloud infrastructure, and embedded systems — brought together through both academic projects and real-world industry work.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-slate-400 leading-relaxed">
                Most recently, I completed an ICT internship at Jaba Pty Ltd in Adelaide, where I worked on full-stack development, Azure cloud migration, and AI agent tooling. Alongside my studies, I&apos;ve independently built and deployed a personal website and a PWA web application — projects I designed, developed, and shipped entirely on my own.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-slate-400 leading-relaxed">
                I&apos;m methodical, self-directed, and genuinely curious about how technology can solve real problems. I&apos;m currently looking for my next role in Adelaide&apos;s ICT industry.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
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

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={0.1 + i * 0.1}>
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
    </section>
  );
}
