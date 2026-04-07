import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { SITE } from "@/lib/constants";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostList from "@/components/PostList";

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 5);

  return (
    <>
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 lg:ml-72">
          <div className="max-w-3xl mx-auto px-4 py-12">
            {/* Hero */}
            <section className="mb-16">
              <p className="text-primary font-mono text-sm mb-2">
                Hello, I&apos;m
              </p>
              <h1 className="text-4xl font-bold text-white mb-4">
                {SITE.author}
              </h1>
              <p className="text-lg text-muted leading-relaxed max-w-xl">
                {SITE.bio}. 보안, 알고리즘, 그리고 다양한 개발 경험을 기록하는
                블로그입니다.
              </p>
              <div className="flex gap-3 mt-6">
                <Link
                  href="/blog"
                  className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Blog
                </Link>
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-border text-sm font-medium rounded-lg text-muted hover:text-foreground hover:border-foreground/30 transition-colors"
                >
                  GitHub
                </a>
              </div>
            </section>

            {/* Latest Posts */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Latest Posts</h2>
                <Link
                  href="/blog"
                  className="text-sm text-primary hover:underline"
                >
                  View all &rarr;
                </Link>
              </div>
              <PostList posts={latestPosts} />
            </section>
          </div>
          <Footer />
        </main>
      </div>
    </>
  );
}
