"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import HeroCanvas from "./HeroCanvas";

const roles = [
  "AI/ML Graduate",
  "Full-Stack Developer",
  "Cloud Engineer",
  "Problem Solver",
];

const techChips = [
  { label: "Python",       top: "12%",  left: "4%",   delay: 0.8,  yRange: [0, -10, 0] },
  { label: "Azure",        top: "22%",  right: "5%",  delay: 1.0,  yRange: [0, 12, 0]  },
  { label: "TensorFlow",   top: "72%",  left: "3%",   delay: 1.2,  yRange: [0, -8, 0]  },
  { label: "Raspberry Pi", top: "78%",  right: "4%",  delay: 0.9,  yRange: [0, 10, 0]  },
  { label: "FastAPI",      top: "40%",  left: "2%",   delay: 1.1,  yRange: [0, -12, 0] },
  { label: "IoT",          top: "55%",  right: "3%",  delay: 1.3,  yRange: [0, 8, 0]   },
  { label: "BERT",         top: "88%",  left: "18%",  delay: 1.0,  yRange: [0, -6, 0]  },
];

function useTypewriter(words: string[], typingSpeed = 85, deleteSpeed = 45, pauseMs = 2200) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < word.length) {
      timer = setTimeout(() => setCharIdx((c) => c + 1), typingSpeed);
    } else if (!deleting && charIdx === word.length) {
      timer = setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && charIdx > 0) {
      timer = setTimeout(() => setCharIdx((c) => c - 1), deleteSpeed);
    } else {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, typingSpeed, deleteSpeed, pauseMs]);

  useEffect(() => {
    setDisplay(words[wordIdx].slice(0, charIdx));
  }, [charIdx, wordIdx, words]);

  return display;
}

export default function Hero() {
  const role = useTypewriter(roles);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated neural network + PCB canvas background */}
      <HeroCanvas />

      {/* Gradient overlay for text readability */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(8,13,26,0.45) 0%, rgba(8,13,26,0.72) 100%)",
        }}
      />

      {/* Ambient glow blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl z-[1]" style={{ background: "rgba(20,184,166,0.06)" }} />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl z-[1]" style={{ background: "rgba(14,165,233,0.06)" }} />

      {/* Floating tech badge chips */}
      {techChips.map((chip) => (
        <motion.div
          key={chip.label}
          className="absolute z-[2] glass px-3 py-1.5 rounded-full font-mono text-xs text-accent"
          style={{
            top: chip.top,
            left: "left" in chip ? chip.left : undefined,
            right: "right" in chip ? chip.right : undefined,
            borderColor: "rgba(20,184,166,0.25)",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: chip.yRange }}
          transition={{
            opacity: { delay: chip.delay, duration: 0.5 },
            scale:   { delay: chip.delay, duration: 0.5 },
            y: {
              delay: chip.delay + 0.5,
              duration: 3 + Math.random() * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          {chip.label}
        </motion.div>
      ))}

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-accent font-mono text-sm mb-4 tracking-widest uppercase"
        >
          &gt; Hello, I&apos;m
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold text-white mb-5"
        >
          Manish Adhikari
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-2xl text-slate-300 mb-3 h-9 flex items-center justify-center gap-2"
        >
          <span className="text-accent font-mono">&gt;</span>
          <span className="font-mono">{role}</span>
          <span
            className="w-0.5 h-7 bg-accent"
            style={{ animation: "blink 1s step-end infinite" }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-slate-400 max-w-2xl mx-auto mb-10 text-lg leading-relaxed"
        >
          Master&apos;s in AI &amp; Machine Learning from the University of Adelaide. Building intelligent systems, cloud infrastructure, and full-stack applications from Adelaide, SA.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="px-8 py-3.5 bg-accent text-navy-950 font-semibold rounded-lg text-sm transition-all hover:brightness-110"
            style={{ boxShadow: "0 0 0 0 rgba(20,184,166,0)" }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.boxShadow = "0 0 30px rgba(20,184,166,0.35)")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.boxShadow = "0 0 0 0 rgba(20,184,166,0)")
            }
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 glass text-white font-semibold rounded-lg text-sm hover:border-accent/30 transition-all"
          >
            Get In Touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 bg-accent rounded-full"
            />
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
