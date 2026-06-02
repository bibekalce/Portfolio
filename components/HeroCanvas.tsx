'use client';
import { useEffect, useRef } from 'react';

const TEAL = [20, 184, 166] as const;
const BLUE = [14, 165, 233] as const;

interface CNode {
  x: number; y: number; vx: number; vy: number;
  r: number; type: 'neuron' | 'pcb';
  phase: number; phaseSpeed: number;
  connections: number[];
}
interface CSignal {
  from: number; to: number; t: number; speed: number; color: readonly number[];
}

export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let nodes: CNode[] = [];
    let signals: CSignal[] = [];

    const W = () => canvas.width;
    const H = () => canvas.height;

    const addSignal = () => {
      const fi = Math.floor(Math.random() * nodes.length);
      const n = nodes[fi];
      if (!n?.connections.length) return;
      const ti = n.connections[Math.floor(Math.random() * n.connections.length)];
      signals.push({ from: fi, to: ti, t: 0, speed: 0.004 + Math.random() * 0.007, color: Math.random() > 0.55 ? BLUE : TEAL });
    };

    const setup = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      nodes = [];

      for (let i = 0; i < 22; i++) {
        nodes.push({ x: Math.random() * W(), y: Math.random() * H(), vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22, r: 4 + Math.random() * 4, type: 'neuron', phase: Math.random() * Math.PI * 2, phaseSpeed: 0.012 + Math.random() * 0.018, connections: [] });
      }

      const cw = 130, ch = 95;
      const cols = Math.ceil(W() / cw), rows = Math.ceil(H() / ch);
      const used = new Set<string>();
      let attempts = 0;
      while (nodes.filter(n => n.type === 'pcb').length < 18 && attempts < 200) {
        attempts++;
        const c = Math.floor(Math.random() * cols), r = Math.floor(Math.random() * rows);
        const key = `${c},${r}`;
        if (used.has(key)) continue;
        used.add(key);
        nodes.push({ x: c * cw + cw / 2 + (Math.random() - 0.5) * 15, y: r * ch + ch / 2 + (Math.random() - 0.5) * 15, vx: 0, vy: 0, r: 3 + Math.random() * 2.5, type: 'pcb', phase: Math.random() * Math.PI * 2, phaseSpeed: 0.007 + Math.random() * 0.009, connections: [] });
      }

      for (let i = 0; i < nodes.length; i++) {
        nodes[i].connections = [];
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (nodes[i].connections.length >= 4 || nodes[j].connections.length >= 4) continue;
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          if (Math.sqrt(dx * dx + dy * dy) < 210) { nodes[i].connections.push(j); nodes[j].connections.push(i); }
        }
      }

      signals = [];
      for (let i = 0; i < 10; i++) addSignal();
    };

    const tick = () => {
      const w = W(), h = H();
      ctx.clearRect(0, 0, w, h);

      ctx.lineWidth = 0.5;
      ctx.strokeStyle = 'rgba(20,184,166,0.035)';
      for (let x = 0; x < w; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

      nodes.forEach(n => {
        n.phase += n.phaseSpeed;
        if (n.type === 'neuron') {
          n.x += n.vx; n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
      });

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.connections.forEach(j => {
          if (j <= i) return;
          const b = nodes[j];
          const isPCB = a.type === 'pcb' || b.type === 'pcb';
          const alpha = 0.055 + Math.sin(a.phase * 0.6) * 0.025;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          if (isPCB) {
            ctx.strokeStyle = `rgba(14,165,233,${alpha})`;
            const mx = (a.x + b.x) / 2;
            ctx.moveTo(a.x, a.y); ctx.lineTo(mx, a.y); ctx.lineTo(mx, b.y); ctx.lineTo(b.x, b.y);
          } else {
            ctx.strokeStyle = `rgba(20,184,166,${alpha})`;
            const cx = (a.x + b.x) / 2 + (b.y - a.y) * 0.14;
            const cy = (a.y + b.y) / 2 - (b.x - a.x) * 0.14;
            ctx.moveTo(a.x, a.y); ctx.quadraticCurveTo(cx, cy, b.x, b.y);
          }
          ctx.stroke();
        });
      }

      signals = signals.filter(s => {
        s.t += s.speed;
        if (s.t > 1) { addSignal(); return false; }
        const a = nodes[s.from], b = nodes[s.to];
        if (!a || !b) return false;
        const x = a.x + (b.x - a.x) * s.t, y = a.y + (b.y - a.y) * s.t;
        const [r, g, bl] = s.color;
        const grd = ctx.createRadialGradient(x, y, 0, x, y, 7);
        grd.addColorStop(0, `rgba(${r},${g},${bl},0.95)`);
        grd.addColorStop(0.4, `rgba(${r},${g},${bl},0.25)`);
        grd.addColorStop(1, `rgba(${r},${g},${bl},0)`);
        ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fillStyle = grd; ctx.fill();
        return true;
      });
      while (signals.length < 8) addSignal();

      nodes.forEach(n => {
        const pulse = 0.5 + Math.sin(n.phase) * 0.5;
        ctx.shadowBlur = 0;
        if (n.type === 'pcb') {
          const [r, g, b] = BLUE;
          const s = n.r * 2.4;
          ctx.shadowColor = `rgba(${r},${g},${b},0.7)`; ctx.shadowBlur = 12 * pulse;
          ctx.fillStyle = `rgba(${r},${g},${b},${0.1 * pulse})`; ctx.fillRect(n.x - s, n.y - s, s * 2, s * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${0.5 + 0.35 * pulse})`; ctx.fillRect(n.x - s * 0.5, n.y - s * 0.5, s, s);
          ctx.shadowBlur = 0;
          ctx.fillStyle = '#080d1a'; ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 0.42, 0, Math.PI * 2); ctx.fill();
        } else {
          const [r, g, b] = TEAL;
          ctx.shadowColor = `rgba(${r},${g},${b},0.9)`; ctx.shadowBlur = 20 * pulse;
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r + 4 * pulse, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${r},${g},${b},${0.18 * pulse})`; ctx.lineWidth = 1.5; ctx.stroke();
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${0.6 + 0.4 * pulse})`; ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      raf = requestAnimationFrame(tick);
    };

    setup();
    raf = requestAnimationFrame(tick);
    const ro = new ResizeObserver(setup);
    ro.observe(canvas);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" style={{ opacity: 0.72 }} />;
}
