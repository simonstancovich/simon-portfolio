import { sanityFetch } from "@/sanity/lib/client";
import { PROFILE_QUERY, TECHS_QUERY } from "@/sanity/lib/queries";
import type { Profile } from "@/sanity/types";
import About from "./_components/about";
import CoreSkills from "./_components/core-skills";

export const revalidate = 60;

export default async function AboutPage() {
  const [profile, techs] = await Promise.all([
    sanityFetch<Profile>({
      query: PROFILE_QUERY,
      tags: ["profile"],
      revalidate,
    }),
    sanityFetch<string[]>({ query: TECHS_QUERY, revalidate }),
  ]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 space-y-14">
      <About profile={profile} />
      <CoreSkills techs={techs ?? []} />
    </main>
  );
}
