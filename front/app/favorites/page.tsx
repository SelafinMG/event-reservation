"use client";
import { useEffect, useState } from "react";
import SessionCard from "@/components/SessionCard";
import { getEvents } from "@/lib/mockApi";
import type { SessionSummary } from "@/lib/mockApi";

export default function FavoritesPage() {
  const [favs, setFavs] = useState<{ session:SessionSummary; eventId:string }[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const ids: string[] = JSON.parse(localStorage.getItem("eventsync_favs") || "[]");
    const res: { session:SessionSummary; eventId:string }[] = [];
    for (const evt of getEvents())
      for (const s of evt.sessions)
        if (ids.includes(s.id)) res.push({ session:s, eventId:evt.id });
    setFavs(res); setLoaded(true);
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-6 py-14">
      <div className="mb-10 animate-fade-up flex items-baseline gap-3">
        <h1 className="text-3xl font-medium tracking-tight" style={{ color:"rgba(225,235,252,0.92)", letterSpacing:"-0.03em" }}>Favoris</h1>
        {loaded && favs.length > 0 && (
          <span className="text-[12px] font-light" style={{ color:"rgba(200,175,60,0.55)" }}>
            {favs.length} session{favs.length>1?"s":""}
          </span>
        )}
      </div>

      {!loaded ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="h-20 rounded-xl shimmer" style={{ background:"rgba(200,218,248,0.04)" }} />)}
        </div>
      ) : favs.length === 0 ? (
        <div className="text-center py-24">
          <svg className="w-10 h-10 mx-auto mb-4 opacity-20" fill="none" stroke="rgba(200,218,248,0.5)" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <p className="text-sm font-light" style={{ color:"rgba(140,162,205,0.30)" }}>
            Aucune session ajoutée — cliquez sur l'étoile dans les cartes
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {favs.map(({ session, eventId }, i) => (
            <div key={session.id} className={`animate-fade-up delay-${i+1}`}>
              <SessionCard session={session} eventId={eventId} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}