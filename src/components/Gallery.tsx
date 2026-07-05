"use client";

import { useMemo, useState } from "react";
import type { GallerySection, Project } from "@/types/gallery";
import ProjectModal from "./ProjectModal";

interface GalleryProps {
  section: GallerySection;
}

export default function Gallery({ section }: GalleryProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    if (activeFilter === "All") return section.projects;
    return section.projects.filter((p) => p.category === activeFilter);
  }, [activeFilter, section.projects]);

  return (
    <>
      <div className="mx-auto w-full max-w-6xl px-6 pb-6 md:px-10">
        <div className="mb-10 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.15em] text-neutral-500">
          {section.filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`transition-colors ${
                activeFilter === filter
                  ? "text-neutral-900"
                  : "hover:text-neutral-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {filtered.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setSelected(project)}
              className="group mb-4 block w-full break-inside-avoid overflow-hidden text-left"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.cover}
                alt={project.title}
                className="w-full object-cover transition-opacity duration-300 group-hover:opacity-80"
                loading="lazy"
              />
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
