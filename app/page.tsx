import BlogGrid from "@/components/BlogGrid";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroCard from "@/components/HeroCard";
import { posts } from "@/posts";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="mb-20 px-5 md:px-0">
        <HeroCard />
      </div>
      <BlogGrid posts={posts} />

      <Footer />
    </div>
  );
}
