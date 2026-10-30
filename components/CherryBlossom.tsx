"use client";
import { useEffect, useRef } from "react";

// Fixed full-page layer of drifting cherry blossom petals. Mount once in layout.tsx.
export default function CherryBlossom({ count }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current!, ctx = c.getContext("2d")!;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Palette comes from the --petals token so petals darken in light mode;
    // stored as an index, not a colour, so a theme flip recolours petals already falling.
    const root = document.documentElement;
    const readCols = () => {
      const v = getComputedStyle(root).getPropertyValue("--petals").split(",").map((x) => x.trim()).filter(Boolean);
      return v.length ? v : ["#ffd1dc", "#f8b4c8", "#f4a0ba", "#ffe3ea"];
    };
    let cols = readCols();
    const mo = new MutationObserver(() => { cols = readCols(); });
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    let W = 0, H = 0, raf = 0;
    const mk = (top: boolean) => ({
      x: Math.random() * W, y: top ? -20 : Math.random() * H, s: 7 + Math.random() * 9,
      vy: 0.35 + Math.random() * 0.75, vx: 0.25 + Math.random() * 0.6, ph: Math.random() * 6.28,
      sw: 0.6 + Math.random() * 1.2, r: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.03,
      tilt: Math.random() * 6.28, ci: (Math.random() * cols.length) | 0, a: 0.55 + Math.random() * 0.4,
    });
    const resize = () => { W = innerWidth; H = innerHeight; c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    resize(); addEventListener("resize", resize);
    const ps = Array.from({ length: count ?? (W < 600 ? 16 : 30) }, () => mk(false));
    const draw = (p: ReturnType<typeof mk>) => {
      const s = p.s;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.scale(1, Math.abs(Math.cos(p.tilt)) * 0.7 + 0.3);
      ctx.globalAlpha = p.a; ctx.fillStyle = cols[p.ci % cols.length]; ctx.beginPath(); ctx.moveTo(0, -s);
      ctx.bezierCurveTo(s * 0.9, -s * 0.8, s * 0.8, s * 0.6, 0, s);
      ctx.bezierCurveTo(-s * 0.8, s * 0.6, -s * 0.9, -s * 0.8, 0, -s);
      ctx.moveTo(0, -s); ctx.lineTo(-s * 0.12, -s * 0.55); ctx.lineTo(s * 0.12, -s * 0.55); ctx.closePath(); ctx.fill(); ctx.restore();
    };
    const tick = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      for (const p of ps) {
        if (!still) {
          p.y += p.vy; p.x += p.vx + Math.sin((t / 1000) * p.sw + p.ph) * 0.5; p.r += p.vr; p.tilt += 0.025;
          if (p.y > H + 20 || p.x > W + 20) Object.assign(p, mk(true), { x: Math.random() * W * 1.1 - W * 0.1 });
        }
        draw(p);
      }
      if (!still) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); mo.disconnect(); };
  }, [count]);

  return <canvas ref={ref} aria-hidden="true" style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }} />;
}