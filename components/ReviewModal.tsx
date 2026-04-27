'use client';

import { useState } from 'react';
import { Project } from '@/data/projects';

interface ReviewModalProps {
  project?: Project;
  onClose: () => void;
  onSubmitted: () => void;
}

export default function ReviewModal({ project, onClose, onSubmitted }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [reviewDetail, setReviewDetail] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (rating === 0) return; // Require rating

    setLoading(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project?.id || 'main-site',
          projectName: project?.title || 'Main Portfolio',
          projectCategory: project?.category || 'general',
          rating,
          reviewDetail: reviewDetail.trim(),
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setDone(true);
        onSubmitted();
        // Close after a slightly longer delay so they can see the success message
        setTimeout(onClose, 2500);
      }
    } catch {
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-all duration-300" onClick={onClose}>
      <div
        className="relative w-full max-w-lg rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-2xl p-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative background gradient */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-[var(--accent)]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[var(--muted)] hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)] transition-colors"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {done ? (
          <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6 text-green-500">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">Thank You!</h3>
            <p className="text-[var(--muted)] max-w-xs mx-auto">
              Your feedback helps me improve. I really appreciate your time!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">
                {project ? 'Rate this Project' : 'Your Feedback Matters'}
              </h3>
              <p className="text-[var(--muted)]">
                {project
                  ? `How would you rate your experience with ${project.title}?`
                  : 'Help me improve by sharing your honest feedback.'}
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 py-2">
              <label className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
                Tap to Rate
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="p-1 transition-transform hover:scale-110 focus:outline-none"
                  >
                    <svg
                      className={`w-10 h-10 transition-colors duration-200 ${(hoveredRating || rating) >= star
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-[var(--border)] fill-transparent'
                        }`}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </button>
                ))}
              </div>
              <div className="h-6 text-sm font-medium text-[var(--accent)]">
                {hoveredRating === 1 && 'Needs Improvement'}
                {hoveredRating === 2 && 'Fair'}
                {hoveredRating === 3 && 'Good'}
                {hoveredRating === 4 && 'Very Good'}
                {hoveredRating === 5 && 'Excellent!'}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--foreground)] ml-1">
                Review <span className="text-[var(--muted)] font-normal">(optional)</span>
              </label>
              <textarea
                value={reviewDetail}
                onChange={(e) => setReviewDetail(e.target.value)}
                rows={4}
                className="w-full rounded-2xl border-2 border-[var(--border)] bg-[var(--surface-elevated)] px-5 py-4 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/10 focus:outline-none transition-all resize-none"
                placeholder="What did you like? What can be improved?"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3.5 rounded-xl border-2 border-[var(--border)] font-semibold text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--foreground)] hover:bg-[var(--surface-elevated)] transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || rating === 0}
                className="flex-[2] px-6 py-3.5 rounded-xl bg-[var(--accent)] text-white font-bold hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[var(--accent)]/20 hover:shadow-xl hover:shadow-[var(--accent)]/30 hover:-translate-y-0.5 transition-all"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </span>
                ) : 'Submit Review'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
