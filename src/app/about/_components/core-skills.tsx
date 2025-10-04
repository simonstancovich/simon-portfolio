export default async function CoreSkills({ techs }: { techs: string[] }) {
  return (
    <section aria-label="Skills">
      <h2 className="text-xl font-semibold mb-4">Core skills</h2>
      <div className="flex flex-wrap gap-2">
        {techs.slice(0, 18).map((t) => (
          <span
            key={t}
            className="text-sm px-3 py-1 rounded-full border border-slate-300/60 dark:border-white/15 bg-white/70 dark:bg-white/5"
          >
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}
