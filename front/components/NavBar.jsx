"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(6,12,24,0.75)",
          backdropFilter: "blur(20px) saturate(140%)",
          WebkitBackdropFilter: "blur(20px) saturate(140%)",
          borderBottom: "1px solid rgba(200,218,248,0.06)",
        }}
      />
      <div className="relative max-w-5xl mx-auto px-5 h-[52px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" className="opacity-75 group-hover:opacity-100 transition-opacity">
            <path d="M15.5 10.5A7 7 0 0 1 7.5 2.5a7 7 0 1 0 8 8z" fill="rgba(200,218,248,0.9)" />
          </svg>
          <span className="text-[13px] font-medium" style={{ color:"rgba(215,228,250,0.88)", letterSpacing:"0.06em" }}>
            EventSync
          </span>
        </Link>

        <nav className="hidden sm:flex items-center gap-0.5">
          {[
            { href: "/events",    label: "Événements" },
            { href: "/speakers",  label: "Intervenants" },
            { href: "/favorites", label: "Favoris" },
          ].map(({ href, label }) => {
            const active = pathname.startsWith(href);
            return (
              <Link key={href} href={href}
                className="relative px-3.5 py-1.5 rounded-lg text-[12px] transition-all duration-200"
                style={{
                  color: active ? "rgba(215,228,250,0.92)" : "rgba(160,178,215,0.42)",
                  background: active ? "rgba(200,218,248,0.06)" : "transparent",
                  letterSpacing: "0.03em",
                }}
              >
                {label}
                {active && (
                  <span className="absolute inset-x-3 bottom-0.5 h-px rounded-full"
                    style={{ background: "rgba(200,218,248,0.25)" }} />
                )}
              </Link>
            );
          })}
        </nav>

        <Link href="/admin/login"
          className="text-[11px] px-3 py-1.5 rounded-lg transition-all duration-200"
          style={{ border:"1px solid rgba(200,218,248,0.09)", color:"rgba(160,178,215,0.38)", letterSpacing:"0.04em" }}
        >
          Admin
        </Link>
      </div>
    </header>
  );
}