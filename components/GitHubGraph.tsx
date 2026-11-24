import { profile } from "@/lib/data";

type Day = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

// Cherry-blossom inspired contribution ramp.
const RAMP = ["var(--gh-0)", "var(--gh-1)", "var(--gh-2)", "var(--gh-3)", "var(--gh-4)"];

const LEVEL_MAP: Record<string, 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const QUERY = `query($login: String!, $from: DateTime!, $to: DateTime!) { user(login: $login) { contributionsCollection(from: $from, to: $to) { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount contributionLevel } } } } } }`;

// Every failure returns null so the graph hides and the rest of the home page
// still renders -- a throw here would take the whole page down with it.
async function getContributions() {
  if (!process.env.GITHUB_TOKEN) {
    console.error("GITHUB_TOKEN is not set; hiding the GitHub graph.");
    return null;
  }
  const to = new Date();
  const from = new Date(to);
  from.setFullYear(to.getFullYear() - 1);
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { login: profile.githubUser, from: from.toISOString(), to: to.toISOString() },
      }),
      // Contributions change daily, so an hour-old graph is fine. The page is
      // served from cache and rebuilt in the background; if GitHub is down
      // during a rebuild, visitors keep getting the last good copy.
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      console.error("GitHub HTTP error:", res.status);
      return null;
    }
    const json = await res.json();
    const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;
    if (json.errors || !calendar) {
      console.error("GitHub GraphQL returned no calendar:", json.errors);
      return null;
    }
    const days: Day[] = calendar.weeks.flatMap(
      (week: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          level: LEVEL_MAP[day.contributionLevel] ?? 0,
        })),
    );
    return { total: calendar.totalContributions as number, contributions: days };
  } catch (e) {
    // Network failure / timeout: same treatment as a bad response.
    console.error("GitHub fetch failed:", e);
    return null;
  }
}

export default async function GitHubGraph() {
  const data = await getContributions();
  if (!data) return null;
  return (
    <section className="py-12">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 className="text-[15px] text-ink-soft">On GitHub</h2>
        <a
          href={`https://${profile.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2 text-[15px] text-link transition-colors hover:text-link-hover sm:py-0"
        >
          {profile.githubUser} ↗
        </a>
      </div>
      <div className="rounded-xl border border-hairline bg-surface/60 p-5 sm:p-6">
        <p className="mb-5 font-display text-base font-semibold text-ink">
          {data.total.toLocaleString("en-US")} contributions in the last year
        </p>
        <div className="overflow-x-auto">
          <div className="min-w-[640px]">
            <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
              {data.contributions.map((day) => (
                <span
                  key={day.date}
                  title={`${day.count} on ${day.date}`}
                  style={{ backgroundColor: RAMP[day.level] }}
                  className="h-[10px] w-[10px] rounded-full"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
