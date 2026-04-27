'use client';

import { useState } from 'react';
import { contactInfo } from '@/data/contact';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill name, email and message.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim(), subject: 'Portfolio contact' }),
      });
      const data = await res.json();
      if (data.ok) {
        setSent(true);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setError(data.error || 'Failed to send.');
      }
    } catch {
      setError('Failed to send. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden" id="contact">
      {/* Background decorations - matching hero pattern */}
      <div className="absolute inset-0 bg-[var(--hero-pattern)] opacity-30" aria-hidden />
      <div className="absolute inset-0 bg-[var(--hero-glow)] opacity-20" aria-hidden />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px),
            linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
        aria-hidden
      />

      {/* Blur orbs */}
      <div className="absolute top-20 -left-32 w-80 h-80 rounded-full bg-[var(--accent)]/5 blur-3xl" aria-hidden />
      <div className="absolute bottom-20 -right-32 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl" aria-hidden />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-[var(--accent)] mb-3">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--foreground)]">
            Let&apos;s Build Something{' '}
            <span className="bg-gradient-to-r from-[var(--accent)] to-indigo-500 bg-clip-text text-transparent">
              Amazing
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[var(--accent)] to-indigo-500 rounded-full mx-auto mt-4" />
          <p className="text-base sm:text-lg text-[var(--muted)] max-w-2xl mx-auto mt-5">
            Have a project in mind, or just want to chat? I&apos;m always open to discussing new projects, creative ideas or opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Details */}
          <div className="space-y-6">
            {Object.entries(contactInfo).map(([key, info]) => (
              <div
                key={key}
                className="group relative overflow-hidden rounded-xl bg-[var(--surface)] border-2 border-[var(--border)] shadow-[var(--card-shadow)] transition-all duration-300 hover:shadow-[var(--card-shadow-hover)] hover:border-[var(--accent)]/40"
              >
                <div className="flex items-center gap-5 p-5 sm:p-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent)]/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="h-6 w-6 text-[var(--accent)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={info.iconPath} />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">
                      {info.label}
                    </h3>
                    <a
                      href={info.href}
                      target={key === 'email' ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      className="text-base sm:text-lg font-medium text-[var(--foreground)] hover:text-[var(--accent)] transition-colors break-all"
                    >
                      {info.value}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Form */}
          <div className="relative">
            <div className="rounded-xl bg-[var(--surface)] border-2 border-[var(--border)] shadow-[var(--card-shadow)] overflow-hidden">
              {/* Gradient header bar */}
              <div className="h-1 w-full bg-gradient-to-r from-[var(--accent)] to-indigo-500" />

              <div className="p-6 sm:p-8">
                {sent ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-5">
                      <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">Message Sent!</h3>
                    <p className="text-[var(--muted)] mb-6">
                      Thanks for reaching out, {name.split(' ')[0]}. I&apos;ll get back to you soon.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--foreground)] font-medium hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-[var(--foreground)] ml-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full rounded-xl border-2 border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)]/60 focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/10 focus:outline-none transition-all"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-[var(--foreground)] ml-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded-xl border-2 border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)]/60 focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/10 focus:outline-none transition-all"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-[var(--foreground)] ml-1">
                        Message
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        className="w-full rounded-xl border-2 border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)]/60 focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/10 focus:outline-none transition-all resize-none"
                        placeholder="Tell me about your project..."
                        required
                      />
                    </div>

                    {error && (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full min-h-[52px] rounded-xl bg-gradient-to-r from-[var(--accent)] to-indigo-600 text-white text-base font-bold transition-all duration-300 hover:shadow-xl hover:shadow-[var(--accent)]/25 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Send Message
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}