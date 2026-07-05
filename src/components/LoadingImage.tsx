"use client";

import { useState } from "react";

interface LoadingImageProps {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
  onClick?: () => void;
}

export default function LoadingImage({
  src,
  alt,
  className = "",
  eager = false,
  onClick,
}: LoadingImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span className="relative block w-full overflow-hidden bg-brand-light/20">
      {!loaded && (
        <span
          className="absolute inset-0 min-h-[8rem] animate-pulse bg-neutral-100"
          aria-hidden
        />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onClick={onClick}
        onLoad={() => setLoaded(true)}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={`block h-auto w-full ${className} transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </span>
  );
}
