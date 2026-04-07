import Image from "next/image";
import Link from "next/link";
import { SITE, CATEGORIES } from "@/lib/constants";
import ThemeToggle from "./ThemeToggle";

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:flex-col lg:justify-between lg:w-72 lg:fixed lg:inset-y-0 bg-surface border-r border-border p-6 overflow-y-auto">
      <div>
      {/* Profile */}
      <div className="mb-8">
        <Image
          src="/profile.jpg"
          alt={SITE.author}
          width={80}
          height={80}
          className="w-20 h-20 rounded-full object-cover mb-4"
        />
        <h1 className="text-lg font-bold text-foreground">{SITE.author}</h1>
        <p className="text-sm text-muted mt-1">{SITE.bio}</p>
      </div>

      {/* Navigation */}
      <nav className="mb-8">
        <ul className="space-y-2">
          <li>
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="block px-3 py-2 rounded-md text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            >
              Blog
            </Link>
          </li>
          <li>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 rounded-md text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            >
              GitHub
            </a>
          </li>
        </ul>
      </nav>

      {/* Categories */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
          Categories
        </h2>
        <ul className="space-y-1">
          {CATEGORIES.map((cat) => (
            <li key={cat.label}>
              <Link
                href={`/blog?category=${encodeURIComponent(cat.label)}`}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-muted hover:text-foreground hover:bg-primary/5 transition-colors"
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
      </div>
      </div>

      {/* Theme Toggle */}
      <div className="pt-4 border-t border-border">
        <ThemeToggle />
      </div>
    </aside>
  );
}
