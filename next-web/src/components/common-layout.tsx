"use client";

import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import type {ReactNode} from "react";

type NavItem = {
    label: string;
    href?: string;
    children?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
    {label: "Dashboard", href: "/"},
    {
        label: "Contacts",
        children: [
            {label: "All contacts", href: "/"},
            {label: "Segments", href: "/segments"},
            {label: "Import", href: "/import"},
        ],
    },
    {
        label: "Analytics",
        children: [
            {label: "Reports", href: "/reports"},
            {label: "Exports", href: "/exports"},
        ],
    },
    {label: "Automation", href: "/automation"},
];

const profileLinks = [
    {label: "Profile", href: "/profile"},
    {label: "Settings", href: "/settings"},
    {label: "Logout", href: "/logout"},
];

function SidebarItem({item}: { item: NavItem }) {
    if (!item.children) {
        return (
            <Link
                href={item.href ?? "#"}
                className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold text-[color:var(--ink)] transition hover:bg-white/70"
            >
                {item.label}
            </Link>
        );
    }

    return (
        <details className="group rounded-2xl border border-black/10 bg-white/70 px-3 py-2">
            <summary
                className="flex cursor-pointer list-none items-center justify-between px-1 py-2 text-sm font-semibold text-[color:var(--ink)]">
                {item.label}
                <span className="text-xs text-black/50 transition group-open:rotate-180">
          ▾
        </span>
            </summary>
            <div className="mt-2 space-y-1 pb-2">
                {item.children.map((child) => (
                    <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-xl px-3 py-2 text-sm text-black/70 transition hover:bg-white"
                    >
                        {child.label}
                    </Link>
                ))}
            </div>
        </details>
    );
}

export function CommonLayout({children}: { children: ReactNode }) {
    const profileMenuRef = useRef<HTMLDetailsElement | null>(null);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    useEffect(() => {
        function handlePointerDown(event: PointerEvent) {
            if (!profileMenuOpen || !profileMenuRef.current) {
                return;
            }

            const target = event.target as Node | null;
            if (target && !profileMenuRef.current.contains(target)) {
                setProfileMenuOpen(false);
            }
        }

        document.addEventListener("pointerdown", handlePointerDown);
        return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, [profileMenuOpen]);

    return (
        <div className="min-h-screen bg-transparent text-[color:var(--ink)]">
            <header className="sticky top-0 z-40 border-b border-black/10 bg-white/70 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <Link href="/" className="flex items-center gap-3">
            <span
                className="grid h-10 w-10 place-items-center rounded-2xl bg-[color:var(--gold)] text-sm font-semibold text-[color:var(--ink)] shadow-[0_12px_25px_rgba(244,162,89,0.4)]">
              CD
            </span>
                        <span className="text-lg font-semibold tracking-[0.05em]">
              Contacts Desk
            </span>
                    </Link>
                    <details
                        ref={profileMenuRef}
                        className="group relative"
                        open={profileMenuOpen}
                        onToggle={(event) => setProfileMenuOpen(event.currentTarget.open)}
                    >
                        <summary
                            className="flex cursor-pointer list-none items-center gap-3 rounded-full border border-black/10 bg-white/80 px-3 py-2 text-sm font-semibold text-black/70 shadow-sm transition hover:border-black/30">
              <span className="text-xs uppercase tracking-[0.2em] text-black/50">
                Momin
              </span>
                            <span
                                className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--sage)] text-sm font-semibold text-white">
                MO
              </span>
                        </summary>
                        <div
                            className="absolute right-0 mt-3 w-44 rounded-2xl border border-black/10 bg-white/95 p-2 text-sm shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
                            {profileLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="block rounded-xl px-3 py-2 text-black/70 transition hover:bg-[color:var(--paper-2)] hover:text-black"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </details>
                </div>
            </header>

            <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 md:grid-cols-[240px_1fr]">
                <aside className="space-y-4">
                    <div
                        className="rounded-3xl border border-black/10 bg-white/80 p-4 shadow-[0_20px_45px_var(--shadow)] backdrop-blur">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-black/40">
                            Navigation
                        </p>
                        <nav className="space-y-2">
                            {navItems.map((item) => (
                                <SidebarItem key={item.label} item={item}/>
                            ))}
                        </nav>
                    </div>
                </aside>

                <main className="min-w-0">{children}</main>
            </div>

            <footer className="border-t border-black/10 bg-white/70 py-4 text-center text-xs text-black/50">
                © {new Date().getFullYear()} Contacts Desk. All rights reserved.
            </footer>
        </div>
    );
}
