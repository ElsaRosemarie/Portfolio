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
  const showText = Boolean(project.paragraphs?.length);

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
        className="fixed right-3 top-3 z-[60] flex h-11 w-11 cursor-pointer items-center justify-center text-3xl leading-none text-neutral-800 transition-opacity hover:opacity-50 sm:right-6 sm:top-6"
        aria-label="Close"
      >
        ×
      </button>

      <div className="mx-auto w-full max-w-4xl px-4 py-14 pt-16 sm:px-6 sm:py-16 lg:px-10 xl:px-16">
        <div className="mb-6 grid grid-cols-[2.25rem_1fr_2.25rem] items-center gap-1 sm:mb-8 sm:grid-cols-[3rem_1fr_3rem] sm:gap-2">
          <button
            type="button"
            onClick={goPrev}
            disabled={!hasPrev}
            aria-label="Previous project"
            aria-hidden={!hasPrev}
            tabIndex={hasPrev ? 0 : -1}
            className="flex h-10 w-full cursor-pointer items-center justify-center rounded-sm text-3xl leading-none text-neutral-800 transition-colors disabled:pointer-events-none disabled:opacity-0 sm:h-12 sm:text-4xl lg:text-5xl [&:not(:disabled):hover]:bg-brand/10 [&:not(:disabled):hover]:text-brand"
          >
            ‹
          </button>

          <div className="relative min-h-[220px] h-[min(45vh,24rem)] sm:min-h-[260px] sm:h-[min(50vh,28rem)] lg:min-h-[280px] lg:h-[min(55vh,32rem)]">
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
            className="flex h-10 w-full cursor-pointer items-center justify-center rounded-sm text-3xl leading-none text-neutral-800 transition-colors disabled:pointer-events-none disabled:opacity-0 sm:h-12 sm:text-4xl lg:text-5xl [&:not(:disabled):hover]:bg-brand/10 [&:not(:disabled):hover]:text-brand"
          >
            ›
          </button>
        </div>

        <div className="mx-auto max-w-2xl space-y-3 pb-6 text-center sm:space-y-4 sm:pb-8">
          <h2 className="text-xl font-medium sm:text-2xl lg:text-3xl">{project.title}</h2>
          {showText &&
            project.paragraphs?.map((paragraph, index) => (
              <p key={index} className="whitespace-pre-line text-left text-sm leading-relaxed text-neutral-600 sm:text-center sm:text-base">
                <RichText text={paragraph} />
              </p>
            ))}
        </div>

        {images.length > 1 && (
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 pb-10 sm:grid-cols-3 sm:gap-4 lg:gap-5 lg:pb-12">
            {images.map((img, i) => {
              const isSelected = i === imageIndex;

              return (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => setImageIndex(i)}
                  aria-label={`View image ${i + 1}: ${img.alt}`}
                  aria-current={isSelected ? "true" : undefined}
                  className="group relative min-h-[120px] w-full cursor-pointer overflow-hidden bg-transparent p-0 sm:min-h-[140px]"
                >
                  <LoadingImage
                    src={asset(img.src)}
                    alt={img.alt}
                    className={`max-h-40 w-auto max-w-full object-contain transition-all duration-300 sm:max-h-44 ${
                      isSelected
                        ? "opacity-100"
                        : "opacity-100 group-hover:scale-[1.02] group-hover:opacity-75"
                    }`}
                  />
                  <div
                    className={`pointer-events-none absolute inset-0 transition-colors duration-300 ${
                      isSelected
                        ? "bg-brand/15 ring-2 ring-inset ring-brand"
                        : "bg-brand/0 group-hover:bg-brand/10"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
