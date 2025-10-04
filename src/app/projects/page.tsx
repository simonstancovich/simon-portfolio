import { sanityFetch } from "@/sanity/lib/client";
import { PROJECTS_FILTERED_QUERY, TECHS_QUERY } from "@/sanity/lib/queries";
import type { Project } from "@/sanity/types";
import ProjectsClient from "@/app/projects/_components/projects-client";

export const revalidate = 60;

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const tech = Array.isArray(sp.tech) ? (sp.tech[0] ?? "") : (sp.tech ?? "");

  const [allTechs, projects] = await Promise.all([
    sanityFetch<string[]>({ query: TECHS_QUERY, revalidate }),
    sanityFetch<Project[]>({
      query: PROJECTS_FILTERED_QUERY,
      params: { tech },
      tags: ["project"],
      revalidate,
    }),
  ]);

  return <ProjectsClient projects={projects} allTechs={allTechs} />;
}
