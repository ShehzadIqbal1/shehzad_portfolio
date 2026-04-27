'use client';

import { useState, useEffect } from 'react';

interface AboutStat {
    id: string;
    value: string;
    label: string;
    iconPath: string;
    suffix?: string;
    prefix?: string;
}

interface AboutSkillCategory {
    title: string;
    iconPath: string;
    skills: string[];
}

interface AboutQualification {
    id: string;
    title: string;
    institution: string;
    year: string;
    iconPath: string;
}

interface AboutSectionProps {
    name?: string;
    role?: string;
    description?: string;
    stats?: AboutStat[];
    skillCategories?: AboutSkillCategory[];
    qualifications?: AboutQualification[];
}

const defaultStats: AboutStat[] = [
    {
        id: 'exp',
        value: '2',
        label: 'Years Experience',
        iconPath: 'M12 8v4l3 3M12 2a10 10 0 100 20 10 10 0 000-20z',
        suffix: '+',
    },
    {
        id: 'availability',
        value: 'Open',
        label: 'For Hire',
        iconPath: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
        suffix: '',
    },
];

// Complete skills organized in compact categories
const defaultSkillCategories: AboutSkillCategory[] = [
    {
        title: 'Languages & Runtime',
        iconPath: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
        skills: ['JavaScript (ES6+)', 'TypeScript', 'Node.js', 'HTML5', 'CSS3', 'SQL', 'C++'],
    },
    {
        title: 'Frontend',
        iconPath: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
        skills: ['React.js', 'Redux Toolkit', 'Next.js', 'Tailwind CSS', 'Bootstrap'],
    },
    {
        title: 'Backend & APIs',
        iconPath: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
        skills: ['Express.js', 'REST APIs', 'Middleware', 'RBAC', 'JWT', 'OAuth 2.0', 'Socket.io'],
    },
    {
        title: 'Databases',
        iconPath: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',
        skills: ['MongoDB', 'Mongoose', 'MySQL', 'Redis'],
    },
    {
        title: 'Validation & Security',
        iconPath: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
        skills: ['Joi', 'express-validator', 'Helmet.js', 'bcrypt', 'CORS', 'Rate Limiting'],
    },
    {
        title: 'Third-Party Integrations',
        iconPath: 'M8 16h8M8 12h8M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z',
        skills: ['Stripe', 'Cloudinary', 'AWS S3', 'SendGrid', 'Resend', 'Google Gemini', 'Google OAuth'],
    },
    {
        title: 'DevOps & Tools',
        iconPath: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
        skills: ['Git', 'GitHub', 'Docker', 'Postman', 'VS Code', 'Linux CLI', 'PM2', 'Nginx', 'AWS (S3)'],
    },
];

const defaultQualifications: AboutQualification[] = [
    {
        id: '1',
        title: 'Bachelor of Science in Software Engineering',
        institution: 'Shaheed Zulfikar Ali Bhutto Institute of Science and Technology (SZABIST) Islamabad',
        year: '2021 - 2025',
        iconPath: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
    },
];

