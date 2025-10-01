import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import type { Project } from "@/sanity/types";

const PROJECT_BY_SLUG = groq /* groq */ `
*[_type == "project" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, description, cover, tech, repoUrl, liveUrl
}
`;

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const project = await sanityFetch<Project | null>({
    query: PROJECT_BY_SLUG,
    params,
    revalidate,
  });
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} · Projects`,
    description: project.description?.slice(0, 160),
    openGraph: {
      images: project.cover
        ? [
            {
              url: urlFor(project.cover)
                .width(1200)
                .height(630)
                .fit("crop")
                .url(),
            },
          ]
        : undefined,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await sanityFetch<Project | null>({
    query: PROJECT_BY_SLUG,
    params,
    revalidate,
  });
  if (!project) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/projects"
        className="text-sm underline underline-offset-4 hover:opacity-90"
      >
        ← Back to projects
      </Link>

      <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
        {project.title}
      </h1>
      {project.description && (
        <p className="mt-3 text-slate-700 dark:text-slate-300">
          {project.description}
        </p>
      )}

      {project.cover && (
        <div className="mt-6 overflow-hidden rounded-xl border border-slate-300/40 dark:border-white/10">
          <Image
            src={urlFor(project.cover)
              .width(1600)
              .height(900)
              .fit("crop")
              .url()}
            alt={project.title}
            width={1600}
            height={900}
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tech?.map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-1 rounded-full border border-slate-300/50 dark:border-white/10"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {project.liveUrl && (
          <Link
            href={project.liveUrl}
            target="_blank"
            className="inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium bg-slate-900 text-white dark:bg-white dark:text-black hover:opacity-95"
          >
            View live
          </Link>
        )}
        {project.repoUrl && (
          <Link
            href={project.repoUrl}
            target="_blank"
            className="inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium border border-slate-300/60 dark:border-white/15 bg-white/70 dark:bg-white/5 hover:bg-slate-100/70 dark:hover:bg-white/10"
          >
            View code
          </Link>
        )}
      </div>
    </main>
  );
}
