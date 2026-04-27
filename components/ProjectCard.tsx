'use client';

import { useState, useEffect } from 'react';
import { Project, ProjectCategory } from '@/data/projects';
import { FilterIcon } from './icons/FilterIcons';



import ProjectModal from './ProjectModal';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

function getDeviceAndBrowser(): { deviceName: string; browser: string } {
  if (typeof navigator === 'undefined') return { deviceName: 'unknown', browser: 'unknown' };
  const ua = navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const deviceName = isMobile ? 'Mobile' : 'Laptop/Desktop';
  let browser = 'unknown';
  if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('Edge')) browser = 'Edge';
  return { deviceName, browser };
}

const CARD_STYLES: Record<
  ProjectCategory,
  { gradient: string; accent: string; border: string; tagBg: string; label: string }
> = {
  wordpress: {
    gradient: 'from-blue-500 via-sky-500 to-cyan-400',
    accent: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-400/40',
    tagBg: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-300/30 dark:border-blue-500/30',
    label: 'WordPress',
  },
  'full-stack': {
    gradient: 'from-slate-800 via-indigo-700 to-blue-600',
    accent: 'text-indigo-600 dark:text-indigo-400',
    border: 'border-indigo-400/40',
    tagBg: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-300/30 dark:border-indigo-500/30',
    label: 'Full Stack',
  },
  plugins: {
    gradient: 'from-amber-500 via-orange-500 to-yellow-400',
    accent: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-400/40',
    tagBg: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-300/30 dark:border-amber-500/30',
    label: 'Plugin',
  },
  achievement: {
    gradient: 'from-emerald-500 via-teal-500 to-cyan-400',
    accent: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-400/40',
    tagBg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-300/30 dark:border-emerald-500/30',
    label: 'Achievement',
  },
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const style = CARD_STYLES[project.category];
  const [liked, setLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    const hasLiked = localStorage.getItem(`project_liked_${project.id}`);
    if (hasLiked) setLiked(true);
  }, [project.id]);

  const handleProjectLike = async () => {
    if (liked || likeLoading) return;

    // Optimistic UI
    setLiked(true);
    localStorage.setItem(`project_liked_${project.id}`, 'true');
    setLikeLoading(true);

    try {
      const { deviceName, browser } = getDeviceAndBrowser();
      await fetch('/api/likes/project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project.id,
          projectName: project.title,
          projectCategory: project.category,
          deviceName,
          browser,
        }),
      });
    } catch (error) {
      console.warn('Like failed to sync with server, but saved locally.', error);
    } finally {
      setLikeLoading(false);
    }
  };

  return (
    <>
      <article
        className={`group relative overflow-hidden rounded-xl sm:rounded-2xl bg-[var(--surface)] border-2 border-[var(--border)] shadow-[var(--card-shadow)] transition-all duration-300 hover:shadow-[var(--card-shadow-hover)] hover:border-[var(--accent)]/40 active:scale-[0.99] sm:hover:-translate-y-1`}
      >
        {/* Thumbnail strip */}
        <div className={`relative h-20 sm:h-24 bg-gradient-to-br ${style.gradient} flex flex-col items-center justify-center px-3 py-3 overflow-hidden`}>
          <div className="absolute inset-0 opacity-20" aria-hidden>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '16px 16px',
              }}
            />
          </div>
          <span className="relative rounded-lg bg-white/25 p-1.5 sm:p-2 backdrop-blur-sm border border-white/30">
            <FilterIcon category={project.category} size={20} className="text-white" />
          </span>
          <span className="relative mt-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/95">
            {style.label}
          </span>
        </div>

        <div className="p-4 sm:p-5">
          <h3 className="text-base sm:text-lg font-bold text-[var(--foreground)] mb-2 leading-tight group-hover:text-[var(--accent)] transition-colors">
            {project.title}
          </h3>

          <p className="text-[var(--muted)] text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-md px-2 py-0.5 sm:px-2.5 sm:py-1 text-xs font-medium ${style.tagBg}`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions: View project / View Details / Like */}
          <div className="flex items-center gap-2 mt-auto pt-2">
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-11 w-11 sm:w-auto sm:px-4 rounded-xl border-2 border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)] transition-all hover:bg-[var(--accent)] hover:text-white active:scale-[0.98] touch-manipulation sm:flex-1"
                title="View project"
              >
                <span className="hidden sm:inline mr-2">Visit</span>
                <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ) : (
              <div className="h-11 w-11 sm:w-auto sm:px-4 rounded-xl border-2 border-[var(--border)] bg-[var(--surface-elevated)] flex items-center justify-center text-[var(--muted)] sm:flex-1" title="Portfolio piece">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            )}

            {project.fullDescription && (
              <button
                onClick={() => setShowDetail(true)}
                className="inline-flex items-center justify-center h-11 w-11 sm:w-auto sm:px-4 rounded-xl border-2 border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--foreground)] transition-all hover:border-[var(--accent)]/50 hover:bg-[var(--surface)] active:scale-[0.98] touch-manipulation sm:flex-1"
                title="View details"
              >
                <span className="hidden sm:inline mr-2 text-sm font-semibold">Info</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            )}

            <button
              type="button"
              onClick={handleProjectLike}
              disabled={liked || likeLoading}
              className={`group/btn relative overflow-hidden inline-flex items-center justify-center h-11 w-11 sm:w-auto sm:px-4 rounded-xl border-2 transition-all duration-300 active:scale-95 touch-manipulation sm:flex-1 ${liked
                ? 'bg-gradient-to-r from-pink-500/10 to-rose-500/10 border-pink-500/50 text-pink-600 dark:text-pink-400 cursor-default'
                : 'bg-[var(--surface-elevated)] border-transparent text-[var(--foreground)] hover:shadow-[0_0_15px_rgba(236,72,153,0.15)]'
                }`}
              aria-label={liked ? 'Liked' : 'Like project'}
            >
              {/* Gradient border for unliked state */}
              {!liked && (
                <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 opacity-20 group-hover/btn:opacity-100 transition-opacity -z-10 bg-[length:200%_auto] animate-gradient-x" />
              )}

              {liked ? (
                <>
                  <svg className="h-4 w-4 text-pink-500 animate-bounce-short sm:mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span className="hidden sm:inline text-xs font-bold">Liked</span>
                </>
              ) : (
                <>
                  <svg
                    className={`h-4 w-4 text-pink-500 transition-transform duration-300 sm:mr-2 ${likeLoading ? 'animate-spin' : 'group-hover/btn:scale-125'}`}
                    fill={likeLoading ? "none" : "currentColor"}
                    viewBox="0 0 24 24"
                    stroke={likeLoading ? "currentColor" : "none"}
                    strokeWidth={likeLoading ? 2 : 0}
                  >
                    {likeLoading ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    ) : (
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    )}
                  </svg>
                  <span className="hidden sm:inline text-xs font-bold text-pink-500">Like</span>
                </>
              )}
            </button>
          </div>
        </div>
      </article>

      {showDetail && (
        <ProjectModal
          project={project}
          onClose={() => setShowDetail(false)}
        />
      )}
    </>
  );
}
