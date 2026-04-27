'use client';

import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';

export default function Header() {
    const navItems = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about-section' },
        { name: 'Experience', href: '#experience-section' },
        { name: 'Projects', href: '#projects-section' },
        { name: 'Contact', href: '#contact' },
    ];

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            const offset = 80; // height of fixed header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center group transition-all duration-300">
                            <span className="text-xl sm:text-2xl font-black tracking-tighter text-[var(--foreground)] group-hover:text-[var(--accent)] transition-all duration-300">
                                Shehzad <span className="text-[var(--accent)] group-hover:text-[var(--foreground)] transition-colors duration-300">Iqbal</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={(e) => scrollToSection(e, item.href)}
                                className="px-4 py-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors relative group"
                            >
                                {item.name}
                                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
}
