"use client";

import { IPost, posts } from "@/posts";
import gsap from "gsap";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Thumbnail() {
  const pathname = usePathname().split("/")[2];
  const post = posts.find((p: IPost) => p.slug === pathname);

  // Create a ref for the image element
  const imageRef = useRef(null);

  // Apply GSAP animation when the component mounts
  useEffect(() => {
    // Animation: Scale and fade in the image
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "ease.out" }
    );
  }, []);

  return (
    <div className="h-[250px] md:h-[500px] mb-10 overflow-hidden rounded-lg relative">
      <Image
        ref={imageRef}
        src={post?.thumbnail || "/images/hero.png"}
        alt="Thumbnail image"
        fill
        sizes="100vh"
        priority
      />
    </div>
  );
}
