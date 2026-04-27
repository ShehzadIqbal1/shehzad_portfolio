'use client';

import { useState, useEffect } from 'react';

interface ExperienceItem {
    id: string;
    title: string;
    company: string;
    location: string;
    period: string;
    description: string[];
    achievements?: string[];
    technologies?: string[];
    isCurrent?: boolean;
}

interface ExperienceSectionProps {
    title?: string;
    subtitle?: string;
    experiences?: ExperienceItem[];
}

const defaultExperiences: ExperienceItem[] = [
    {
        id: '1',
        title: 'Full Stack Developer',
        company: 'Global Digital Solutions',
        location: 'Islamabad, Pakistan',
        period: 'Aug 2025 – Present',
        isCurrent: true,
        description: [
            'Took full ownership of LeadsyncFlow, a production lead management platform serving 30 users, leading backend architecture decisions, API design, and React dashboard delivery from initial development through to live deployment.',
            'Collaborated with stakeholders to translate complex business workflows, including audit trails, rejection flows, and automated assignments into structured backend logic across a 6-module system.',
            'Managed production stability by implementing layered middleware for authentication, role guards, and centralized error handling, maintaining near-zero unhandled exceptions across 35 live API endpoints.',
            'Delivered role-scoped React dashboards with Axios-connected backend services, ensuring each of the 5 user roles has a distinct, correctly restricted view of the system.',
            'Handled deployment, server configuration, and ongoing production support on a VPS environment using PM2 and Nginx to keep the platform consistently available for daily operations.',
        ],
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'PM2', 'Nginx', 'Axios', 'JWT'],
    },
    {
        id: '2',
        title: 'Junior Backend Developer',
        company: 'Proto IT Consultants',
        location: 'Islamabad, Pakistan',
        period: 'Feb 2025 – Jul 2025',
        description: [
            'Worked within a team of 9 developers to build and maintain RESTful APIs using Node.js, Express.js, and MongoDB, following a clean architecture pattern across routes, controllers, services, and models.',
            'Set up JWT authentication flows covering access and refresh token rotation, along with secure password-reset pipelines connected to SendGrid transactional email.',
            'Integrated the Cloudinary SDK for media upload handling with file-type validation, size limits, and automatic CDN delivery, removing media load from the application server.',
            'Coordinated with frontend developers to align API contracts and reduce back-and-forth revision cycles across shared endpoints.',
            'Contributed to code reviews, shared utility libraries, and improved Mongoose schema indexing to speed up response times on frequently queried endpoints.',
        ],
        technologies: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'SendGrid', 'Cloudinary', 'Mongoose'],
    },
    {
        id: '3',
        title: 'Backend Developer Intern',
        company: 'SORIIC',
        location: 'Sargodha, Pakistan',
        period: 'Jul 2024 – Sep 2024',
        description: [
            'Supported senior developers in building and testing Express.js routes and API modules for client-facing MERN stack projects.',
            'Developed user authentication modules using JWT, gaining practical understanding of token lifecycle, middleware chaining, and protected route patterns.',
            'Optimized Mongoose schemas and wrote targeted queries to resolve performance bottlenecks identified during QA testing.',
            'Documented API endpoints and participated in daily standups, building early habits around structured communication and delivery tracking.',
        ],
        technologies: ['Express.js', 'JWT', 'Mongoose', 'MongoDB', 'REST APIs'],
    },
];

