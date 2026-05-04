import { notFound } from "next/navigation";
import Link from "next/link";
import { getEvent } from "@/lib/mockApi";
import { formatDateShort, formatTime } from "@/lib/mockApi";
import SessionCard from "@/components/SessionCard";
import BadgeLive from "@/components/BadgeLive";
import MultiTrackGrid from "@/components/MultiTrackGrid";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ eventId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function EventDetailPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const event = getEvent(resolvedParams.eventId);
  if (!event) notFound();

  const selectedRoomId = typeof resolvedSearchParams?.room === 'string' ? resolvedSearchParams.room : null;

  const liveSessions = event.sessions.filter(s => s.isLive);
  const filteredSessions = selectedRoomId 
    ? event.sessions.filter(s => s.room.id === selectedRoomId)
    : event.sessions;

  const sessionsByDay = filteredSessions.reduce<Record<string, typeof event.sessions>>((acc, s) => {
    const key = new Date(s.startTime).toLocaleDateString("fr-FR", { weekday:"long", day:"numeric", month:"long" });
    if (!acc[key]) acc[key] = [];
    acc[key].push(s);
    return acc;
  }, {});

  const rooms = Array.from(new Map(event.sessions.map(s => [s.room.id, s.room])).values());

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-6 py-12">

      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-[11px] animate-fade-up" style={{ color:"rgba(140,162,205,0.35)" }}>
        <Link href="/events" className="hover:opacity-70 transition-opacity">Événements</Link>
        <span>/</span>
        <span style={{ color:"rgba(175,195,232,0.55)" }}>{event.title}</span>
      </nav>

      {/* Event header */}
      <div className="relative rounded-2xl overflow-hidden mb-8 animate-fade-up delay-1"
        style={{ background:"rgba(200,218,248,0.04)", backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)", border:"1px solid rgba(200,218,248,0.07)" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{
          background: liveSessions.length > 0
            ? "linear-gradient(90deg,transparent,rgba(220,80,70,0.45),transparent)"
            : "linear-gradient(90deg,transparent,rgba(200,218,248,0.18),transparent)"
        }} />

        <div className="p-7 sm:p-8">
          {liveSessions.length > 0 && <div className="mb-3"><BadgeLive size="sm" /></div>}

          <h1 className="text-2xl sm:text-3xl font-medium mb-3 tracking-tight" style={{ color:"rgba(225,235,252,0.94)", letterSpacing:"-0.025em" }}>
            {event.title}
          </h1>
          <p className="text-sm leading-relaxed mb-7 max-w-xl font-light" style={{ color:"rgba(165,185,225,0.52)" }}>
            {event.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label:"Dates", val:`${formatDateShort(event.startDate)} — ${formatDateShort(event.endDate)}` },
              { label:"Lieu",  val: event.location.split(",")[0] },
              { label:"Sessions", val:`${event.sessions.length} · ${rooms.length} salles` },
            ].map(({ label, val }) => (
              <div key={label} className="px-4 py-3 rounded-xl"
                style={{ background:"rgba(200,218,248,0.04)", border:"1px solid rgba(200,218,248,0.06)" }}>
                <p className="text-[10px] uppercase tracking-widest mb-1 font-light" style={{ color:"rgba(140,162,205,0.38)", letterSpacing:"0.08em" }}>{label}</p>
                <p className="text-[12px] font-medium" style={{ color:"rgba(210,225,252,0.82)" }}>{val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live sessions */}
      {liveSessions.length > 0 && (
        <div className="mb-8 animate-fade-up delay-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute w-1.5 h-1.5 rounded-full bg-red-400 animate-ping opacity-60" />
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            </span>
            <span className="text-[10px] uppercase tracking-widest font-medium" style={{ color:"rgba(255,110,100,0.65)", letterSpacing:"0.1em" }}>
              En cours
            </span>
          </div>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {liveSessions.map(s => <SessionCard key={s.id} session={s} eventId={event.id} />)}
          </div>
        </div>
      )}

      {/* Room filters */}
      <div className="flex items-center gap-2 flex-wrap mb-7 animate-fade-up delay-3">
        <span className="text-[11px] mr-1" style={{ color:"rgba(140,162,205,0.30)" }}>Salle :</span>
        <Link href={`/events/${event.id}`}
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
            <Link key={room.id} href={`/events/${event.id}?room=${room.id}`}
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

      {/* Sessions by day */}
      <div className="space-y-8">
        {Object.entries(sessionsByDay).map(([day, daySessions], di) => (
          <div key={day} className={`animate-fade-up delay-${di + 4}`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] uppercase tracking-widest font-medium" style={{ color:"rgba(140,162,205,0.38)", letterSpacing:"0.1em" }}>
                {day}
              </span>
              <div className="flex-1 h-px" style={{ background:"rgba(200,218,248,0.05)" }} />
            </div>
            
            {!selectedRoomId ? (
              <MultiTrackGrid sessions={daySessions} eventId={event.id} />
            ) : (
              <div className="grid sm:grid-cols-2 gap-2.5">
                {daySessions
                  .sort((a,b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
                  .map(s => <SessionCard key={s.id} session={s} eventId={event.id} />)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}