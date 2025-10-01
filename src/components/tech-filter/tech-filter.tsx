"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function TechFilter({ allTechs }: { allTechs: string[] }) {
  const router = useRouter();
  const sp = useSearchParams();
  const current = sp.get("tech") ?? "";

  const setTech = (t: string) => {
    const params = new URLSearchParams(sp.toString());
    if (!t) params.delete("tech");
    else params.set("tech", t);
    router.push(`/projects?${params.toString()}`, { scroll: false });
  };

  const chipBase =
    "inline-flex items-center h-8 rounded-full border px-3 text-sm transition " +
    "border-slate-300/60 dark:border-white/15 bg-white/70 dark:bg-white/5 hover:bg-slate-100/70 dark:hover:bg-white/10";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={() => setTech("")}
        className={`${chipBase} ${current === "" ? "ring-2 ring-slate-400/60 dark:ring-white/30" : ""}`}
      >
        All
      </button>
      {allTechs.map((t) => (
        <button
          key={t}
          onClick={() => setTech(t)}
          className={`${chipBase} ${current === t ? "ring-2 ring-slate-400/60 dark:ring-white/30" : ""}`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
