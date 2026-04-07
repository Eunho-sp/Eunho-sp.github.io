"use client";

import { useSearchParams } from "next/navigation";
import { PostMeta } from "@/lib/types";
import CategoryFilter from "@/components/CategoryFilter";
import PostList from "@/components/PostList";

export default function BlogContent({ posts }: { posts: PostMeta[] }) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const filtered = category
    ? posts.filter((p) => p.category === category)
    : posts;

  return (
    <>
      <div className="mb-8">
        <CategoryFilter />
      </div>
      <PostList posts={filtered} />
    </>
  );
}
