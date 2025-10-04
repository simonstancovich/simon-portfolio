import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import type { Project } from "@/sanity/types";
import { SingleProject } from "./_components/single-project";

const PROJECT_BY_SLUG = groq /* groq */ `
*[_type == "project" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, description, cover, tech, repoUrl, liveUrl, body
}
`;

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await sanityFetch<Project | null>({
    query: PROJECT_BY_SLUG,
    params: { slug },
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await sanityFetch<Project | null>({
    query: PROJECT_BY_SLUG,
    params: { slug },
    revalidate,
  });
  if (!project) notFound();

  return <SingleProject project={project} />;
}
