import { notFound } from "next/navigation";
import Link from "next/link";
import { getSpeaker, formatTime } from "@/lib/mockApi";
import BadgeLive from "@/components/BadgeLive";

export const dynamic = "force-dynamic";
interface Props { params: { speakerId: string } }

const socialLabel: Record<string,string> = { twitter:"X", linkedin:"LinkedIn", github:"GitHub", website:"Site", other:"Lien" };

export default function SpeakerPage({ params }: Props) {
  const speaker = getSpeaker(params.speakerId);
  if (!speaker) notFound();
  const initials = speaker.fullName.split(" ").map(n=>n[0]).join("").toUpperCase().slice(0,2);
  const hue = (speaker.fullName.charCodeAt(0)*37+speaker.fullName.charCodeAt(1)*13)%360;

  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-6 py-12">
      <nav className="mb-8 flex items-center gap-2 text-[11px] animate-fade-up" style={{ color:"rgba(130,155,200,0.32)" }}>
        <Link href="/speakers" className="hover:opacity-70 transition-opacity">Intervenants</Link>
        <span>/</span>
        <span style={{ color:"rgba(170,190,232,0.50)" }}>{speaker.fullName}</span>
      </nav>

      {/* Profile */}
      <div className="relative rounded-2xl overflow-hidden mb-7 animate-fade-up delay-1"
        style={{ background:"rgba(200,218,248,0.04)", backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)", border:"1px solid rgba(200,218,248,0.07)" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background:"linear-gradient(90deg,transparent,rgba(200,218,248,0.16),transparent)" }} />
        <div className="h-16 w-full" style={{ background:`linear-gradient(135deg, hsl(${hue},20%,12%), transparent)` }} />
        <div className="px-7 pb-7 -mt-6">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-lg font-semibold text-white mb-5 border-4"
            style={{ background:`hsl(${hue},28%,35%)`, borderColor:"#060c18", border:"3px solid #060c18" }}>
            {initials}
          </div>
          <h1 className="text-2xl font-medium mb-3" style={{ color:"rgba(225,235,252,0.94)", letterSpacing:"-0.02em" }}>
            {speaker.fullName}
          </h1>
          <p className="text-sm leading-relaxed mb-5 font-light" style={{ color:"rgba(160,180,220,0.52)" }}>
            {speaker.bio}
          </p>
          {speaker.links.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              {speaker.links.map(l => (
                <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] transition-all duration-200"
                  style={{ background:"rgba(200,218,248,0.04)", border:"1px solid rgba(200,218,248,0.08)", color:"rgba(150,170,210,0.50)" }}>
                  {socialLabel[l.type] ?? l.type}
                  <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ opacity:0.4 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sessions */}
      <div className="animate-fade-up delay-2">
        <p className="text-[10px] uppercase tracking-widest mb-4 font-medium" style={{ color:"rgba(130,155,200,0.35)", letterSpacing:"0.1em" }}>
          Sessions
        </p>
        <div className="space-y-2">
          {speaker.sessions.map(s => (
            <div key={s.id} className="relative flex items-center gap-4 px-4 py-3.5 rounded-xl overflow-hidden"
              style={{
                background: s.isLive ? "rgba(220,55,45,0.05)" : "rgba(200,218,248,0.03)",
                border: s.isLive ? "1px solid rgba(220,55,45,0.16)" : "1px solid rgba(200,218,248,0.06)",
              }}>
              {s.isLive && <div className="absolute top-0 left-0 right-0 h-px" style={{ background:"linear-gradient(90deg,transparent,rgba(220,80,70,0.4),transparent)" }} />}
              <div className="text-center flex-shrink-0 w-12">
                <p className="text-[10px] font-mono" style={{ color:"rgba(140,162,205,0.38)" }}>{formatTime(s.startTime)}</p>
                <p className="text-[9px] font-mono" style={{ color:"rgba(130,155,200,0.25)" }}>{formatTime(s.endTime)}</p>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  {s.isLive && <BadgeLive size="sm" />}
                  <p className="text-[13px] font-medium truncate" style={{ color:"rgba(210,225,252,0.85)" }}>{s.title}</p>
                </div>
                <p className="text-[11px] font-light" style={{ color:"rgba(130,155,200,0.35)" }}>{s.room.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}