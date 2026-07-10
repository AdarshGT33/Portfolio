import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section className="py-12 border-t border-hairline">
      <h2 className="font-display font-semibold text-lg text-ink mb-8">
        Projects
      </h2>

      <div className="space-y-6">
        {projects.map((project) => (
          <div
            key={project.name}
            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2"
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink font-medium text-[15px] underline decoration-hairline underline-offset-4 hover:text-signal"
              >
                {project.name}
              </a>

              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-signal hover:underline underline-offset-4"
                >
                  live ↗
                </a>
              )}

              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs text-ink-soft bg-surface rounded px-2 py-0.5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <span className="font-mono text-xs text-ink-soft">
              {project.dates}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
