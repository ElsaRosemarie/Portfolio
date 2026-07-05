"use client";

import { useCallback, useEffect, useState } from "react";
import type { Project } from "@/types/gallery";
import { asset } from "@/lib/paths";
import LoadingImage from "./LoadingImage";

interface ProjectModalProps {
  project: Project;
  projects: Project[];
  onClose: () => void;
  onNavigate: (project: Project) => void;
}

export default function ProjectModal({
  project,
  projects,
  onClose,
  onNavigate,
}: ProjectModalProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < projects.length - 1;

  useEffect(() => {
    setImageIndex(0);
    setImageLoaded(false);
  }, [project.id]);

  useEffect(() => {
    setImageLoaded(false);
  }, [imageIndex, project.id]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) onNavigate(projects[currentIndex - 1]);
  }, [currentIndex, onNavigate, projects]);

  const goNext = useCallback(() => {
    if (currentIndex < projects.length - 1) onNavigate(projects[currentIndex + 1]);
  }, [currentIndex, onNavigate, projects]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) goPrev();
      if (e.key === "ArrowRight" && hasNext) goNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, goPrev, goNext, hasPrev, hasNext]);

  const images = project.images;
  const mainSrc = asset(images[imageIndex].src);

  useEffect(() => {
    const preload = new window.Image();
    preload.src = mainSrc;
  }, [mainSrc]);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-white/95"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <button
        type="button"
        onClick={onClose}
        className="fixed right-4 top-4 z-[60] text-3xl leading-none text-neutral-800 transition-opacity hover:opacity-50 sm:right-8 sm:top-8"
        aria-label="Close"
      >
        ×
      </button>

      <div className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-12 md:px-24">
        <div className="relative mb-8 flex h-[50vh] min-h-[280px] items-center justify-center px-10 sm:h-[55vh] sm:px-12 md:min-h-[360px] md:px-14">
          <button
            type="button"
            onClick={goPrev}
            disabled={!hasPrev}
            className={`absolute left-0 top-1/2 z-10 w-8 -translate-y-1/2 text-4xl leading-none text-neutral-800 transition-opacity sm:text-5xl ${
              hasPrev ? "hover:opacity-50" : "pointer-events-none opacity-0"
            }`}
            aria-label="Previous project"
          >
            ‹
          </button>

          {!imageLoaded && (
            <div
              className="absolute inset-x-10 inset-y-0 animate-pulse rounded bg-neutral-100 sm:inset-x-12 md:inset-x-14"
              aria-hidden
            />
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mainSrc}
            alt={images[imageIndex].alt}
            onLoad={() => setImageLoaded(true)}
            className={`max-h-full w-auto max-w-full object-contain transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />

          <button
            type="button"
            onClick={goNext}
            disabled={!hasNext}
            className={`absolute right-0 top-1/2 z-10 w-8 -translate-y-1/2 text-4xl leading-none text-neutral-800 transition-opacity sm:text-5xl ${
              hasNext ? "hover:opacity-50" : "pointer-events-none opacity-0"
            }`}
            aria-label="Next project"
          >
            ›
          </button>
        </div>

        <div className="mx-auto max-w-2xl space-y-4 pb-8 text-center">
          <h2 className="text-3xl font-medium md:text-4xl">{project.title}</h2>
          {project.credit && (
            <p className="text-base md:text-lg">
              <a
                href={project.credit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-brand-light"
              >
                {project.credit.label}
              </a>
            </p>
          )}
          {!project.standalone && project.paragraphs?.map((paragraph, index) => (
            <p key={index} className="leading-relaxed text-neutral-600">
              {paragraph}
            </p>
          ))}
        </div>

        {images.length > 1 && (
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 pb-12 sm:grid-cols-3 md:gap-5">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setImageIndex(i)}
                className="flex min-h-[120px] items-center justify-center bg-transparent p-0 sm:min-h-[140px]"
              >
                <LoadingImage
                  src={asset(img.src)}
                  alt={img.alt}
                  className={`max-h-40 w-auto max-w-full object-contain sm:max-h-44 ${
                    i === imageIndex
                      ? "outline outline-2 outline-offset-0 outline-brand"
                      : "opacity-60 hover:opacity-100"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
