"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "@/lib/data";

const statusStyles: Record<string, { bg: string; text: string; border: string }> = {
  green: {
    bg: "rgba(34,197,94,0.08)",
    text: "#4ade80",
    border: "rgba(34,197,94,0.2)",
  },
  blue: {
    bg: "rgba(59,130,246,0.08)",
    text: "#60a5fa",
    border: "rgba(59,130,246,0.2)",
  },
  amber: {
    bg: "rgba(245,158,11,0.08)",
    text: "#fbbf24",
    border: "rgba(245,158,11,0.2)",
  },
  slate: {
    bg: "rgba(148,163,184,0.06)",
    text: "#94a3b8",
    border: "rgba(148,163,184,0.15)",
  },
};

type Project = (typeof projects)[number];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const style = statusStyles[project.statusColor] ?? statusStyles.slate;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 2) * 0.08 }}
      className="glass rounded-xl p-6 flex flex-col gap-4 hover:border-accent/20 transition-all group"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-white font-semibold leading-snug group-hover:text-accent transition-colors text-sm">
          {project.title}
        </h3>
        <span
          className="shrink-0 px-2 py-1 rounded text-xs font-mono"
          style={{ background: style.bg, color: style.text, border: `1px solid ${style.border}` }}
        >
          {project.status}
        </span>
      </div>

      <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>

      {project.highlight && (
        <p className="text-accent text-xs font-mono">{project.highlight}</p>
      )}

      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 rounded-md text-xs font-mono text-slate-500"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 pt-2 border-t border-white/5 text-xs font-mono">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            ↗ {project.liveLabel}
          </a>
        ) : project.liveLabel ? (
          <span className="text-slate-600">{project.liveLabel}</span>
        ) : null}

        {project.codeUrl ? (
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-accent transition-colors ml-auto"
          >
            ↗ {project.codeLabel}
          </a>
        ) : project.codeLabel ? (
          <span className="text-slate-700 ml-auto">{project.codeLabel}</span>
        ) : null}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">Projects</p>
          <h2 className="text-4xl font-bold text-white mb-4">What I&apos;ve Built</h2>
          <p className="text-slate-400 mb-12 text-sm">
            A mix of research, independent builds, and production work.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
