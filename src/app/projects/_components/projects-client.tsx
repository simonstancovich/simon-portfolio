"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";
import TechFilter from "@/components/tech-filter/tech-filter";
import type { Project } from "@/sanity/types";

export default function ProjectsClient({
  projects,
  allTechs,
}: {
  projects: Project[];
  allTechs: string[];
}) {
  const sp = useSearchParams();
  const techParam = (sp.get("tech") ?? "").toLowerCase();

  const filtered = useMemo(() => {
    if (!techParam) return projects;
    return projects.filter((p) =>
      p.tech?.some((t) => t.toLowerCase() === techParam)
    );
  }, [projects, techParam]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Projects
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Selected work. Clean code, strong UI, production quality.
          </p>
        </div>
        <div className="hidden md:block">
          <TechFilter allTechs={allTechs} />
        </div>
      </header>
      <div className="md:hidden mb-6">
        <TechFilter allTechs={allTechs} />
      </div>

      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <li
            key={p._id}
            className="group relative rounded-2xl border border-slate-300/40 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur overflow-hidden transition-shadow hover:shadow-lg"
          >
            <Link href={`/projects/${p.slug}`} className="block">
              {p.cover && (
                <div className="relative overflow-hidden aspect-[16/10]">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition
                               bg-[radial-gradient(600px_200px_at_20%_10%,rgba(255,255,255,0.12),transparent_60%)]"
                  />
                  <Image
                    src={urlFor(p.cover)
                      .width(960)
                      .height(600)
                      .fit("crop")
                      .url()}
                    alt={p.title}
                    width={960}
                    height={600}
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg">{p.title}</h3>
                {p.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
                    {p.description}
                  </p>
                )}
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tech?.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded-full border border-slate-300/50 dark:border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                  {p.liveUrl && (
                    <span className="underline underline-offset-4">Link</span>
                  )}
                  {p.repoUrl && (
                    <span className="underline underline-offset-4">Code</span>
                  )}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
