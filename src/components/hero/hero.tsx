// src/components/hero.tsx
import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/client";
import { PROFILE_QUERY } from "@/sanity/lib/queries";
import type { Profile } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";

export default async function Hero() {
  const p = await sanityFetch<Profile>({
    query: PROFILE_QUERY,
    tags: ["profile"],
    revalidate: 60,
  });

  const name = p?.name ?? "Your Name";
  const role = p?.role ?? "Fullstack Developer";
  const email = p?.email;
  const cv = p?.cvUrl;

  return (
    <header className="relative overflow-hidden">
      {/* soft background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 size-[28rem] rounded-full blur-3xl opacity-30 bg-gradient-to-br from-indigo-400/40 to-sky-300/40 dark:from-indigo-500/20 dark:to-sky-400/20" />
        <div className="absolute -bottom-16 -right-16 size-[24rem] rounded-full blur-3xl opacity-30 bg-gradient-to-tr from-fuchsia-400/30 to-rose-300/30 dark:from-fuchsia-500/15 dark:to-rose-400/15" />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10 md:pt-20 md:pb-16">
        {/* availability pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-300/50 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur px-3 py-1 text-xs md:text-sm">
          <span className="inline-block size-2.5 rounded-full bg-emerald-500" />
          <span>Open to new opportunities</span>
        </div>

        <div className="mt-6 md:mt-8 grid md:grid-cols-[auto,1fr] items-center gap-6 md:gap-10">
          {p?.avatar && (
            <div className="hidden md:block">
              <div className="relative size-28 overflow-hidden rounded-full ring-2 ring-slate-300/60 dark:ring-white/10">
                <Image
                  src={urlFor(p.avatar)
                    .width(224)
                    .height(224)
                    .fit("crop")
                    .url()}
                  alt={name}
                  width={112}
                  height={112}
                />
              </div>
            </div>
          )}

          <div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
              {name}
            </h1>

            <p className="mt-3 text-lg md:text-xl text-slate-700 dark:text-slate-300">
              {role} • React / TypeScript / Next.js • Clean architecture, DX &
              performance.
            </p>

            <ul className="mt-5 flex flex-wrap gap-2 text-sm text-slate-600 dark:text-slate-300">
              {[
                "Ship fast with quality",
                "Strong UI + system design",
                "Production-ready code & tests",
              ].map((p) => (
                <li
                  key={p}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300/50 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur px-3 py-1"
                >
                  <span aria-hidden>✓</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/projects"
                className="inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium
                           bg-slate-900 text-white dark:bg-white dark:text-black hover:opacity-95 active:scale-[.99] transition"
              >
                View projects
              </Link>

              {email && (
                <Link
                  href={`mailto:${email}?subject=Hi%20Simon%20—%20Opportunity`}
                  className="inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium
                             border border-slate-300/60 dark:border-white/15 bg-white/70 dark:bg-white/5 backdrop-blur
                             hover:bg-slate-100/70 dark:hover:bg-white/10 active:scale-[.99] transition"
                >
                  Email me
                </Link>
              )}

              {cv && (
                <Link
                  href={cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm underline underline-offset-4 hover:opacity-90"
                >
                  Download CV
                </Link>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              {[
                "React",
                "React Native",
                "Vue.js",
                "TypeScript",
                "Next.js",
                "Node",
                "PostgreSQL",
                "Nest.js",
                "Firebase",
                "AWS",
                "GCP",
                "Tailwind CSS",
                "Styled Components",
                "Prisma",
                "Sanity",
                "Strapi",
                "GraphQL",
                "Docker",
              ].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-slate-300/50 dark:border-white/10 px-2 py-1"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
