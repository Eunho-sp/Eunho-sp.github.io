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
        <main className="flex-1 flex flex-col lg:ml-72 relative overflow-hidden">
          {/* Hero - 배경 이미지 포함 */}
          <section className="relative overflow-hidden">
            <img src="/homebackground.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="relative z-10 w-full max-w-3xl mx-auto px-4 py-12">
                <p className="text-primary font-mono text-sm mb-2">
                  ~$:<span className="inline-block w-2 h-4 bg-primary ml-1 align-middle animate-blink" />
                </p>
                <h1 className="text-4xl font-bold text-primary mb-4">
                  {SITE.author}
                </h1>
                <p className="text-lg text-primary/70 leading-relaxed max-w-xl">
                  CS &amp; AI 학부
                  <br />
                  보안 개발 알고리즘 공부 중
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
                    className="px-4 py-2 border border-primary/30 text-sm font-medium rounded-lg text-primary hover:border-primary/50 transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.instagram.com/ptkcov?igsh=MWZqaWo1Mmc0anUzeg%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-primary/30 rounded-lg text-primary hover:border-primary/50 transition-colors flex items-center"
                    aria-label="Instagram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  </a>
                  <a
                    href="mailto:silverpumkin1002@gmail.com"
                    className="px-4 py-2 border border-primary/30 rounded-lg text-primary hover:border-primary/50 transition-colors flex items-center"
                    aria-label="Email"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </a>
                </div>
            </div>
          </section>

          {/* Latest Posts */}
          <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-12">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">Latest Posts</h2>
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
