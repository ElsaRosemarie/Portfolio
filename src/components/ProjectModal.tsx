"use client";

import { useCallback, useEffect, useState } from "react";
import type { Project } from "@/types/gallery";

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
  const currentIndex = projects.findIndex((p) => p.id === project.id);

  useEffect(() => {
    setImageIndex(0);
  }, [project.id]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) onNavigate(projects[currentIndex - 1]);
  }, [currentIndex, onNavigate, projects]);

  const goNext = useCallback(() => {
    if (currentIndex < projects.length - 1) onNavigate(projects[currentIndex + 1]);
  }, [currentIndex, onNavigate, projects]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, goPrev, goNext]);

  const images = project.images;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-white/95 px-4 py-6 md:px-8 md:py-10"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <button
        type="button"
        onClick={onClose}
        className="fixed right-4 top-4 z-10 text-2xl leading-none text-neutral-800 transition-opacity hover:opacity-50 sm:right-8 sm:top-8"
        aria-label="Close"
      >
        ×
      </button>

      <div className="mx-auto w-full max-w-5xl px-4 pt-8 sm:px-6">
        <div className="relative mb-8 flex min-h-[40vh] items-center justify-center px-8 sm:px-12 md:min-h-[55vh] md:px-14">
          {currentIndex > 0 && (
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 text-4xl leading-none text-neutral-800 transition-opacity hover:opacity-50 sm:text-5xl"
              aria-label="Previous project"
            >
              ‹
            </button>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[imageIndex].src}
            alt={images[imageIndex].alt}
            className="max-h-[70vh] w-auto max-w-full object-contain"
          />

          {currentIndex < projects.length - 1 && (
            <button
              type="button"
              onClick={goNext}
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 text-4xl leading-none text-neutral-800 transition-opacity hover:opacity-50 sm:text-5xl"
              aria-label="Next project"
            >
              ›
            </button>
          )}
        </div>

        <div className="mx-auto max-w-2xl space-y-4 px-2 pb-8 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium md:text-3xl">
            {project.title}
          </h2>
          <p className="text-sm leading-relaxed text-neutral-600 md:text-base">
            {project.description}
          </p>
        </div>

        {images.length > 1 && (
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 px-2 pb-12 sm:grid-cols-3 md:gap-5">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setImageIndex(i)}
                className="flex items-center justify-center bg-transparent p-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className={`block max-h-40 w-auto max-w-full object-contain transition-opacity sm:max-h-44 ${
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
