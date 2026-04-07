"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE, CATEGORIES } from "@/lib/constants";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="lg:hidden sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-4 h-14">
        <Link href="/" className="font-bold text-primary">
          {SITE.title}
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 text-muted hover:text-foreground"
          aria-label="Toggle menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="px-4 pb-4 border-t border-border bg-surface">
          <div className="py-3">
            <p className="text-sm font-bold text-white">{SITE.author}</p>
            <p className="text-xs text-muted">{SITE.bio}</p>
          </div>
          <ul className="space-y-1">
            <li>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-md text-sm hover:bg-primary/10 hover:text-primary transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-md text-sm hover:bg-primary/10 hover:text-primary transition-colors"
              >
                Blog
              </Link>
            </li>
            <li>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 rounded-md text-sm hover:bg-primary/10 hover:text-primary transition-colors"
              >
                GitHub
              </a>
            </li>
          </ul>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mt-4 mb-2">
            Categories
          </h3>
          <ul className="space-y-1">
            {CATEGORIES.map((cat) => (
              <li key={cat.label}>
                <Link
                  href={`/blog?category=${encodeURIComponent(cat.label)}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-muted hover:text-foreground transition-colors"
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
