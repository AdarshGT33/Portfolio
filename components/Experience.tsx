import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section className="py-12 border-t border-hairline">
      <h2 className="font-display font-semibold text-lg text-ink mb-8">
        Experience
      </h2>

      <div className="space-y-10">
        {experience.map((job) => (
          <div key={job.company} className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-2 sm:gap-8">
            <div className="font-mono text-xs text-ink-soft pt-1 sm:pt-0.5">
              {job.dates}
            </div>
            <div>
              <p className="text-ink font-medium">
                {job.title}
                <span className="text-ink-soft font-normal"> · {job.company}</span>
              </p>
              <p className="font-mono text-xs text-ink-soft mt-0.5">{job.type}</p>
              <ul className="mt-3 space-y-2">
                {job.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="text-[15px] text-ink-soft leading-relaxed pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-hairline"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
