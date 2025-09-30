import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/hero/hero";
import { sanityFetch } from "@/sanity/lib/client";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { Project } from "@/sanity/types";

export default async function HomePage() {
  const projects = await sanityFetch<Project[]>({
    query: PROJECTS_QUERY,
    tags: ["project"],
    revalidate: 60,
  });

  return (
    <main className="min-h-screen">
      <Hero />
      {/* Projects preview */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-xl font-semibold mb-6">Featured work</h2>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((p) => (
            <li
              key={p._id}
              className="group rounded-2xl border border-slate-300/40 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur p-4 hover:shadow-lg transition"
            >
              {p.cover && (
                <div className="mb-3 overflow-hidden rounded-xl aspect-[16/10]">
                  <Image
                    src={urlFor(p.cover)
                      .width(900)
                      .height(560)
                      .fit("crop")
                      .url()}
                    alt={p.title}
                    width={900}
                    height={560}
                    className="object-cover"
                  />
                </div>
              )}
              <h3 className="font-semibold text-lg">{p.title}</h3>
              {p.description && (
                <p className="mt-1 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">
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
              <div className="mt-4 flex items-center gap-3 text-sm">
                {p.liveUrl && (
                  <Link
                    className="underline underline-offset-4"
                    href={p.liveUrl}
                    target="_blank"
                  >
                    Live
                  </Link>
                )}
                {p.repoUrl && (
                  <Link
                    className="underline underline-offset-4"
                    href={p.repoUrl}
                    target="_blank"
                  >
                    Code
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
