import { notFound } from "next/navigation";
import Link from "next/link";
import { getSession, getEvent, formatTime } from "@/lib/mockApi";
import BadgeLive from "@/components/BadgeLive";
import QuestionSection from "@/components/QuestionSection";

export const dynamic = "force-dynamic";
interface Props { params: { eventId: string; sessionId: string } }

function SpeakerChip({ speaker }: { speaker: { id:string; fullName:string; photoUrl:string|null } }) {
  const initials = speaker.fullName.split(" ").map(n=>n[0]).join("").toUpperCase().slice(0,2);
  const hue = (speaker.fullName.charCodeAt(0)*37+speaker.fullName.charCodeAt(1)*13)%360;
  return (
    <Link href={`/speakers/${speaker.id}`}
      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all duration-200"
      style={{ background:"rgba(200,218,248,0.04)", border:"1px solid rgba(200,218,248,0.07)" }}>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[11px] font-semibold flex-shrink-0"
        style={{ background:`hsl(${hue},30%,38%)`, border:"1px solid rgba(200,218,248,0.08)" }}>
        {initials}
      </div>
      <div>
        <p className="text-[12px] font-medium" style={{ color:"rgba(210,225,252,0.85)" }}>{speaker.fullName}</p>
        <p className="text-[10px] font-light" style={{ color:"rgba(130,155,200,0.38)" }}>Voir le profil</p>
      </div>
    </Link>
  );
}

export default function SessionDetailPage({ params }: Props) {
  const session = getSession(params.sessionId);
  if (!session || session.eventId !== params.eventId) notFound();
  const event = getEvent(params.eventId);
  const duration = Math.round((new Date(session.endTime).getTime() - new Date(session.startTime).getTime())/60000);

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-6 py-12">

      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-[11px] animate-fade-up flex-wrap" style={{ color:"rgba(130,155,200,0.32)" }}>
        <Link href="/events" className="hover:opacity-70 transition-opacity">Événements</Link>
        <span>/</span>
        <Link href={`/events/${params.eventId}`} className="hover:opacity-70 transition-opacity">{event?.title}</Link>
        <span>/</span>
        <span className="truncate max-w-[180px]" style={{ color:"rgba(170,190,232,0.50)" }}>{session.title}</span>
      </nav>

      {/* Session header */}
      <div className="relative rounded-2xl overflow-hidden mb-8 animate-fade-up delay-1"
        style={{
          background: session.isLive ? "rgba(220,55,45,0.05)" : "rgba(200,218,248,0.04)",
          backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)",
          border: session.isLive ? "1px solid rgba(220,55,45,0.18)" : "1px solid rgba(200,218,248,0.07)",
        }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{
          background: session.isLive
            ? "linear-gradient(90deg,transparent,rgba(220,80,70,0.5),transparent)"
            : "linear-gradient(90deg,transparent,rgba(200,218,248,0.18),transparent)",
        }} />

        <div className="p-7 sm:p-8">
          <div className="flex items-center gap-3 flex-wrap mb-4">
            {session.isLive && <BadgeLive size="sm" />}
            <span className="text-[11px] font-mono" style={{ color:"rgba(145,168,215,0.40)" }}>
              {formatTime(session.startTime)} – {formatTime(session.endTime)}
            </span>
            <span className="text-[11px]" style={{ color:"rgba(130,155,200,0.28)" }}>· {duration} min</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-medium mb-4" style={{ color:"rgba(225,235,252,0.94)", letterSpacing:"-0.025em" }}>
            {session.title}
          </h1>

          <p className="text-sm leading-relaxed mb-6 max-w-xl font-light" style={{ color:"rgba(162,183,225,0.50)" }}>
            {session.description}
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            {[
              { icon:"🏛", val: session.room.name },
              { icon:"👥", val: `Cap. ${session.capacity}` },
              { icon:"📅", val: new Date(session.startTime).toLocaleDateString("fr-FR",{day:"numeric",month:"long"}) },
            ].map(({ icon, val }) => (
              <span key={val} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-light"
                style={{ background:"rgba(200,218,248,0.04)", border:"1px solid rgba(200,218,248,0.06)", color:"rgba(155,175,215,0.48)" }}>
                {icon} {val}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Speakers */}
        <div className="lg:col-span-1 animate-fade-up delay-2">
          <p className="text-[10px] uppercase tracking-widest mb-3 font-medium" style={{ color:"rgba(130,155,200,0.35)", letterSpacing:"0.1em" }}>
            Intervenants
          </p>
          <div className="space-y-2">
            {session.speakers.map(sp => <SpeakerChip key={sp.id} speaker={sp} />)}
          </div>
        </div>

        {/* Q&A */}
        <div className="lg:col-span-2 animate-fade-up delay-3">
          <div className="rounded-2xl p-6"
            style={{ background:"rgba(200,218,248,0.03)", backdropFilter:"blur(14px)", WebkitBackdropFilter:"blur(14px)", border:"1px solid rgba(200,218,248,0.06)" }}>
            <QuestionSection
              initialQuestions={session.questions}
              sessionId={session.id}
              isLive={session.isLive}
            />
          </div>
        </div>
      </div>
    </div>
  );
}