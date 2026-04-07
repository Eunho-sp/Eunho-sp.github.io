"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/constants";

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("category");

  function handleClick(category: string | null) {
    if (category) {
      router.push(`/blog?category=${encodeURIComponent(category)}`);
    } else {
      router.push("/blog");
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleClick(null)}
        className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
          !current
            ? "border-primary bg-primary/10 text-primary"
            : "border-border text-muted hover:text-foreground hover:border-foreground/30"
        }`}
      >
        All
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.label}
          onClick={() => handleClick(cat.label)}
          className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
            current === cat.label
              ? "text-white"
              : "border-border text-muted hover:text-foreground hover:border-foreground/30"
          }`}
          style={
            current === cat.label
              ? {
                  borderColor: cat.color,
                  backgroundColor: `${cat.color}20`,
                  color: cat.color,
                }
              : undefined
          }
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
