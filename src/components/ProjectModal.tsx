"use client";

import { useCallback, useEffect, useState } from "react";
import type { Project } from "@/types/gallery";
import { asset } from "@/lib/paths";
import LoadingImage from "./LoadingImage";
import RichText from "./RichText";

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
  const showText =
    project.section === "research" ||
    (!project.standalone && Boolean(project.paragraphs?.length));

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
        <div className="mb-8 grid grid-cols-[3rem_1fr_3rem] items-center sm:grid-cols-[3.5rem_1fr_3.5rem]">
          <button
            type="button"
            onClick={goPrev}
            disabled={!hasPrev}
            aria-label="Previous project"
            aria-hidden={!hasPrev}
            tabIndex={hasPrev ? 0 : -1}
            className="flex h-12 w-full items-center justify-center text-4xl leading-none text-neutral-800 transition-colors disabled:pointer-events-none disabled:opacity-0 sm:text-5xl [&:not(:disabled)]:hover:text-brand"
          >
            ‹
          </button>

          <div className="relative h-[min(55vh,32rem)] min-h-[280px]">
            <div className="flex h-full items-center justify-center">
              {!imageLoaded && (
                <div
                  className="absolute inset-0 animate-pulse rounded bg-neutral-100"
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
            </div>
          </div>

          <button
            type="button"
            onClick={goNext}
            disabled={!hasNext}
            aria-label="Next project"
            aria-hidden={!hasNext}
            tabIndex={hasNext ? 0 : -1}
            className="flex h-12 w-full items-center justify-center text-4xl leading-none text-neutral-800 transition-colors disabled:pointer-events-none disabled:opacity-0 sm:text-5xl [&:not(:disabled)]:hover:text-brand"
          >
            ›
          </button>
        </div>

        <div className="mx-auto max-w-2xl space-y-4 pb-8 text-center">
          <h2 className="text-2xl font-medium md:text-3xl">{project.title}</h2>
          {showText &&
            project.paragraphs?.map((paragraph, index) => (
              <p key={index} className="leading-relaxed text-neutral-600">
                <RichText text={paragraph} />
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
