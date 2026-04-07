import { Suspense } from "react";
import { getAllPosts } from "@/lib/posts";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogContent from "./BlogContent";

export const metadata = {
  title: "Blog",
};

export default function BlogPage() {
  const allPosts = getAllPosts();

  return (
    <>
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 lg:ml-72">
          <div className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-white mb-8">Blog</h1>
            <Suspense fallback={null}>
              <BlogContent posts={allPosts} />
            </Suspense>
          </div>
          <Footer />
        </main>
      </div>
    </>
  );
}
