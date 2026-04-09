import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { getCategoryColor, SITE } from "@/lib/constants";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug.split("/") }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  return params.then(({ slug }) => {
    const slugPath = slug.join("/");
    const { meta } = getPostBySlug(slugPath);
    return {
      title: meta.title,
      description: meta.description,
      openGraph: {
        title: meta.title,
        description: meta.description,
        url: `${SITE.url}/blog/${slugPath}`,
        type: "article",
      },
    };
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugPath = slug.join("/");
  const { meta, content } = getPostBySlug(slugPath);
  const catColor = getCategoryColor(meta.category);

  const { content: mdxContent } = await compileMDX({
    source: content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight, rehypeSlug],
      },
    },
  });

  return (
    <>
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 flex flex-col lg:ml-72">
          <article className="flex-1 max-w-3xl mx-auto px-4 py-12 w-full">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-blue-500 hover:text-blue-700 transition-colors mb-8"
            >
              &larr; Back to blog
            </Link>

            {/* Post header */}
            <header className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${catColor}20`,
                    color: catColor,
                  }}
                >
                  {meta.category}
                </span>
                <time className="text-sm text-muted">{meta.date}</time>
              </div>
              <h1 className="text-3xl font-bold text-foreground">{meta.title}</h1>
              {meta.description && (
                <p className="text-muted mt-3">{meta.description}</p>
              )}
              {meta.tags && meta.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {meta.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-muted bg-surface px-2 py-0.5 rounded border border-border"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Post content */}
            <div className="prose dark:prose-invert max-w-none">{mdxContent}</div>
          </article>
          <Footer />
        </main>
      </div>
    </>
  );
}
