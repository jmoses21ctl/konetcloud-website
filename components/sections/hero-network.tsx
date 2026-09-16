"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  /** 0–1, decays each frame; set to 1 when a spark arrives. */
  flash: number;
};

type Spark = {
  from: Node;
  to: Node;
  t: number;
  speed: number;
  color: string;
  /** Remaining hops after arrival; makes connections propagate. */
  hops: number;
};

const LINK_DIST = 170;
const MAX_SPARKS = 10;
const SPAWN_EVERY_MS = 320;

// Brand gold carries almost every spark; cyan and lime are rare accents.
const SPARK_COLORS = [
  "245 180 0",
  "245 180 0",
  "245 180 0",
  "245 180 0",
  "255 216 107",
  "2 164 238",
  "122 184 0",
];

/**
 * Hero backdrop: a slow-drifting node field where links form by proximity
 * and sparks travel along them. Everything runs on one canvas; it pauses
 * when off-screen or hidden, and renders a single static frame for users
 * who prefer reduced motion.
 */
export function HeroNetwork({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let sparks: Spark[] = [];
    let raf = 0;
    let last = 0;
    let lastSpawn = 0;
    let visible = true;
    let inView = true;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    function seed() {
      // Density scales with area; clamped so phones stay light
      const count = Math.round(Math.min(110, Math.max(32, (w * h) / 11000)));
      nodes = Array.from({ length: count }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-0.18, 0.18),
        vy: rand(-0.18, 0.18),
        r: rand(0.9, 1.8),
        flash: 0,
      }));
      sparks = [];
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduced) draw(0);
    }

    function neighbours(n: Node) {
      const out: Node[] = [];
      for (const m of nodes) {
        if (m === n) continue;
        const dx = m.x - n.x;
        const dy = m.y - n.y;
        if (dx * dx + dy * dy < LINK_DIST * LINK_DIST) out.push(m);
      }
      return out;
    }

    function spawn(from?: Node, hops = 0) {
      if (sparks.length >= MAX_SPARKS) return;
      const a = from ?? nodes[Math.floor(Math.random() * nodes.length)];
      const ns = neighbours(a);
      if (!ns.length) return;
      const b = ns[Math.floor(Math.random() * ns.length)];
      sparks.push({
        from: a,
        to: b,
        t: 0,
        speed: rand(0.55, 0.95), // fraction of the link per second
        color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
        hops: from ? hops : Math.random() < 0.45 ? 1 + Math.floor(Math.random() * 3) : 0,
      });
    }

    function step(dt: number) {
      for (const n of nodes) {
        n.x += n.vx * dt * 0.06;
        n.y += n.vy * dt * 0.06;
        // Wrap with a margin so nodes don't pop at the edge
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
        n.flash = Math.max(0, n.flash - dt * 0.0016);
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.t += (dt / 1000) * s.speed;
        if (s.t >= 1) {
          s.to.flash = 1;
          sparks.splice(i, 1);
          if (s.hops > 0) spawn(s.to, s.hops - 1);
        }
      }
    }

    function draw(now: number) {
      ctx!.clearRect(0, 0, w, h);

      // Links — alpha falls off with distance, squared so only close pairs read
      ctx!.lineWidth = 0.7;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK_DIST * LINK_DIST) continue;
          const k = 1 - Math.sqrt(d2) / LINK_DIST;
          const lit = Math.max(a.flash, b.flash);
          ctx!.strokeStyle = `rgb(255 216 107 / ${(k * k * 0.34 + lit * 0.3).toFixed(3)})`;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
        }
      }

      // Sparks — a short trail, a soft glow, and a bright core
      for (const s of sparks) {
        const x = s.from.x + (s.to.x - s.from.x) * s.t;
        const y = s.from.y + (s.to.y - s.from.y) * s.t;
        const tt = Math.max(0, s.t - 0.12);
        const tx = s.from.x + (s.to.x - s.from.x) * tt;
        const ty = s.from.y + (s.to.y - s.from.y) * tt;

        const trail = ctx!.createLinearGradient(tx, ty, x, y);
        trail.addColorStop(0, `rgb(${s.color} / 0)`);
        trail.addColorStop(1, `rgb(${s.color} / 0.9)`);
        ctx!.strokeStyle = trail;
        ctx!.lineWidth = 1.2;
        ctx!.beginPath();
        ctx!.moveTo(tx, ty);
        ctx!.lineTo(x, y);
        ctx!.stroke();

        const glow = ctx!.createRadialGradient(x, y, 0, x, y, 9);
        glow.addColorStop(0, `rgb(${s.color} / 0.55)`);
        glow.addColorStop(1, `rgb(${s.color} / 0)`);
        ctx!.fillStyle = glow;
        ctx!.beginPath();
        ctx!.arc(x, y, 9, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.fillStyle = "rgb(255 255 255 / 0.95)";
        ctx!.beginPath();
        ctx!.arc(x, y, 1.4, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Nodes — quiet by default, bloom briefly when a spark lands
      for (const n of nodes) {
        if (n.flash > 0) {
          const g = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, 14);
          g.addColorStop(0, `rgb(245 180 0 / ${(n.flash * 0.5).toFixed(3)})`);
          g.addColorStop(1, "rgb(245 180 0 / 0)");
          ctx!.fillStyle = g;
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, 14, 0, Math.PI * 2);
          ctx!.fill();
        }
        ctx!.fillStyle = `rgb(255 255 255 / ${(0.38 + n.flash * 0.6).toFixed(3)})`;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r + n.flash * 1.2, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Static frame for reduced motion: seed a few lit nodes so it isn't flat
      if (reduced && now === 0) {
        for (let i = 0; i < 6; i++) {
          nodes[Math.floor(Math.random() * nodes.length)].flash = 0.6;
        }
      }
    }

    function loop(now: number) {
      if (!visible || !inView) {
        raf = 0;
        return;
      }
      const dt = Math.min(48, now - (last || now));
      last = now;
      if (now - lastSpawn > SPAWN_EVERY_MS) {
        lastSpawn = now;
        spawn();
      }
      step(dt);
      draw(now);
      raf = requestAnimationFrame(loop);
    }

    function start() {
      if (reduced || raf) return;
      last = 0;
      raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      if (inView) start();
    });
    io.observe(canvas);

    const onVis = () => {
      visible = document.visibilityState === "visible";
      if (visible) start();
    };
    document.addEventListener("visibilitychange", onVis);

    if (reduced) draw(0);
    else start();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
