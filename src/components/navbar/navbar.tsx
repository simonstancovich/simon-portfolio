"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function NavLink({
  href,
  children,
  className = "",
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={[
        "group relative block md:inline-flex rounded-md transition hover:opacity-90",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/60 dark:focus-visible:ring-white/30",
        "px-3 py-3 md:px-2 md:py-1 text-sm",
        isActive ? "text-foreground" : "text-slate-600 dark:text-slate-300",
        className,
      ].join(" ")}
    >
      <span
        className={[
          "relative inline-block w-fit",
          "after:pointer-events-none after:absolute after:left-0 after:-bottom-1 md:after:bottom-0",
          "after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current",
          "after:transition-transform after:duration-200 motion-reduce:after:transition-none",
          isActive ? "after:scale-x-100" : "group-hover:after:scale-x-100",
        ].join(" ")}
      >
        {children}
      </span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Primary"
      className={[
        "sticky top-0 z-50 backdrop-blur transition-shadow",
        "bg-white/60 dark:bg-black/30",
        scrolled
          ? "border-b border-slate-200/60 dark:border-white/10 shadow-[0_1px_0_0_rgba(0,0,0,0.03)]"
          : "",
      ].join(" ")}
    >
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60]
                   focus:rounded-md focus:bg-black/80 focus:text-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-semibold tracking-tight"
        >
          {isHome ? (
            <>
              <span className="sr-only">Simon Stancovich</span>
              <span
                aria-hidden
                className="inline-grid place-items-center size-8 rounded-full border border-slate-300/60 dark:border-white/15 bg-white/70 dark:bg-white/5 text-xs"
              >
                SS
              </span>
            </>
          ) : (
            "Simon Stancovich"
          )}
        </Link>

        <div className="hidden md:flex items-center gap-4">
          {/* {!isHome && <NavLink href="/">Home</NavLink>}  // enable if you want Home visible on inner pages */}
          <NavLink href="/projects">Projects</NavLink>
          <NavLink href="/about">About</NavLink>
        </div>

        <button
          className="relative md:hidden inline-flex items-center justify-center size-9 rounded-md border border-slate-200/60 dark:border-white/10 text-current transition
                     active:scale-[.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/60 dark:focus-visible:ring-white/30"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-pressed={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span
            className={[
              "absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 bg-current",
              "transition-transform duration-200 ease-out motion-reduce:transition-none",
              open ? "translate-y-0 rotate-45" : "-translate-y-2 rotate-0",
            ].join(" ")}
          />
          <span
            className={[
              "absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 bg-current",
              "transition-[transform,opacity] duration-200 ease-out motion-reduce:transition-none",
              open ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100",
            ].join(" ")}
          />
          <span
            className={[
              "absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 bg-current",
              "transition-transform duration-200 ease-out motion-reduce:transition-none",
              open ? "translate-y-0 -rotate-45" : "translate-y-2 rotate-0",
            ].join(" ")}
          />
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="md:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur animate-in-fade motion-reduce:animate-none"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            className="mx-4 mt-20 rounded-md border border-slate-200/60 dark:border-white/10 bg-white/80 dark:bg-black/95 p-2 animate-in-scale motion-reduce:animate-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col">
              <NavLink
                href="/"
                onClick={() => setOpen(false)}
                className="text-base hover:bg-slate-100/60 dark:hover:bg-white/5 rounded-md"
              >
                Home
              </NavLink>
              <NavLink
                href="/projects"
                onClick={() => setOpen(false)}
                className="text-base hover:bg-slate-100/60 dark:hover:bg-white/5 rounded-md"
              >
                Projects
              </NavLink>
              <NavLink
                href="/about"
                onClick={() => setOpen(false)}
                className="text-base hover:bg-slate-100/60 dark:hover:bg-white/5 rounded-md"
              >
                About
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
