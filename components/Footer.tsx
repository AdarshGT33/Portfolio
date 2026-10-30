"use client";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { profile } from "@/lib/data";
import photo from "../public/rain.jpg";
import throne from "../public/throne.webp";

export type Social = { name: string; href: string; path: string; stroke?: boolean };

export const Socials: Social[] = [
  {
    name: "X",
    href: "https://x.com/your-handle", // TODO: your handle (or add profile.x to lib/data)
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "GitHub",
    href: `https://${profile.github}`,
    path: "M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2z",
  },
  {
    // boxed "in" glyph, as in the reference
    name: "LinkedIn",
    href: `https://${profile.linkedin}`,
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    // outlined envelope
    name: "Email",
    href: `mailto:${profile.email}`,
    stroke: true,
    path: "M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm0 2 8 6 8-6",
  },
];

type Drop = { x: number; y: number; l: number; v: number; a: number };

// Art is per theme. Rain belongs to the night scene only -- in light the canvas
// is never rendered, so the animation loop never starts.
const SCENE = {
  dark: {
    img: photo,
    alt: "A figure with spiky orange hair stands with his head bowed in the rain at night",
    rain: true,
  },
  light: {
    img: throne,
    alt: "A figure in a white mantle sits on a throne among rubble",
    rain: false,
  },
} as const;

const cta = (): { label: string; href: string }[] => [
  { label: "Let's talk", href: `mailto:${profile.email}` },
  { label: "Resume", href: "/resume.pdf" }, // TODO: path to your resume
];

// Image size: the one knob. Height follows the photo's own aspect ratio, so all of it is always visible.
const SCENE_W = "clamp(150px, 20vw, 260px)";

export default function Footer({
  alt,
  socials = Socials,
  actions = cta(),
  visits,
  active,
}: {
  alt?: string; socials?: Social[]; actions?: { label: string; href: string }[];
  visits?: number; active?: number;
}) {
  const box = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // The art only exists in the portal, which is client-only, so reading the
  // theme off the DOM here costs no hydration mismatch.
  const [theme, setTheme] = useState<keyof typeof SCENE>("dark");
  useEffect(() => {
    const root = document.documentElement;
    const read = () => setTheme(root.dataset.theme === "light" ? "light" : "dark");
    read();
    const mo = new MutationObserver(read);
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);
  const scene = SCENE[theme];

  useEffect(() => {
    if (!mounted || !scene.rain) return;
    const el = box.current!, c = cv.current!, ctx = c.getContext("2d")!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const dpr = Math.min(devicePixelRatio || 1, 2), wind = -0.22;
    let W = 0, H = 0, raf = 0, drops: Drop[] = [];
    const make = (init: boolean): Drop => ({
      x: Math.random() * (W + 80), y: init ? Math.random() * H : -30,
      l: 10 + Math.random() * 22, v: 9 + Math.random() * 9, a: 0.18 + Math.random() * 0.35,
    });
    const resize = () => {
      W = el.clientWidth; H = el.clientHeight;
      c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drops = Array.from({ length: Math.round(W / 3.2) }, () => make(true));
    };
    const tick = () => {
      ctx.clearRect(0, 0, W, H); ctx.lineWidth = 1; ctx.lineCap = "round";
      for (const d of drops) {
        ctx.strokeStyle = `rgba(140,150,165,${d.a})`;
        ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(d.x + d.l * wind, d.y + d.l); ctx.stroke();
        d.x += d.v * wind; d.y += d.v;
        if (d.y > H + 30 || d.x < -40) Object.assign(d, make(false));
      }
      raf = requestAnimationFrame(tick);
    };
    const ro = new ResizeObserver(resize); ro.observe(el); resize();
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, [mounted, scene.rain]);

  const vars = {
    "--scene-w": SCENE_W,
    "--scene-h": `calc(${SCENE_W} / ${scene.img.width / scene.img.height})`,
  } as CSSProperties;

  const linkCls = "inline-flex items-center gap-2 text-link transition-colors hover:text-link-hover";

  return (
    <>
      {/* Reserves room for the art on small screens; on lg+ the art sits beside the text */}
      <footer style={vars} className={`relative z-10 w-full pb-[calc(var(--scene-h)_+_1.5rem)] lg:max-w-[60vw] lg:pb-12 ${actions.length ? "mt-24" : "mt-14"}`}>
        {actions.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-[34px] gap-y-3">
          {actions.map((a) => (
            <a
              key={a.label}
              href={a.href}
              {...(a.href.startsWith("mailto:") || a.href.startsWith("/") ? {} : { target: "_blank", rel: "noreferrer" })}
              className={`${linkCls} text-[20px] font-medium`}
            >
              {a.label} <span aria-hidden>↗</span>
            </a>
          ))}
        </div>

        )}

        <div className={`${actions.length ? "mt-16" : ""} border-t border-hairline pt-10`}>
          <nav aria-label="Social links">
            <ul className="flex flex-wrap gap-x-[34px] gap-y-4">
              {socials.map((l) => (
                <li key={l.name}>
                  <a
                    href={l.href}
                    {...(l.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noreferrer" })}
                    className={`${linkCls} text-[20px]`}
                  >
                    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" className="block flex-none"
                      fill={l.stroke ? "none" : "currentColor"} stroke={l.stroke ? "currentColor" : "none"}
                      strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
                      <path d={l.path} />
                    </svg>
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {visits !== undefined && (
            <p className="mt-11 flex items-center gap-2.5 text-[18px] text-ink-soft">
              <span>{visits.toLocaleString("en-US")} visits</span>
              {active !== undefined && (
                <>
                  <span aria-hidden>·</span>
                  <span className="inline-flex items-center gap-2">
                    <span aria-hidden className="h-[7px] w-[7px] rounded-full bg-[var(--live)]" />
                    {active} active now
                  </span>
                </>
              )}
            </p>
          )}
        </div>
      </footer>

      {/* Art is attached to <body> (position: relative), so it sits in the page's very bottom-right corner,
          outside your content container. */}
      {mounted &&
        createPortal(
          <div
            ref={box}
            style={vars}
            className="footer-scene pointer-events-none absolute bottom-0 right-0 z-0 h-[var(--scene-h)] w-[var(--scene-w)]"
          >
            <Image src={scene.img} alt={alt ?? scene.alt} fill sizes="260px" className="object-contain object-bottom" />
            {scene.rain && <canvas ref={cv} aria-hidden="true" className="absolute inset-0 h-full w-full" />}
          </div>,
          document.body,
        )}
    </>
  );
}