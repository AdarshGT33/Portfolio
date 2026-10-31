"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { nav } from "@/lib/data";

type Item = { key: string; label: string; href: string };

// The three core pages are defined here, so navigation works no matter what lib/data says about them.
// Anything else in lib/data's `nav` (blog, ...) is kept after them with its own href.
const CORE: Item[] = [
  { key: "h", label: "home", href: "/" },
  { key: "p", label: "projects", href: "/projects" },
  { key: "w", label: "work", href: "/work" },
];
const CORE_KEYS = new Set(CORE.map((c) => c.key));
const CORE_LABELS = new Set(["home", "projects", "project", "work", "experience"]);
const extra = (nav as Item[]).filter(
  (n) => !CORE_KEYS.has(n.key) && !CORE_LABELS.has(n.label.trim().toLowerCase()),
);
const ITEMS: Item[] = [...CORE, ...extra];

const isExternal = (href: string) => /^https?:\/\//.test(href);

const toggleTheme = () => {
  const root = document.documentElement;
  const next = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch { /* private mode */ }
};

/** Top nav with single-key shortcuts, as shown in the [h] [p] [w] brackets. */
export default function Nav() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      // Don't hijack keys while the visitor is typing.
      if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;

      if (e.key.toLowerCase() === "t") { e.preventDefault(); toggleTheme(); return; }

      const hit = ITEMS.find((n) => n.key === e.key.toLowerCase());
      if (!hit) return;
      e.preventDefault();
      if (isExternal(hit.href)) window.open(hit.href, "_blank", "noopener");
      else if (hit.href === pathname) window.scrollTo({ top: 0, behavior: "smooth" });
      else router.push(hit.href);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, pathname]);

  return (
    <nav className="flex flex-wrap items-center gap-x-5 gap-y-1 pt-10 sm:gap-x-10 sm:pt-14" aria-label="Primary">
      {ITEMS.map((item) => {
        const current = item.href === pathname;
        // py-2.5 is tap area, not spacing -- 16px text alone is a 25px target.
        const cls = `group py-2.5 text-[16px] transition-colors ${
          current ? "font-medium text-link-hover" : "text-link hover:text-link-hover"
        }`;
        const inner = (
          <>
            {/* The bracket is a keyboard hint; a phone has no keyboard, and hiding
                it is also what keeps all four items on one line. */}
            <span className="hidden font-mono opacity-60 transition-opacity group-hover:opacity-100 sm:inline">[{item.key}]</span>{" "}
            {item.label}
          </>
        );
        return isExternal(item.href) ? (
          <a key={item.key} href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
        ) : (
          <Link key={item.key} href={item.href} aria-current={current ? "page" : undefined} className={cls}>{inner}</Link>
        );
      })}
      {/* Label stays constant so there is nothing to hydrate -- the icon-free
          text avoids a server/client mismatch over the current theme. */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Switch between dark and light theme"
        className="group ml-auto py-2.5 text-[16px] text-link transition-colors hover:text-link-hover"
      >
        <span className="hidden font-mono opacity-60 transition-opacity group-hover:opacity-100 sm:inline">[t]</span>{" "}
        theme
      </button>
    </nav>
  );
}