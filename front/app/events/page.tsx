import { getEvents } from "@/lib/mockApi";
import EventCard from "@/components/EventCard";

export const dynamic = "force-dynamic";

export default function EventsPage() {
  const events = getEvents();
  const liveCount = events.reduce((acc, e) => acc + e.sessions.filter(s => s.isLive).length, 0);

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-6 py-14">

      {/* Header */}
      <div className="mb-10 animate-fade-up">
        <div className="flex items-baseline gap-3 mb-2">
          <h1 className="text-3xl font-medium tracking-tight" style={{ color: "rgba(225,235,252,0.92)", letterSpacing:"-0.03em" }}>
            Événements
          </h1>
          {liveCount > 0 && (
            <span className="text-xs px-2 py-0.5 rounded-full" style={{
              background: "rgba(220,55,45,0.14)",
              border: "1px solid rgba(220,55,45,0.28)",
              color: "rgba(255,120,110,0.85)",
            }}>
              {liveCount} en direct
            </span>
          )}
        </div>
        <p className="text-sm font-light" style={{ color: "rgba(150,170,210,0.40)" }}>
          {events.length} événement{events.length > 1 ? "s" : ""}
        </p>
      </div>

      {/* Live alert */}
      {liveCount > 0 && (
        <div className="mb-7 px-4 py-3 rounded-xl flex items-center gap-3 animate-fade-up delay-1"
          style={{
            background: "rgba(220,55,45,0.07)",
            border: "1px solid rgba(220,55,45,0.16)",
          }}>
          <span className="relative flex w-2 h-2 flex-shrink-0">
            <span className="absolute w-2 h-2 rounded-full bg-red-400 animate-ping opacity-50" />
            <span className="w-2 h-2 rounded-full bg-red-400" />
          </span>
          <p className="text-xs font-light" style={{ color: "rgba(255,130,120,0.75)" }}>
            <span style={{ fontWeight:500 }}>{liveCount} session{liveCount > 1?"s":""} en cours</span>
            {" "}— rejoignez et interagissez en direct
          </p>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {events.map((event, i) => (
          <div key={event.id} style={{ animationDelay: `${(i + 2) * 0.1}s` }} className="animate-fade-up">
            <EventCard event={event} />
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-24" style={{ color: "rgba(150,170,210,0.28)" }}>
          <svg className="w-10 h-10 mx-auto mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm font-light">Aucun événement pour le moment</p>
        </div>
      )}
    </div>
  );
}