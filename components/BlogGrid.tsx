"use client";
import { IPost } from "@/posts";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface BlogGridProps {
  posts: IPost[];
}

const BlogGrid: React.FC<BlogGridProps> = ({ posts }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Create GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(cardRefs.current, {
        opacity: 0,
        y: 50,
      });

      // Create timeline for staggered animation
      const tl = gsap.timeline();

      tl.to(cardRefs.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: {
          amount: 0.6,
          ease: "power3.out",
        },
      });

      // Add hover animations
      cardRefs.current.forEach((card) => {
        const image = card.querySelector(".card-image");
        const content = card.querySelector(".card-content");

        // Hover enter animation
        card.addEventListener("mouseenter", () => {
          gsap.to(image, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(content, {
            y: -5,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        // Hover exit animation
        card.addEventListener("mouseleave", () => {
          gsap.to(image, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(content, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }, containerRef); // Scope to container

    // Cleanup function
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto px-4"
    >
      {posts.map((post, idx) => (
        <div
          key={post.slug}
          ref={(el) => {
            if (el) cardRefs.current[idx] = el;
          }}
          className="overflow-hidden"
        >
          <Link
            href={`/blog/${post.slug}`}
            className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg"
            aria-label={`Read ${post.title}`}
          >
            <div className="aspect-video relative overflow-hidden rounded-md mb-4">
              <Image
                src={post.thumbnail}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover card-image"
                priority={idx < 3}
              />
            </div>

            <div className="card-content">
              <span className="inline-block text-sm bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-semibold px-3 py-1 rounded-md mb-4">
                {post.category}
              </span>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 line-clamp-2 mb-4">
                {post.title}
              </h2>

              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>{post.author}</span>
                <time dateTime={new Date(post.date).toISOString()}>
                  {post.date}
                </time>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogGrid;
