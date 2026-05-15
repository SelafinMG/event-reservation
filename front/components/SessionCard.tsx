"use client";

import Link from "next/link";
import { useState } from "react";
import BadgeLive from "./BadgeLive";
import type { SessionSummary } from "@/lib/mockApi";
import { formatTime } from "@/lib/mockApi";

interface SessionCardProps {
  session: SessionSummary;
  eventId: string;
  showFavorite?: boolean;
}

function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  const hue = (name.charCodeAt(0) * 37 + name.charCodeAt(1) * 13) % 360;
  return (
    <div
      title={name}
      className="w-5 h-5 rounded-full flex items-center justify-center text-white flex-shrink-0"
      style={{
        fontSize: "8px",
        fontWeight: 600,
        background: `hsl(${hue},35%,45%)`,
        border: "1px solid rgba(200,218,248,0.1)",
      }}
    >
      {initials}
    </div>
  );
}

export default function SessionCard({ session, eventId, showFavorite = true }: SessionCardProps) {
  const [isFav, setIsFav] = useState(() => {
    if (typeof window === "undefined") return false;
    return JSON.parse(localStorage.getItem("eventsync_favs") || "[]").includes(session.id);
  });

  const toggleFav = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    const favs: string[] = JSON.parse(localStorage.getItem("eventsync_favs") || "[]");
    const next = isFav ? favs.filter(id => id !== session.id) : [...favs, session.id];
    localStorage.setItem("eventsync_favs", JSON.stringify(next));
    setIsFav(!isFav);
    window.dispatchEvent(new Event("fav-change"));
  };

  return (
    <Link
      href={`/events/${eventId}/sessions/${session.id}`}
      className="group relative block rounded-xl overflow-hidden transition-all duration-300 h-full"
      style={{
        background: session.isLive ? "rgba(220,55,45,0.055)" : "rgba(200,218,248,0.04)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: session.isLive
          ? "1px solid rgba(220,55,45,0.2)"
          : "1px solid rgba(200,218,248,0.06)",
      }}
    >
      {/* top line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: session.isLive
          ? "linear-gradient(90deg,transparent,rgba(220,80,70,0.45),transparent)"
          : "linear-gradient(90deg,transparent,rgba(200,218,248,0.1),transparent)",
      }} />

      {/* hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: "rgba(200,218,248,0.025)" }} />

      <div className="relative p-4">
        {/* top row */}
        <div className="flex items-start justify-between mb-2.5 gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            {session.isLive && <BadgeLive size="sm" />}
            <span className="text-[10px] font-mono" style={{ color: "rgba(150,170,210,0.40)" }}>
              {formatTime(session.startTime)} – {formatTime(session.endTime)}
            </span>
          </div>
          {showFavorite && (
            <button onClick={toggleFav}
              className="flex-shrink-0 transition-opacity duration-200"
              style={{ opacity: isFav ? 1 : 0.22 }}
              title={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
            >
              <svg width="13" height="13" viewBox="0 0 24 24"
                fill={isFav ? "rgba(250,210,80,0.9)" : "none"}
                stroke={isFav ? "rgba(250,210,80,0.9)" : "rgba(200,218,248,0.6)"}
                strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </button>
          )}
        </div>

        {/* title */}
        <h3 className="text-[13px] font-medium leading-snug mb-3 transition-opacity group-hover:opacity-90"
          style={{ color: "rgba(220,232,252,0.92)", letterSpacing: "-0.01em" }}>
          {session.title}
        </h3>

        {/* footer */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-1">
              {session.speakers.slice(0, 3).map(sp => <Avatar key={sp.id} name={sp.fullName} />)}
            </div>
            <span className="text-[11px] truncate max-w-[120px]"
              style={{ color: "rgba(150,170,210,0.40)" }}>
              {session.speakers.map(s => s.fullName.split(" ")[0]).join(", ")}
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 font-mono"
            style={{
              background: "rgba(200,218,248,0.04)",
              border: "1px solid rgba(200,218,248,0.07)",
              color: "rgba(150,170,210,0.38)",
            }}>
            {session.room.name}
          </span>
        </div>
      </div>
    </Link>
  );
}