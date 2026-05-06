"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      height: "60px",
      background: "rgba(7,7,9,0.75)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{
            width: "30px", height: "30px", borderRadius: "8px",
            background: "linear-gradient(135deg,#1d4ed8,#2563eb)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 16px rgba(37,99,235,0.5)",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="white" />
            </svg>
          </div>
          <span style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 700, fontSize: "17px",
            color: "rgba(255,255,255,0.95)",
            letterSpacing: "-0.02em",
          }}>
            EventSync
          </span>
        </Link>

        {/* Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {[
            { href: "/events", label: "Événements" },
            { href: "/speakers", label: "Intervenants" },
            { href: "/favorites", label: "Favoris" },
          ].map(({ href, label }) => {
            const active = pathname.startsWith(href);
            return (
              <Link key={href} href={href} style={{
                padding: "6px 14px", borderRadius: "100px",
                fontSize: "13px", fontWeight: active ? 500 : 400,
                color: active ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.45)",
                background: active ? "rgba(255,255,255,0.08)" : "transparent",
                textDecoration: "none",
                transition: "all 0.2s ease",
                letterSpacing: "0.01em",
              }}>
                {label}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <Link href="/admin/login" className="btn-primary" style={{ textDecoration: "none" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
          </svg>
          Admin
        </Link>
      </div>
    </header>
  );
}