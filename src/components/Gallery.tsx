"use client";

import { useMemo, useState } from "react";
import type { GallerySection, Project } from "@/types/gallery";
import ProjectModal from "./ProjectModal";

interface GalleryProps {
  section: GallerySection;
  showFilters?: boolean;
}

export default function Gallery({ section, showFilters = true }: GalleryProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    if (!showFilters || activeFilter === "All") return section.projects;
    return section.projects.filter((p) => p.category === activeFilter);
  }, [activeFilter, section.projects, showFilters]);

  return (
    <>
      <div className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6 md:px-10">
        {showFilters && (
          <div className="-mx-4 mb-8 overflow-x-auto px-4 scrollbar-hide sm:-mx-6 sm:px-6 md:mx-0 md:overflow-visible md:px-0">
            <div className="flex w-max gap-x-5 gap-y-2 pb-1 text-xs uppercase tracking-[0.15em] md:w-auto md:flex-wrap">
              {section.filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`shrink-0 whitespace-nowrap transition-colors ${
                    activeFilter === filter
                      ? "font-medium text-brand"
                      : "text-neutral-500 hover:text-brand-dark"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="columns-1 gap-5 md:columns-3 md:gap-6">
          {filtered.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setSelected(project)}
              className="group relative mb-5 block w-full break-inside-avoid overflow-hidden sm:mb-6"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.cover}
                alt={project.title}
                className="w-full object-cover transition-all duration-300 group-hover:scale-[1.02] group-hover:opacity-75"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-brand/0 transition-colors duration-300 group-hover:bg-brand/10" />
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <ProjectModal
          project={selected}
          projects={filtered}
          onClose={() => setSelected(null)}
          onNavigate={setSelected}
        />
      )}
    </>
  );
}
