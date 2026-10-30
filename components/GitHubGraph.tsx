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

async function getContributions() {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN is not configured");
  }
  const query = ` query($login: String!, $from: DateTime!, $to: DateTime!) { user(login: $login) { login contributionsCollection(from: $from, to: $to) { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount contributionLevel } } } } } } `;
  const today = new Date();
  const from = new Date(today);
  from.setFullYear(today.getFullYear() - 1);
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        login: "AdarshGT33",
        from: from.toISOString(),
        to: today.toISOString(),
      },
    }),
    cache: "no-store",
  });
  if (!res.ok) {
    console.error("GitHub HTTP error:", res.status);
    return null;
  }
  const json = await res.json();
  if (json.errors) {
    console.error("GitHub GraphQL errors:", json.errors);
    return null;
  }
  const calendar =
    json.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) {
    console.error("GitHub returned no contribution calendar.");
    return null;
  }
  console.log("========================================");
  console.log("GitHub username:", json.data.user.login);
  console.log("GitHub contribution total:", calendar.totalContributions);
  console.log("========================================");
  const days: Day[] = calendar.weeks.flatMap(
    (week: {
      contributionDays: {
        date: string;
        contributionCount: number;
        contributionLevel: string;
      }[];
    }) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: LEVEL_MAP[day.contributionLevel] ?? 0,
      })),
  );
  return { total: calendar.totalContributions, contributions: days };
}
export default async function GitHubGraph() {
  const data = await getContributions();
  if (!data) return null;
  return (
    <section className="py-12">
      {" "}
      <div className="mb-4 flex items-baseline justify-between gap-4">
        {" "}
        <h2 className="text-[15px] text-ink-soft"> On GitHub </h2>{" "}
        <a
          href={`https://${profile.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[15px] text-link transition-colors hover:text-link-hover"
        >
          {" "}
          {profile.githubUser} ↗{" "}
        </a>{" "}
      </div>{" "}
      <div className="rounded-xl border border-hairline bg-surface/60 p-5 sm:p-6">
        {" "}
        <p className="mb-5 font-display text-base font-semibold text-ink">
          {" "}
          {data.total.toLocaleString("en-US")} contributions in the last
          year{" "}
        </p>{" "}
        <div className="overflow-x-auto">
          {" "}
          <div className="min-w-[640px]">
            {" "}
            <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
              {" "}
              {data.contributions.map((day) => (
                <span
                  key={day.date}
                  title={`${day.count} on ${day.date}`}
                  style={{ backgroundColor: RAMP[day.level] }}
                  className="h-[10px] w-[10px] rounded-full"
                />
              ))}{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}