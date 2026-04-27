import { contactInfo } from '@/data/contact';
import { profileData } from '@/data/profile';
import Image from 'next/image';

export default function Banner() {
  const [firstName, ...restName] = profileData.name.split(' ');
  const lastName = restName.join(' ');

  return (
    <section id="home" className="relative flex items-center justify-center overflow-hidden px-4 pt-32 pb-16 sm:pt-40 sm:pb-20 lg:px-8 lg:pt-56 lg:pb-32 min-h-[80vh] mb-8">
      {/* Layered background */}
      <div className="absolute inset-0 bg-[var(--hero-pattern)]" aria-hidden />
      <div className="absolute inset-0 bg-[var(--hero-glow)]" aria-hidden />
      <div className="absolute inset-0 bg-[var(--background)]/50 dark:bg-[var(--background)]/60" aria-hidden />

      <div className="absolute top-1/4 -left-20 w-48 h-48 sm:w-72 sm:h-72 rounded-full bg-[var(--accent)]/10 blur-3xl dark:bg-[var(--accent)]/20" aria-hidden />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-500/15" aria-hidden />

      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px),
            linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl w-full text-center">

        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-[var(--accent)] mb-3 sm:mb-4">
          {profileData.role}
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-[var(--foreground)] mb-4 sm:mb-6 leading-[1.05]">
          {firstName} <span className="gradient-text bg-gradient-to-r from-[var(--accent)] to-indigo-500">{lastName}</span>
        </h1>
        <p className="text-sm sm:text-base lg:text-xl text-[var(--muted)] max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-14 px-4 leading-relaxed">
          {profileData.description}
        </p>

        {/* CTAs – stacked full-width on mobile, row on tablet+ */}
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-4 w-full max-w-md sm:max-w-none mx-auto">
          {Object.entries(contactInfo).map(([key, info]) => {
            const isWhatsApp = key === 'whatsapp';
            const isEmail = key === 'email';
            const isResume = key === 'resume';

            let className = "inline-flex items-center justify-center min-h-[52px] w-full sm:w-auto rounded-2xl px-8 py-4 text-sm sm:text-base font-bold transition-all duration-300 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--background)] touch-manipulation";

            if (isWhatsApp) {
              className += " bg-[#25D366] text-white shadow-lg shadow-[#25D366]/25 hover:shadow-xl hover:shadow-[#25D366]/40 focus:ring-[#25D366]";
            } else if (isEmail) {
              className += " glass text-[var(--foreground)] border-2 border-[var(--border)] shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] hover:border-[var(--accent)]/50 focus:ring-[var(--accent)]";
            } else if (isResume) {
              className += " bg-gradient-to-r from-[var(--accent)] to-indigo-600 text-white shadow-lg shadow-[var(--accent)]/30 hover:shadow-xl hover:shadow-[var(--accent)]/50 focus:ring-[var(--accent)]";
            }

            return (
              <a
                key={key}
                href={info.href}
                target={isEmail ? "_self" : "_blank"}
                rel={isEmail ? undefined : "noopener noreferrer"}
                download={isResume}
                className={className}
              >
                <svg
                  className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 mr-2.5 ${isEmail ? 'text-[var(--accent)]' : ''}`}
                  fill={isWhatsApp ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke={isWhatsApp ? "none" : "currentColor"}
                  strokeWidth={isWhatsApp ? 0 : 2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={info.iconPath} />
                </svg>
                <span>
                  {key === 'whatsapp' ? 'WhatsApp' : key === 'email' ? 'Contact via Email' : 'Download Resume'}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
