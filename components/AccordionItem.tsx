"use client";
import type { ReactNode } from "react";

/** Shared expand/collapse row used by Projects, Work and the hackathon list. */
export default function AccordionItem({
  id, open, onToggle, head, children, indent = false, dense = false,
}: {
  id: string; open: boolean; onToggle: () => void;
  head: ReactNode;       // left side of the header row
  children: ReactNode;   // expanded body
  indent?: boolean;      // align body under a logo
  dense?: boolean;       // tighter rows (hackathon list)
}) {
  return (
    <div
      className={`-mx-3.5 rounded-xl border px-3.5 transition-colors motion-reduce:transition-none ${
        dense ? "py-[18px]" : "py-[21px]"
      } ${open ? "border-[color:var(--card-line)] bg-[var(--card)]" : "border-transparent"}`}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className="flex w-full items-center gap-3.5 text-left text-ink"
      >
        {head}
        <span aria-hidden className="w-5 flex-none text-center text-[22px] leading-none text-link">
          {open ? "×" : "+"}
        </span>
      </button>
      <div
        id={id}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className={`overflow-hidden ${open ? "visible" : "invisible [transition:visibility_0s_.3s]"}`}>
          <div className={`pb-1.5 pr-8 pt-4 text-[17px] leading-[1.85] text-ink-soft ${indent ? "pl-[42px]" : ""}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export const linkRow = "mt-5 flex flex-wrap gap-x-8 gap-y-2";
export const linkCls = "text-[17px] text-link transition-colors hover:text-link-hover hover:underline";