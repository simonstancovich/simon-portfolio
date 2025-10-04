import { Profile } from "@/sanity/types";
import { PortableText } from "@portabletext/react";

export default async function About({ profile }: { profile: Profile }) {
  return (
    <section aria-label="About me" className="space-y-8">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">About</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          {profile?.role ?? "Software Engineer"} —{" "}
          {profile?.location ?? "Remote / On-site"}
        </p>
      </header>

      {profile?.bio && (
        <section
          aria-label="Bio"
          className="prose prose-slate dark:prose-invert max-w-none"
        >
          <PortableText value={profile.bio} />
        </section>
      )}
    </section>
  );
}
