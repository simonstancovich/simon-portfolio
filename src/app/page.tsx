import Hero from "@/components/hero/hero";
import { sanityFetch } from "@/sanity/lib/client";
import { FEATURED_PROJECTS_QUERY } from "@/sanity/lib/queries";
import type { Project } from "@/sanity/types";
import { FeaturedProject } from "./_components/featured-projects";

export default async function HomePage() {
  const projects = await sanityFetch<Project[]>({
    query: FEATURED_PROJECTS_QUERY,
    tags: ["project"],
    revalidate: 60,
  });

  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedProject projects={projects} />
    </main>
  );
}
