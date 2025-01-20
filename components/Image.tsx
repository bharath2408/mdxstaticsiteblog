"use client";
import Image from "next/image";
import React from "react";

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

const MDXImage: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
}) => {
  // For placeholder images during development/testing
  if (src.startsWith("/api/placeholder")) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`max-w-full h-auto ${className}`}
      />
    );
  }

  // For regular images using Next/Image
  return (
    <Image
      src={src}
      alt={alt}
      width={width || 1000}
      height={height || 600}
      className={`max-w-full h-auto ${className}`}
      loading="lazy"
    />
  );
};

export default MDXImage;
