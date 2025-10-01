import { sanityFetch } from "@/sanity/lib/client";
import {
  PROFILE_QUERY,
  EXPERIENCES_QUERY,
  TECHS_QUERY,
} from "@/sanity/lib/queries";
import type { Profile, Experience } from "@/sanity/types";
import { PortableText } from "@portabletext/react";

export const revalidate = 60;

function fmt(date?: string) {
  if (!date) return "Present";
  const d = new Date(date);
  return `${d.toLocaleString("en-GB", { month: "short" })} ${d.getFullYear()}`;
}

export default async function AboutPage() {
  const [profile, experiences, techs] = await Promise.all([
    sanityFetch<Profile>({
      query: PROFILE_QUERY,
      tags: ["profile"],
      revalidate,
    }),
    sanityFetch<Experience[]>({
      query: EXPERIENCES_QUERY,
      tags: ["experience"],
      revalidate,
    }),
    sanityFetch<string[]>({ query: TECHS_QUERY, revalidate }),
  ]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 space-y-14">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">About</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          {profile?.role ?? "Software Engineer"} —{" "}
          {profile?.location ?? "Remote / On-site"}
        </p>
      </header>

      {profile?.bio && (
        <section className="prose prose-slate dark:prose-invert max-w-none">
          <PortableText value={profile.bio} />
        </section>
      )}

      <section aria-label="Experience">
        <h2 className="text-xl font-semibold mb-4">Experience</h2>
        <ol className="relative border-s border-slate-200/60 dark:border-white/10">
          {experiences.map((e) => (
            <li key={e._id} className="pl-6 py-4 relative">
              <span className="absolute left-0 top-6 -translate-x-1.5 size-3 rounded-full bg-slate-300 dark:bg-white/30" />
              <div className="flex flex-wrap items-baseline gap-x-2">
                <h3 className="font-medium">{e.role}</h3>
                <span className="text-slate-500">· {e.company}</span>
                {e.location && (
                  <span className="text-slate-500">· {e.location}</span>
                )}
                <span className="ml-auto text-sm text-slate-500">
                  {fmt(e.start)} — {fmt(e.end)}
                </span>
              </div>
              {e.summary && (
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {e.summary}
                </p>
              )}
              {e.highlights?.length ? (
                <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-slate-600 dark:text-slate-300">
                  {e.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              ) : null}
              {e.tech?.length ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {e.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded-full border border-slate-300/50 dark:border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      {techs?.length ? (
        <section aria-label="Skills">
          <h2 className="text-xl font-semibold mb-4">Core skills</h2>
          <div className="flex flex-wrap gap-2">
            {techs.slice(0, 18).map((t) => (
              <span
                key={t}
                className="text-sm px-3 py-1 rounded-full border border-slate-300/60 dark:border-white/15 bg-white/70 dark:bg-white/5"
              >
                {t}
              </span>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
