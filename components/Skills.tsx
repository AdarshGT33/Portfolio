import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <section className="py-12 border-t border-hairline">
      <h2 className="font-display font-semibold text-lg text-ink mb-8">
        Skills
      </h2>

      <div className="space-y-5">
        {skills.map((group) => (
          <div
            key={group.category}
            className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-2 sm:gap-8"
          >
            <p className="font-mono text-xs text-ink-soft pt-1.5">
              {group.category}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="text-sm text-ink bg-surface border border-hairline rounded px-2.5 py-1"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