export default function ExperienceSection({
    title = 'Work Experience',
    subtitle = 'My Professional Journey',
    experiences = defaultExperiences,
}: ExperienceSectionProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        const section = document.getElementById('experience-section');
        if (section) observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="experience-section"
            className="relative py-16 sm:py-20 lg:py-28 overflow-hidden"
        >
            {/* Background decorations */}
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
            <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl" aria-hidden />
            <div className="absolute bottom-1/3 -right-32 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl" aria-hidden />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-[var(--accent)] mb-3">
                        {subtitle}
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--foreground)]">
                        {title}
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-[var(--accent)] to-indigo-500 rounded-full mx-auto mt-4" />
                </div>

                {/* Timeline - Vertical line on left for desktop, hidden on mobile */}
                <div className="relative">
                    {/* Desktop timeline line */}
                    <div className="hidden lg:block absolute left-[2.5rem] top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent)]/40 via-[var(--accent)]/20 to-transparent" />

                    <div className="space-y-8 lg:space-y-12">
                        {experiences.map((exp, index) => (
                            <div
                                key={exp.id}
                                className={`group relative transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                                    }`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                <div className="flex flex-col lg:flex-row lg:gap-8">
                                    {/* Timeline dot and period - Left column */}
                                    <div className="lg:w-72 flex-shrink-0 mb-6 lg:mb-0">
                                        <div className="flex items-start gap-4">
                                            {/* Experience Icon / Timeline dot */}
                                            <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent)] to-indigo-500 shadow-lg shadow-[var(--accent)]/25 flex items-center justify-center flex-shrink-0 mt-1">
                                                <div className="absolute inset-0 rounded-full bg-[var(--accent)] animate-ping opacity-20" />
                                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>

                                            <div>
                                                <div className="text-lg sm:text-xl font-bold text-[var(--foreground)] leading-tight">
                                                    {exp.title}
                                                </div>
                                                <div className="text-sm sm:text-base text-[var(--accent)] font-semibold mt-1">
                                                    {exp.company}
                                                </div>
                                                <div className="text-xs text-[var(--muted)] mt-2 flex items-center gap-1 flex-wrap">
                                                    <span>{exp.period}</span>
                                                    <span>•</span>
                                                    <span>{exp.location}</span>
                                                </div>
                                                {exp.isCurrent && (
                                                    <span className="inline-flex items-center gap-1.5 mt-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                                        <span className="relative flex h-1.5 w-1.5">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                                                        </span>
                                                        Current
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Card - Right column */}
                                    <div className="flex-1 lg:ml-8">
                                        <div
                                            className="relative overflow-hidden rounded-xl bg-[var(--surface)] border-2 border-[var(--border)] shadow-[var(--card-shadow)] transition-all duration-300 hover:shadow-[var(--card-shadow-hover)] hover:border-[var(--accent)]/40 cursor-pointer"
                                            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                        >
                                            {/* Gradient header bar */}
                                            <div className="h-1 w-full bg-gradient-to-r from-[var(--accent)] to-indigo-500" />

                                            <div className="p-5 sm:p-6">
                                                {/* Mobile title (hidden on desktop) */}
                                                <div className="lg:hidden mb-3 pb-3 border-b border-[var(--border])">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="text-lg font-bold text-[var(--foreground)]">
                                                                {exp.title}
                                                            </h3>
                                                            <p className="text-sm text-[var(--accent)] font-medium">
                                                                {exp.company}
                                                            </p>
                                                        </div>
                                                        {exp.isCurrent && (
                                                            <span className="px-2 py-1 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                                                Current
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-[var(--muted)] mt-2 flex gap-2">
                                                        <span>{exp.period}</span>
                                                        <span>•</span>
                                                        <span>{exp.location}</span>
                                                    </div>
                                                </div>

                                                {/* Description list */}
                                                <ul className="space-y-2.5">
                                                    {exp.description.map((item, idx) => (
                                                        <li key={idx} className="flex gap-3 text-sm text-[var(--foreground)]/75 leading-relaxed">
                                                            <svg className="w-4 h-4 text-[var(--accent)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>

                                                {/* Technologies tags */}
                                                {exp.technologies && exp.technologies.length > 0 && (
                                                    <div className="mt-4 pt-3 border-t border-[var(--border])">
                                                        <div className="flex flex-wrap gap-1.5">
                                                            {exp.technologies.map((tech, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="rounded-full px-2.5 py-1 text-xs font-medium bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--muted)]"
                                                                >
                                                                    {tech}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Expand/collapse indicator on desktop */}
                                                <div className="hidden lg:flex justify-end mt-3">
                                                    <svg
                                                        className={`w-5 h-5 text-[var(--muted)] transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''
                                                            }`}
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>

                                                {/* Expandable content */}
                                                {activeIndex === index && exp.achievements && exp.achievements.length > 0 && (
                                                    <div className="mt-4 pt-3 border-t border-[var(--border)] animate-fadeIn">
                                                        <p className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wide mb-2">
                                                            Key Achievements
                                                        </p>
                                                        <ul className="space-y-1.5">
                                                            {exp.achievements.map((achievement, idx) => (
                                                                <li key={idx} className="flex gap-2 text-xs text-[var(--foreground)]/70">
                                                                    <svg className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                                    </svg>
                                                                    <span>{achievement}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-12 pt-4">
                    <a
                        href="/resume"
                        download
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--accent)] to-indigo-600 text-white font-semibold shadow-lg shadow-[var(--accent)]/25 hover:shadow-xl hover:shadow-[var(--accent)]/40 transition-all duration-300 hover:scale-105 active:scale-98"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Full Resume (PDF)
                    </a>
                </div>
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
        </section>
    );
}