import Link from "next/link";
import { SITE, CATEGORIES } from "@/lib/constants";

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 bg-surface border-r border-border p-6 overflow-y-auto">
      {/* Profile */}
      <div className="mb-8">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold mb-4">
          EP
        </div>
        <h1 className="text-lg font-bold text-white">{SITE.author}</h1>
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

      {/* Footer in sidebar */}
      <div className="mt-auto pt-6 border-t border-border">
        <p className="text-xs text-muted">
          &copy; {new Date().getFullYear()} {SITE.author}
        </p>
      </div>
    </aside>
  );
}
