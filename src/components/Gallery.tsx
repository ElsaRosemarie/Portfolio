"use client";

import { useMemo, useState } from "react";
import type { GallerySection, Project } from "@/types/gallery";
import { asset } from "@/lib/paths";
import LoadingImage from "./LoadingImage";
import ProjectModal from "./ProjectModal";

interface GalleryProps {
  section: GallerySection;
  showFilters?: boolean;
}

const MASONRY_COLUMNS = 3;

const FILTER_TO_CATEGORY: Record<string, string> = {
  Traditional: "trad",
  Digital: "dig",
  Commissioned: "com",
  Other: "other",
};

function projectMatchesFilter(project: Project, filter: string) {
  if (filter === "All") return true;
  const category = FILTER_TO_CATEGORY[filter];
  return category ? project.categories.includes(category) : false;
}

function distributeToColumns<T>(items: T[], columnCount: number): T[][] {
  const columns = Array.from({ length: columnCount }, () => [] as T[]);
  items.forEach((item, index) => {
    columns[index % columnCount].push(item);
  });
  return columns;
}

function GalleryTile({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: (project: Project) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(project)}
      className="group relative block w-full overflow-hidden"
    >
      <LoadingImage
        src={asset(project.cover)}
        alt={project.title}
        className="w-full object-cover transition-all duration-300 group-hover:scale-[1.02] group-hover:opacity-75"
      />
      <div className="pointer-events-none absolute inset-0 bg-brand/0 transition-colors duration-300 group-hover:bg-brand/10" />
    </button>
  );
}

export default function Gallery({ section, showFilters = true }: GalleryProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    if (!showFilters || activeFilter === "All") return section.projects;
    return section.projects.filter((project) =>
      projectMatchesFilter(project, activeFilter)
    );
  }, [activeFilter, section.projects, showFilters]);

  const desktopColumns = useMemo(
    () => distributeToColumns(filtered, MASONRY_COLUMNS),
    [filtered]
  );

  return (
    <>
      <div className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6 md:px-10">
        {showFilters && (
          <div className="-mx-4 mb-8 overflow-x-auto px-4 scrollbar-hide sm:-mx-6 sm:px-6 md:mx-0 md:overflow-visible md:px-0">
            <div className="flex w-max gap-x-6 gap-y-2 pb-1 text-sm uppercase tracking-[0.15em] md:w-auto md:flex-wrap md:text-base">
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

        <div className="flex flex-col gap-5 md:hidden">
          {filtered.map((project) => (
            <GalleryTile
              key={project.id}
              project={project}
              onSelect={setSelected}
            />
          ))}
        </div>

        <div className="hidden gap-5 md:flex md:gap-6">
          {desktopColumns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className="flex min-w-0 flex-1 flex-col gap-5 md:gap-6"
            >
              {column.map((project) => (
                <GalleryTile
                  key={project.id}
                  project={project}
                  onSelect={setSelected}
                />
              ))}
            </div>
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
