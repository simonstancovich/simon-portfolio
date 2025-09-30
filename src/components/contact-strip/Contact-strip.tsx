import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/client";
import { PROFILE_QUERY } from "@/sanity/lib/queries";
import type { Profile } from "@/sanity/types";

export default async function ContactStrip() {
  const p = await sanityFetch<Profile>({
    query: PROFILE_QUERY,
    tags: ["profile"],
    revalidate: 60,
  });
  const email = p?.email;
  const linkedin = p?.linkedin;
  const github = p?.github;
  const cv = p?.cvUrl;

  return (
    <section
      aria-label="Contact and profile links"
      className="border-y border-slate-200/60 dark:border-white/10 bg-white/70 dark:bg-white/3 backdrop-blur"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center gap-3">
        <p className="text-sm text-slate-800 dark:text-slate-300 mr-auto">
          Ready to contribute! Let’s talk.
        </p>

        {email && (
          <Link
            href={`mailto:${email}?subject=Hi%20Simon%20—%20Opportunity`}
            className="inline-flex h-9 items-center justify-center rounded-lg px-3 text-sm font-medium bg-slate-900 text-white dark:bg-white dark:text-black hover:opacity-95 active:scale-[.99] transition"
          >
            Email me
          </Link>
        )}

        {cv && (
          <Link
            href={cv}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center justify-center rounded-lg px-3 text-sm font-medium border border-slate-300/60 dark:border-white/15 bg-white/70 dark:bg-white/5 hover:bg-slate-100/70 dark:hover:bg-white/10 active:scale-[.99] transition"
          >
            Download CV
          </Link>
        )}

        {linkedin && (
          <Link
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center justify-center rounded-lg px-3 text-sm font-medium underline underline-offset-4 hover:opacity-90"
          >
            LinkedIn
          </Link>
        )}

        {github && (
          <Link
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center justify-center rounded-lg px-3 text-sm font-medium underline underline-offset-4 hover:opacity-90"
          >
            GitHub
          </Link>
        )}
      </div>
    </section>
  );
}
