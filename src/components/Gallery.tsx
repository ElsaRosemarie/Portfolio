"use client";

import { useEffect, useMemo, useState } from "react";
import type { GallerySection, Project } from "@/types/gallery";
import { asset } from "@/lib/paths";
import LoadingImage from "./LoadingImage";
import ProjectModal from "./ProjectModal";

interface GalleryProps {
  section: GallerySection;
  showFilters?: boolean;
}

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

function getColumnCount(width: number) {
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
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
      className="group relative block w-full min-w-0 cursor-pointer overflow-hidden"
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
  const [columnCount, setColumnCount] = useState(1);

  useEffect(() => {
    const updateColumns = () => {
      setColumnCount(getColumnCount(window.innerWidth));
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  useEffect(() => {
    const openFromHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (!id) return;
      const project = section.projects.find((item) => item.id === id);
      if (project) setSelected(project);
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [section.projects]);

  const filtered = useMemo(() => {
    if (!showFilters || activeFilter === "All") return section.projects;
    return section.projects.filter((project) =>
      projectMatchesFilter(project, activeFilter)
    );
  }, [activeFilter, section.projects, showFilters]);

  const columns = useMemo(
    () => distributeToColumns(filtered, columnCount),
    [filtered, columnCount]
  );

  return (
    <>
      <div className="page-shell pb-8">
        {showFilters && (
          <div className="-mx-3 mb-8 overflow-x-auto px-3 scrollbar-hide sm:-mx-4 sm:overflow-visible sm:px-4 md:mx-0 md:px-0">
            <div className="flex w-max flex-nowrap gap-x-4 pb-1 text-xs uppercase tracking-[0.12em] sm:w-auto sm:flex-wrap sm:gap-x-5 sm:text-sm md:gap-x-6 md:text-base">
              {section.filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`shrink-0 cursor-pointer whitespace-nowrap transition-colors ${
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

        <div className="flex gap-4 sm:gap-5 lg:gap-6">
          {columns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className="flex min-w-0 flex-1 flex-col gap-4 sm:gap-5 lg:gap-6"
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
