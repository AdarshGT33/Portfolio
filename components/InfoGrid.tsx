import { profile, currently, previously } from "@/lib/data";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display font-semibold text-lg text-ink mb-3">
      {children}
    </h2>
  );
}

export default function InfoGrid() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-10 py-12 border-t border-hairline">
      {/* About Me */}
      <div>
        <SectionLabel>About Me</SectionLabel>
        <ul className="space-y-2.5 text-[15px]">
          <li className="flex items-center gap-2.5">
            <span aria-hidden>📍</span>
            <span className="text-ink-soft">{profile.location}</span>
          </li>
          <li className="flex items-center gap-2.5">
            <span aria-hidden>✉️</span>
            <a
              href={`mailto:${profile.email}`}
              className="text-ink underline decoration-hairline underline-offset-4 hover:text-signal"
            >
              {profile.email}
            </a>
          </li>
          <li className="flex items-center gap-2.5">
            <span aria-hidden>💼</span>
            <a
              href={`https://${profile.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline decoration-hairline underline-offset-4 hover:text-signal"
            >
              {profile.linkedin}
            </a>
          </li>
          <li className="flex items-center gap-2.5">
            <span aria-hidden>🖥️</span>
            <a
              href={`https://${profile.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline decoration-hairline underline-offset-4 hover:text-signal"
            >
              {profile.github}
            </a>
          </li>
        </ul>
      </div>

      {/* Currently / Previously */}
      <div>
        <SectionLabel>Currently</SectionLabel>
        <ul className="space-y-2.5 text-[15px] mb-8">
          {currently.map((item) => (
            <li key={item.label}>
              <span className="text-ink font-medium">{item.label}</span>
              <span className="text-ink-soft"> — {item.detail}</span>
            </li>
          ))}
        </ul>

        <SectionLabel>Previously</SectionLabel>
        <ul className="space-y-2.5 text-[15px]">
          {previously.map((item) => (
            <li key={item.label}>
              <span className="text-ink font-medium">{item.label}</span>
              <span className="text-ink-soft"> — {item.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
