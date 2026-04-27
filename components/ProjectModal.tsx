'use client';

import { Project } from '@/data/projects';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl transition-all duration-300 animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] bg-[var(--surface)] border border-[var(--border)] shadow-2xl p-6 sm:p-8 transition-all duration-300 animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[var(--surface-elevated)] text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)] transition-all z-10"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6 pr-10">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-2">
            {project.category.replace('-', ' ')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--foreground)] tracking-tight leading-tight">
            {project.title}
          </h2>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Detailed Overview */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--muted)] mb-3 flex items-center gap-2">
              Overview
            </h3>
            <p className="text-[var(--foreground)]/90 leading-relaxed text-sm sm:text-base">
              {project.fullDescription || project.description}
            </p>
          </div>

          {/* Key Achievements */}
          {project.achievements && project.achievements.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--muted)] mb-3 flex items-center gap-2">
                Key Achievements
              </h3>
              <ul className="grid grid-cols-1 gap-2">
                {project.achievements.map((achievement, i) => (
                  <li key={i} className="flex gap-3 p-3 rounded-xl bg-[var(--surface-elevated)]/50 border border-[var(--border)] group">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white transition-all duration-300">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-[var(--foreground)] leading-snug">
                      {achievement}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--muted)] mb-3 flex items-center gap-2">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-wrap gap-3">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-h-[48px] flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] text-white font-bold hover:bg-[var(--accent-hover)] transition-all active:scale-[0.98]"
            >
              Live Demo
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          <button
            onClick={onClose}
            className="flex-1 min-h-[48px] rounded-xl border-2 border-[var(--border)] font-bold text-[var(--foreground)] hover:bg-[var(--surface-elevated)] transition-all active:scale-[0.98]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
