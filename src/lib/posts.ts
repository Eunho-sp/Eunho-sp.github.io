import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PostMeta, Category } from "./types";
import { FOLDER_TO_CATEGORY } from "./constants";

const postsDirectory = path.join(process.cwd(), "posts");

function getAllMdFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllMdFiles(full));
    } else if (entry.name.endsWith(".md")) {
      results.push(full);
    }
  }
  return results;
}

function categoryFromFolder(slug: string): Category | undefined {
  const firstSegment = slug.split("/")[0];
  return FOLDER_TO_CATEGORY[firstSegment];
}

export function getAllPosts(): PostMeta[] {
  const files = getAllMdFiles(postsDirectory);

  const posts: PostMeta[] = files.map((filePath) => {
    const relative = path.relative(postsDirectory, filePath).replace(/\\/g, "/");
    const slug = relative.replace(/\.md$/, "");
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "1970-01-01",
      category: data.category ?? categoryFromFolder(slug) ?? "개발",
      description: data.description ?? "",
      tags: data.tags ?? [],
    };
  });

  return posts.sort(
    (a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime() ||
      b.slug.localeCompare(a.slug)
  );
}

export function getPostBySlug(slug: string): {
  meta: PostMeta;
  content: string;
} {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    meta: {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "1970-01-01",
      category: data.category ?? categoryFromFolder(slug) ?? "개발",
      description: data.description ?? "",
      tags: data.tags ?? [],
    },
    content,
  };
}

export function getPostsByCategory(category: Category): PostMeta[] {
  return getAllPosts().filter((post) => post.category === category);
}
