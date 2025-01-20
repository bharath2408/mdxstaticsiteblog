"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Clock, User } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroCard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animations timeline
      const tl = gsap.timeline();

      // Base overlay animation
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 0.3, duration: 1.5, ease: "power2.inOut" }
      );

      // Image animation
      tl.fromTo(
        imageWrapperRef.current,
        { scale: 1.2, opacity: 0, filter: "grayscale(0)" },
        { scale: 1, opacity: 1, duration: 2, ease: "power2.out" },
        "-=1.5"
      );

      // Card animation
      tl.fromTo(
        cardRef.current,
        {
          x: "-100%",
          opacity: 0,
          rotateY: -30,
          transformPerspective: 1000,
        },
        {
          x: "0%",
          opacity: 1,
          rotateY: 0,
          duration: 1.5,
          ease: "power3.out",
        },
        "-=1"
      );

      // Text animations
      tl.fromTo(
        textContentRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=1"
      );

      // Scroll indicator
      tl.fromTo(
        scrollIndicatorRef.current,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(scrollIndicatorRef.current, {
              y: 10,
              repeat: -1,
              yoyo: true,
              duration: 1.2,
              ease: "power1.inOut",
            });
          },
        }
      );

      // Scroll animations
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: false,
        onUpdate: (self) => {
          const progress = self.progress;

          // Grayscale effect on scroll
          gsap.to(imageWrapperRef.current, {
            filter: `grayscale(${progress * 100}%)`,
            duration: 0,
          });

          // Darken overlay
          gsap.to(overlayRef.current, {
            opacity: 0.3 + progress * 0.5,
            duration: 0,
          });

          // Parallax and fade for content
          gsap.to(imageWrapperRef.current, {
            y: progress * 100,
            duration: 0,
          });

          gsap.to([cardRef.current, scrollIndicatorRef.current], {
            opacity: 1 - progress * 2,
            duration: 0,
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={containerRef}
      className="h-[250px] md:h-[600px] rounded-md relative overflow-hidden"
    >
      {/* Image Wrapper for filter effects */}
      <div
        ref={imageWrapperRef}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src="/mdxstaticsiteblog/images/hero.png"
          alt="hero image"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Base Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black transition-opacity"
      />

      {/* Main Content Card */}

      <div
        ref={cardRef}
        className="absolute left-1/2 top-1/2 md:left-1/2 md:top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[100%] md:max-w-[600px] bg-white/90 dark:bg-[#242535]/90 backdrop-blur-sm 
                    p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl border border-white/20"
      >
        <div ref={textContentRef}>
          {/* Tags and read time */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6 text-xs sm:text-sm">
            <span className="inline-block px-3 py-1 bg-blue-600 text-white rounded-full font-medium tracking-wide w-fit">
              Technology
            </span>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Clock size={14} className="mr-2" />
              <span>5 min read</span>
            </div>
          </div>

          {/* Title */}
          <h1
            className="text-xl sm:text-2xl md:text-4xl font-bold mb-4 sm:mb-6 
                       bg-gradient-to-r from-blue-600 to-purple-600 
                       text-transparent bg-clip-text leading-tight"
          >
            The Impact of Technology on the Workplace: How Technology is
            Changing
          </h1>

          {/* Author and stats section */}
          <div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between 
                        border-t border-gray-200 dark:border-gray-700 pt-4 gap-4"
          >
            {/* Author info */}
            <div className="flex items-center space-x-3">
              <div
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 
                           dark:bg-gray-700 relative overflow-hidden"
              >
                <Image
                  src="/mdxstaticsiteblog/images/hero.png" // Provide the path to the image
                  alt="Hero Image" // Add a meaningful description for accessibility
                  width={1920} // Specify a width for the image
                  height={1080} // Specify a height for the image
                  className="object-cover w-full h-full" // Add custom styles
                  priority // Optional: Preload this image for performance
                />
              </div>
              <div>
                <p className="font-medium text-sm sm:text-base">
                  Jason Francisco
                </p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  August 20, 2022
                </p>
              </div>
            </div>

            {/* View count */}
            <div
              className="flex items-center space-x-2 text-blue-600 
                         dark:text-blue-400 text-sm sm:text-base"
            >
              <User size={16} className="flex-shrink-0" />
              <span>1.2k views</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        onClick={handleScrollClick}
        className="hidden absolute bottom-8 left-1/2 transform -translate-x-1/2 
                 cursor-pointer md:flex flex-col items-center text-white 
                 hover:scale-110 transition-transform"
      >
        <span
          className="text-sm font-medium tracking-wider mb-2 
                      uppercase"
        >
          Scroll Down
        </span>
        <ChevronDown size={24} className="animate-bounce" />
      </div>
    </div>
  );
};

export default HeroCard;
