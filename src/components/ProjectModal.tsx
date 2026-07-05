"use client";

import { useCallback, useEffect, useState } from "react";
import type { Project } from "@/types/gallery";
import { asset } from "@/lib/paths";

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
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < projects.length - 1;

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
        className="fixed right-4 top-4 z-[60] text-2xl leading-none text-neutral-800 transition-opacity hover:opacity-50 sm:right-8 sm:top-8"
        aria-label="Close"
      >
        ×
      </button>

      <button
        type="button"
        onClick={goPrev}
        disabled={!hasPrev}
        className={`fixed left-3 top-1/2 z-[60] w-10 -translate-y-1/2 text-4xl leading-none text-neutral-800 transition-opacity sm:left-6 sm:text-5xl md:left-10 ${
          hasPrev ? "hover:opacity-50" : "pointer-events-none opacity-0"
        }`}
        aria-label="Previous project"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={goNext}
        disabled={!hasNext}
        className={`fixed right-3 top-1/2 z-[60] w-10 -translate-y-1/2 text-4xl leading-none text-neutral-800 transition-opacity sm:right-6 sm:text-5xl md:right-10 ${
          hasNext ? "hover:opacity-50" : "pointer-events-none opacity-0"
        }`}
        aria-label="Next project"
      >
        ›
      </button>

      <div className="mx-auto w-full max-w-4xl px-14 py-16 sm:px-20 md:px-24">
        <div className="mb-8 flex h-[50vh] min-h-[280px] items-center justify-center sm:h-[55vh] md:min-h-[360px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(images[imageIndex].src)}
            alt={images[imageIndex].alt}
            className="max-h-full w-auto max-w-full object-contain"
          />
        </div>

        <div className="mx-auto max-w-2xl space-y-4 pb-8 text-center">
          <h2 className="text-2xl font-medium md:text-3xl">{project.title}</h2>
          <p className="text-sm leading-relaxed text-neutral-600 md:text-base">
            {project.description}
          </p>
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(img.src)}
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
