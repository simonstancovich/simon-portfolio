"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as any;
    if (data.website) return; // honeypot
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          name="name"
          required
          placeholder="Your name"
          className="h-10 rounded-lg px-3 border border-slate-300/60 dark:border-white/15 bg-white/70 dark:bg-white/5"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Your email"
          className="h-10 rounded-lg px-3 border border-slate-300/60 dark:border-white/15 bg-white/70 dark:bg-white/5"
        />
      </div>
      <textarea
        name="message"
        required
        placeholder="How can I help?"
        className="min-h-28 w-full rounded-lg px-3 py-2 border border-slate-300/60 dark:border-white/15 bg-white/70 dark:bg-white/5"
      />
      {/* honeypot */}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />
      <div className="flex items-center gap-3">
        <button
          disabled={status === "sending"}
          className="inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium
                     bg-slate-900 text-white dark:bg-white dark:text-black hover:opacity-95 active:scale-[.99] disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send"}
        </button>
        {status === "sent" && (
          <p className="text-sm text-emerald-500">Sent — thanks!</p>
        )}
        {status === "error" && (
          <p className="text-sm text-rose-500">
            Something went wrong. Try email.
          </p>
        )}
      </div>
    </form>
  );
}
