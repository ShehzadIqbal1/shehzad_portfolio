'use client';

import { useState } from 'react';
import { PROJECTS, PROJECT_CATEGORIES, ProjectCategory } from '@/data/projects';
import ProjectCard from './ProjectCard';
import { FilterIcon } from './icons/FilterIcons';

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('full-stack');

  const filteredProjects = PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="projects-section" className="relative w-full px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16 overflow-hidden">
      {/* Section background – distinct from banner */}
      <div className="absolute inset-0 bg-[var(--section-bg)]" aria-hidden />
      <div className="absolute inset-0 border-t-2 border-b-2 border-[var(--border)] pointer-events-none" aria-hidden />

      <div className="relative mx-auto max-w-6xl w-full">
        {/* Section header */}
        <header className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--foreground)]">
            Projects
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[var(--muted)] max-w-md mx-auto px-2">
            Filter by category below
          </p>
        </header>

        {/* Filter bar – card style, 2x2 grid on mobile */}
        <div className="mb-8 sm:mb-10">
          <div className="rounded-2xl bg-[var(--surface)] border-2 border-[var(--border)] shadow-[var(--card-shadow)] p-2 sm:p-3">
            <div className="flex overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap sm:justify-center gap-3 sm:gap-3 snap-x scrollbar-hide">
              {PROJECT_CATEGORIES.map((cat) => {
                const isActive = activeFilter === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setActiveFilter(cat.value)}
                    type="button"
                    className={`
                      flex-shrink-0 snap-start flex items-center justify-center gap-2 rounded-xl px-4 py-3 sm:px-5 sm:py-3.5 whitespace-nowrap
                      text-sm font-medium transition-all duration-200 border-2 min-h-[48px]
                      touch-manipulation
                      ${isActive
                        ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-md'
                        : 'bg-[var(--surface-elevated)] sm:bg-[var(--surface-elevated)] text-[var(--muted)] border-[var(--border)] hover:text-[var(--foreground)] hover:border-[var(--accent)]/50 active:scale-[0.98]'
                      }
                    `}
                  >
                    <span className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-[var(--accent)]'}`}>
                      <FilterIcon category={cat.value} size={20} />
                    </span>
                    <span className="hidden md:inline truncate">{cat.label}</span>
                    <span className="md:hidden truncate text-xs sm:text-sm">{cat.label.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 sm:py-14 rounded-2xl bg-[var(--surface)] border-2 border-[var(--border)]">
            <p className="text-[var(--muted)]">No projects in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
