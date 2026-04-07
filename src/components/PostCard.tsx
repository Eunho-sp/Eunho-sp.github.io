import Link from "next/link";
import { PostMeta } from "@/lib/types";
import { getCategoryColor } from "@/lib/constants";

export default function PostCard({ post }: { post: PostMeta }) {
  const catColor = getCategoryColor(post.category);

  return (
    <article className="group border border-border rounded-lg p-5 hover:border-primary/50 transition-colors bg-surface">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="flex items-center gap-3 mb-2">
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: `${catColor}20`,
              color: catColor,
            }}
          >
            {post.category}
          </span>
          <time className="text-xs text-muted">{post.date}</time>
        </div>
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
          {post.title}
        </h3>
        <p className="text-sm text-muted line-clamp-2">{post.description}</p>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-muted bg-background px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </article>
  );
}
