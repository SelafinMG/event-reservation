// @ts-nocheck
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: "/events", label: "Événements" },
    { href: "/speakers", label: "Intervenants" },
    { href: "/favorites", label: "Favoris" },
  ];

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-16 bg-[rgba(7,7,9,0.75)] backdrop-blur-xl border-b border-white/10"
    >
      {/* Glow border */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-blue-500/50 to-transparent animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/40 group-hover:scale-105 transition-transform">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <span className="font-bold text-[17px] tracking-tight text-white group-hover:text-blue-400 transition-colors">
            EventSync
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map(({ href, label }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`relative px-4 py-2 rounded-full text-sm transition-all duration-200
                  ${active ? "text-white font-medium bg-white/10" : "text-white/50 hover:text-white hover:bg-white/5"}`}
              >
                {label}
                {active && (
                  <span className="absolute left-1/2 -bottom-1 w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA - full page load to boot the react-admin SPA at /admin */}
        <a
          href="/admin"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white bg-linear-to-r from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/40 hover:scale-105 transition-transform"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 
              10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
          </svg>
          Admin
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="md:hidden bg-[rgba(7,7,9,0.95)] backdrop-blur-xl border-t border-white/10 px-6 py-4 space-y-2 animate-in fade-in slide-in-from-top-2">
          {navItems.map(({ href, label }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`block px-4 py-2 rounded-lg text-sm transition-all duration-200
                  ${active ? "text-white bg-white/10" : "text-white/50 hover:text-white hover:bg-white/5"}`}
              >
                {label}
              </Link>
            );
          })}
          <a
            href="/admin"
            className="block px-4 py-2 rounded-lg text-sm font-medium text-white bg-linear-to-r from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/40"
          >
            Admin
          </a>
        </div>
      )}
    </header>
  );
}
