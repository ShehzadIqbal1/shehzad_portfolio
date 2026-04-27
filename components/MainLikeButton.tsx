'use client';

import { useState, useEffect } from 'react';

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

export default function MainLikeButton() {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasLiked = localStorage.getItem('portfolio_liked');
    if (hasLiked) setLiked(true);
  }, []);

  const handleLike = async () => {
    if (liked || loading) return;
    
    // Optimistic UI
    setLiked(true);
    localStorage.setItem('portfolio_liked', 'true');
    setLoading(true);

    try {
      const { deviceName, browser } = getDeviceAndBrowser();
      await fetch('/api/likes/main', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceName, browser, city: 'unknown', location: 'unknown' }),
      });
    } catch (error) {
      console.warn('Like failed to sync with server, but saved locally.', error);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return <div className="min-h-[40px] px-4" />; // Prevent hydration mismatch

  return (
    <button
      type="button"
      onClick={handleLike}
      disabled={loading || liked}
      className={`relative group overflow-hidden inline-flex items-center justify-center gap-2 min-h-[40px] px-5 rounded-full border-2 text-sm font-bold transition-all duration-300 active:scale-95 ${liked
        ? 'bg-gradient-to-r from-pink-500/10 to-rose-500/10 border-pink-500/50 text-pink-600 dark:text-pink-400 cursor-default'
        : 'bg-[var(--surface-elevated)] border-transparent text-[var(--foreground)] hover:border-pink-500/30 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]'
        }`}
      aria-label={liked ? 'Liked' : 'Like portfolio'}
    >
      {/* Animated gradient border for unliked state */}
      {!liked && (
        <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 opacity-20 group-hover:opacity-100 transition-opacity -z-10 bg-[length:200%_auto] animate-gradient-x" />
      )}

      {!liked && !loading && (
        <span className="absolute inset-0 rounded-full ring-2 ring-pink-500/20 animate-pulse group-hover:ring-4 group-hover:ring-pink-500/10 transition-all duration-500" />
      )}

      {liked ? (
        <>
          <svg className="h-5 w-5 text-pink-500 animate-bounce-short" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span>Thanks!</span>
        </>
      ) : (
        <>
          <svg
            className={`h-5 w-5 text-pink-500 transition-transform duration-300 ${loading ? 'animate-spin' : 'group-hover:scale-125 group-hover:drop-shadow-sm'}`}
            fill={loading ? "none" : "currentColor"}
            viewBox="0 0 24 24"
            stroke={loading ? "currentColor" : "none"}
            strokeWidth={loading ? 2 : 0}
          >
            {loading ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /> // Placeholder for spinner, actually using css spinner logic below
            ) : (
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            )}
            {loading && <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />}
            {loading && <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />}
          </svg>
          <span className="bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent group-hover:from-pink-600 group-hover:to-rose-700">
            {loading ? 'Saving...' : 'Like This'}
          </span>
        </>
      )}
    </button>
  );
}
