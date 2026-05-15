"use client";

import { useState, useEffect } from "react";
import type { SessionSummary, Room } from "@/lib/mockApi";
import SessionCard from "./SessionCard";
import MultiTrackGrid from "./MultiTrackGrid";
import Link from "next/link";

interface SessionExplorerProps {
  sessions: SessionSummary[];
  eventId: string;
  rooms: Room[];
  selectedRoomId: string | null;
}

export default function SessionExplorer({ sessions, eventId, rooms, selectedRoomId }: SessionExplorerProps) {
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage
  useEffect(() => {
    const loadFavs = () => {
      const favs = JSON.parse(localStorage.getItem("eventsync_favs") || "[]");
      setFavorites(favs);
    };
    loadFavs();
    
    // Listen for changes in localStorage from other components (custom event)
    const handleFavChange = () => loadFavs();
    window.addEventListener("fav-change", handleFavChange);
    return () => window.removeEventListener("fav-change", handleFavChange);
  }, []);

  // Filter sessions
  const filteredSessions = sessions.filter(s => {
    const matchesRoom = !selectedRoomId || s.room.id === selectedRoomId;
    const matchesFav = !showFavoritesOnly || favorites.includes(s.id);
    return matchesRoom && matchesFav;
  });

  // Group by day
  const sessionsByDay = filteredSessions.reduce<Record<string, SessionSummary[]>>((acc, s) => {
    const key = new Date(s.startTime).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
    if (!acc[key]) acc[key] = [];
    acc[key].push(s);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {/* Filters Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 animate-fade-up delay-3">
        {/* Room filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] mr-1" style={{ color: "rgba(140,162,205,0.30)" }}>Salle :</span>
          <Link href={`/events/${eventId}`}
            className="text-[11px] px-3 py-1 rounded-full transition-all duration-200"
            style={{
              background: selectedRoomId === null ? "rgba(200,218,248,0.15)" : "rgba(200,218,248,0.04)",
              border: selectedRoomId === null ? "1px solid rgba(200,218,248,0.25)" : "1px solid rgba(200,218,248,0.07)",
              color: selectedRoomId === null ? "rgba(255,255,255,0.9)" : "rgba(155,175,215,0.42)"
            }}>
            Toutes
          </Link>
          {rooms.map(room => {
            const isSelected = selectedRoomId === room.id;
            return (
              <Link key={room.id} href={`/events/${eventId}?room=${room.id}`}
                className="text-[11px] px-3 py-1 rounded-full transition-all duration-200"
                style={{
                  background: isSelected ? "rgba(200,218,248,0.15)" : "rgba(200,218,248,0.04)",
                  border: isSelected ? "1px solid rgba(200,218,248,0.25)" : "1px solid rgba(200,218,248,0.07)",
                  color: isSelected ? "rgba(255,255,255,0.9)" : "rgba(155,175,215,0.42)"
                }}>
                {room.name}
              </Link>
            );
          })}
        </div>

        {/* Favorite toggle */}
        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full transition-all duration-300 self-start sm:self-center"
          style={{
            background: showFavoritesOnly ? "rgba(250,210,80,0.12)" : "rgba(200,218,248,0.03)",
            border: showFavoritesOnly ? "1px solid rgba(250,210,80,0.3)" : "1px solid rgba(200,218,248,0.08)",
            color: showFavoritesOnly ? "rgba(250,210,80,0.9)" : "rgba(150,170,210,0.45)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24"
            fill={showFavoritesOnly ? "currentColor" : "none"}
            stroke="currentColor" strokeWidth="2">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-[11px] font-medium uppercase tracking-wider">Mes Favoris</span>
          {favorites.length > 0 && !showFavoritesOnly && (
            <span className="ml-1 text-[9px] px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10">
              {favorites.length}
            </span>
          )}
        </button>
      </div>

      {/* Sessions Content */}
      <div className="space-y-12">
        {Object.entries(sessionsByDay).length === 0 ? (
          <div className="py-20 text-center animate-fade-up">
            <p className="text-[13px] font-light" style={{ color: "rgba(140,162,205,0.35)" }}>
              {showFavoritesOnly ? "Vous n'avez pas encore de favoris." : "Aucune session ne correspond à vos critères."}
            </p>
          </div>
        ) : (
          Object.entries(sessionsByDay).map(([day, daySessions], di) => (
            <div key={day} className={`animate-fade-up`} style={{ animationDelay: `${di * 100}ms` }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: "rgba(140,162,205,0.45)", letterSpacing: "0.15em" }}>
                  {day}
                </span>
                <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(200,218,248,0.08), transparent)" }} />
              </div>

              {!selectedRoomId && !showFavoritesOnly ? (
                <MultiTrackGrid sessions={daySessions} eventId={eventId} />
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-3">
                  {daySessions
                    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
                    .map(s => <SessionCard key={s.id} session={s} eventId={eventId} />)}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