export default function AboutSection({
    name = 'Shehzad Iqbal',
    role = 'MERN Stack Developer',
    description = `MERN Stack Developer with 2 years of practical experience building production-level applications across 5 substantial projects. Skilled in developing secure RESTful APIs with JWT and role-based access control, delivering real-time features using Socket.io, and integrating third-party services including Stripe, Cloudinary, and SendGrid. Focused on writing clean, maintainable code with well-structured middleware pipelines, Mongoose schema design, and Joi-based input validation. Currently leading full-feature development at Global Digital Solutions, owning a production platform that processes over 1,000 leads per week across a team of 30 users.`,
    stats = defaultStats,
    skillCategories = defaultSkillCategories,
    qualifications = defaultQualifications,
}: AboutSectionProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});

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

        const section = document.getElementById('about-section');
        if (section) observer.observe(section);

        return () => observer.disconnect();
    }, []);

    // Animate counters when visible
    useEffect(() => {
        if (!isVisible) return;

        const animateNumber = (id: string, target: number, duration = 1500) => {
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    setAnimatedValues((prev) => ({ ...prev, [id]: target }));
                    clearInterval(timer);
                } else {
                    setAnimatedValues((prev) => ({ ...prev, [id]: Math.floor(current) }));
                }
            }, 16);
        };

        stats.forEach((stat) => {
            const numericValue = parseInt(stat.value, 10);
            if (!isNaN(numericValue)) {
                animateNumber(stat.id, numericValue);
            }
        });
    }, [isVisible, stats]);

    return (
        <section
            id="about-section"
            className="relative py-16 sm:py-20 lg:py-28 overflow-hidden"
        >
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
                        Get To Know Me
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--foreground)]">
                        About <span className="bg-gradient-to-r from-[var(--accent)] to-indigo-500 bg-clip-text text-transparent">Me</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-[var(--accent)] to-indigo-500 rounded-full mx-auto mt-4" />
                </div>

                {/* Two column layout */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left column - Bio & Stats */}
                    <div className="space-y-6">
                        {/* Role badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 w-fit">
                            <svg className="w-4 h-4 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm font-medium text-[var(--accent)]">{role}</span>
                        </div>

                        {/* Bio */}
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <p className="text-[var(--foreground)]/80 leading-relaxed text-base sm:text-lg">
                                {description}
                            </p>
                        </div>

                        {/* Stats Grid - matching card style */}
                        <div className="grid grid-cols-2 gap-4">
                            {stats.map((stat) => (
                                <div
                                    key={stat.id}
                                    className="group relative overflow-hidden rounded-xl bg-[var(--surface)] border-2 border-[var(--border)] shadow-[var(--card-shadow)] p-4 sm:p-5 transition-all duration-300 hover:shadow-[var(--card-shadow-hover)] hover:border-[var(--accent)]/40"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent)]/20 to-purple-500/20 flex items-center justify-center">
                                            <svg
                                                className="h-5 w-5 text-[var(--accent)]"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={1.8}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d={stat.iconPath} />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-2xl sm:text-3xl font-black text-[var(--foreground)] tracking-tight">
                                                {animatedValues[stat.id] !== undefined
                                                    ? `${stat.prefix || ''}${animatedValues[stat.id]}${stat.suffix || ''}`
                                                    : `${stat.prefix || ''}${stat.value}${stat.suffix || ''}`}
                                            </div>
                                            <div className="text-xs sm:text-sm text-[var(--muted)] mt-0.5">
                                                {stat.label}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Qualifications / Education */}
                        <div>
                            <h3 className="text-lg font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                Education
                            </h3>
                            <div className="space-y-3">
                                {qualifications.map((qual) => (
                                    <div
                                        key={qual.id}
                                        className="group flex gap-4 p-4 rounded-xl bg-[var(--surface)]/50 border border-[var(--border)] transition-all duration-300 hover:border-[var(--accent)]/30 hover:bg-[var(--surface)]"
                                    >
                                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--accent)]/15 to-purple-500/15 flex items-center justify-center">
                                            <svg
                                                className="w-5 h-5 text-[var(--accent)]"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={1.8}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d={qual.iconPath} />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                                                <h4 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors text-sm sm:text-base">
                                                    {qual.title}
                                                </h4>
                                                <span className="text-xs font-mono text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded-full">
                                                    {qual.year}
                                                </span>
                                            </div>
                                            <p className="text-xs sm:text-sm text-[var(--muted)]">
                                                {qual.institution}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right column - Skills Categories - Compact multi-column layout */}
                    <div>
                        <h3 className="text-xl font-bold text-[var(--foreground)] mb-6 flex items-center gap-2">
                            <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Technical Expertise
                        </h3>

                        {/* 2-column grid for skill categories */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {skillCategories.map((category, idx) => (
                                <div
                                    key={idx}
                                    className="group rounded-xl bg-[var(--surface)]/40 border border-[var(--border)] p-4 transition-all duration-300 hover:border-[var(--accent)]/30 hover:bg-[var(--surface)]/60 h-full"
                                >
                                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[var(--border)] group-hover:border-[var(--accent)]/20 transition-colors">
                                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[var(--accent)]/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                                            <svg
                                                className="w-3.5 h-3.5 text-[var(--accent)]"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={1.8}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d={category.iconPath} />
                                            </svg>
                                        </div>
                                        <h4 className="font-semibold text-[var(--foreground)] text-xs uppercase tracking-wide truncate">
                                            {category.title}
                                        </h4>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {category.skills.map((skill, skillIdx) => (
                                            <span
                                                key={skillIdx}
                                                className="rounded-full px-2 py-1 text-[10px] sm:text-xs font-medium bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--foreground)]/80 shadow-sm transition-all duration-200 hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/5"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Availability note */}
                        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500/10 via-transparent to-teal-500/5 border border-emerald-500/20 p-4 mt-4">
                            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-emerald-500/10 blur-2xl" />
                            <div className="relative flex gap-3 items-center">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center animate-pulse">
                                    <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                                        Open for Opportunities
                                    </p>
                                    <p className="text-xs text-[var(--muted)]">
                                        Available for full-time positions and freelance projects
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}