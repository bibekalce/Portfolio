"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { skillNodes, skillLinks, skillCategories, skills } from "@/lib/data";

interface SimNode {
  id: string;
  label: string;
  category: string;
  size?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

interface SimLink {
  source: string | SimNode;
  target: string | SimNode;
}

const categoryColor = new Map(skillCategories.map((c) => [c.name, c.color]));

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile || !svgRef.current || !containerRef.current) return;

    let stopped = false;

    (async () => {
      const d3 = await import("d3");

      if (stopped || !svgRef.current || !containerRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = 520;

      const svg = d3.select(svgRef.current).attr("width", width).attr("height", height);
      svg.selectAll("*").remove();

      const nodes: SimNode[] = skillNodes.map((n) => ({ ...n }));
      const links: SimLink[] = skillLinks.map((l) => ({ ...l }));

      const simulation = d3
        .forceSimulation(nodes as d3.SimulationNodeDatum[])
        .force(
          "link",
          d3
            .forceLink(links as d3.SimulationLinkDatum<d3.SimulationNodeDatum>[])
            .id((d: d3.SimulationNodeDatum) => (d as SimNode).id)
            .distance(90)
            .strength(0.25)
        )
        .force("charge", d3.forceManyBody().strength(-130))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide(32));

      const linkEl = svg
        .append("g")
        .selectAll<SVGLineElement, SimLink>("line")
        .data(links)
        .enter()
        .append("line")
        .attr("stroke", "rgba(255,255,255,0.06)")
        .attr("stroke-width", 1);

      const nodeEl = svg
        .append("g")
        .selectAll<SVGGElement, SimNode>("g")
        .data(nodes)
        .enter()
        .append("g")
        .attr("cursor", "pointer");

      nodeEl
        .append("circle")
        .attr("r", (d) => (d.size ?? 1) * 18)
        .attr("fill", (d) => categoryColor.get(d.category) ?? "#94a3b8")
        .attr("fill-opacity", 0.12)
        .attr("stroke", (d) => categoryColor.get(d.category) ?? "#94a3b8")
        .attr("stroke-opacity", 0.45)
        .attr("stroke-width", 1.5);

      nodeEl
        .append("text")
        .text((d) => d.label)
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .attr("fill", "#cbd5e1")
        .attr("font-size", "10px")
        .style("pointer-events", "none")
        .style("user-select", "none");

      nodeEl
        .on("mouseenter", (_event, d) => {
          const connected = new Set<string>([d.id]);
          links.forEach((l) => {
            const s = typeof l.source === "string" ? l.source : (l.source as SimNode).id;
            const t = typeof l.target === "string" ? l.target : (l.target as SimNode).id;
            if (s === d.id) connected.add(t);
            if (t === d.id) connected.add(s);
          });

          nodeEl
            .select("circle")
            .attr("fill-opacity", (n) => (connected.has(n.id) ? 0.3 : 0.04))
            .attr("stroke-opacity", (n) => (connected.has(n.id) ? 0.9 : 0.1));

          linkEl
            .attr("stroke", (l) => {
              const s = typeof l.source === "string" ? l.source : (l.source as SimNode).id;
              const t = typeof l.target === "string" ? l.target : (l.target as SimNode).id;
              return s === d.id || t === d.id
                ? (categoryColor.get(d.category) ?? "#94a3b8")
                : "rgba(255,255,255,0.06)";
            })
            .attr("stroke-opacity", (l) => {
              const s = typeof l.source === "string" ? l.source : (l.source as SimNode).id;
              const t = typeof l.target === "string" ? l.target : (l.target as SimNode).id;
              return s === d.id || t === d.id ? 0.5 : 0.03;
            });
        })
        .on("mouseleave", () => {
          nodeEl.select("circle").attr("fill-opacity", 0.12).attr("stroke-opacity", 0.45);
          linkEl.attr("stroke", "rgba(255,255,255,0.06)").attr("stroke-opacity", 1);
        });

      simulation.on("tick", () => {
        linkEl
          .attr("x1", (d) => ((d.source as SimNode).x ?? 0))
          .attr("y1", (d) => ((d.source as SimNode).y ?? 0))
          .attr("x2", (d) => ((d.target as SimNode).x ?? 0))
          .attr("y2", (d) => ((d.target as SimNode).y ?? 0));

        nodeEl.attr(
          "transform",
          (d) => `translate(${d.x ?? 0},${d.y ?? 0})`
        );
      });

      return () => {
        stopped = true;
        simulation.stop();
      };
    })();

    return () => {
      stopped = true;
    };
  }, [isMobile]);

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-3">
            Technical Skills
          </p>
          <h2 className="text-4xl font-bold text-white mb-3">Skill Constellation</h2>
          <p className="text-slate-500 mb-10 hidden md:block text-sm">
            Hover to explore connections. Nodes cluster by domain.
          </p>
        </motion.div>

        {/* Desktop: D3 constellation */}
        <div ref={containerRef} className="hidden md:block">
          <div className="glass rounded-2xl p-4 overflow-hidden">
            <svg ref={svgRef} className="w-full" />
          </div>
          <div className="flex flex-wrap gap-4 mt-5">
            {skillCategories.map((cat) => (
              <div key={cat.name} className="flex items-center gap-1.5 text-xs text-slate-400">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                {cat.name}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: grouped tag pills */}
        <div className="md:hidden space-y-8">
          {skillCategories.map((cat) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: skillCategories.indexOf(cat) * 0.05 }}
            >
              <h3
                className="text-xs font-mono uppercase tracking-wider mb-3"
                style={{ color: cat.color }}
              >
                {cat.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills[cat.key]?.map((skill: string) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-sm text-slate-300"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: `1px solid ${cat.color}25`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
