"use client";
import { useState } from "react";
import AccordionItem, { linkRow, linkCls } from "./AccordionItem";

export type Job = {
  id: string; company: string; role: string; dates: string;
  /** Two or three bullets: name what was built, say what it solved, carry a real number. */
  summary: string[]; logo?: string; link?: { label: string; href: string };
};

export const defaultJobs: Job[] = [
  { id: "job-1", company: "Suraksha Lens", role: "AIML Engineer", dates: "July 2026 to now",
    summary: [
      "The dashboard holds 4 layers of climate and crime data across 650+ districts(India and Sri Lanka), but you had to know where to look. With the AI assistant chatbot (built from scratch), you can now ask a question in plain words and get reliable answers back, any district, any year.",
      "You can speak instead of type, in any of seven regional languages, and it works out which one you used. Built a benchmark harness that checks speaking gets you the same answer as typing, holding transcription error near 2%.",
    ],
    link: { label: "Suraksha Lens", href: "https://www.saicjs.com/suraksha-lens-1" } },
  { id: "job-2", company: "BackkBenchers", role: "AI Creative Technologist", dates: "Jan 2026 to Mar 2026",
    summary: [
      "Video ads cost more than these brands could spend. Built a prompt-to-video pipeline — Gemini for the storyline, Veo 3.0 for the shots — that turned out 60+ finished ads at 2–3 a day.",
      "Volume only helps if the work doesn't come back. Brand voice went into the prompts themselves, so ads shipped with almost no revision rounds and pulled 3K–17K organic views a post.",
    ],
    link: { label: "BackkBenchers", href: "https://backkbenchers.in/#" } },
  { id: "job-3", company: "Ekanga", role: "AI Research Intern", dates: "09 2025 to Dec 2025",
    summary: [
      "An avatar that looks different every run can't carry a product. The multi-modal AI avatar system I built with the CEO holds one identity through a prompt refinement pipeline; inconsistencies down 30%, iteration time down 25%.",
      "Fidelity was the blocker. 700+ prompts tuned across Stable Diffusion, Midjourney and Gemini lifted visual quality 40% over baseline, and settled which models the system runs on.",
    ],
    link: { label: "Ekanga", href: "https://www.ekanga.in/"} },
];

export default function Work({ jobs = defaultJobs }: { jobs?: Job[] }) {
  const [open, setOpen] = useState<string | null>(jobs[0]?.id ?? null);

  return (
    <section id="work" className="max-w-[780px] scroll-mt-6 pt-20" aria-labelledby="work-title">
      <h1 id="work-title" className="font-display text-[32px] font-bold leading-tight tracking-tight text-ink">work</h1>
      <p className="mb-12 mt-5 text-[20px] leading-[1.8] text-ink-soft">
        AI, backend, and the systems underneath.
      </p>
      {jobs.map((j) => {
        const isOpen = open === j.id;
        return (
          <AccordionItem
            key={j.id}
            id={`wk-${j.id}`}
            open={isOpen}
            indent={!!j.logo}
            onToggle={() => setOpen(isOpen ? null : j.id)}
            head={
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {j.logo && <img className="mt-0.5 h-7 w-7 flex-none self-start object-contain" src={j.logo} alt="" />}
                <span className="min-w-0 flex-1">
                  <span className="block text-[19px] font-semibold">{j.company}</span>
                  <span className="mt-1 block text-[17px] text-ink-soft">{j.role}</span>
                </span>
                <span className="whitespace-nowrap text-[15px] text-ink-soft">{j.dates}</span>
              </>
            }
          >
            <ul className="mb-4 list-disc space-y-2 pl-5 marker:text-link">
              {j.summary.map((point) => <li key={point}>{point}</li>)}
            </ul>
            {j.link && (
              <div className={linkRow}>
                <a href={j.link.href} target="_blank" rel="noreferrer" className={linkCls}>{j.link.label} ↗</a>
              </div>
            )}
          </AccordionItem>
        );
      })}
    </section>
  );
}