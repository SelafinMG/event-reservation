import Link from "next/link";
import { getSpeakers } from "@/lib/mockApi";

export const dynamic = "force-dynamic";

export default function SpeakersPage() {
  const speakers = getSpeakers();
  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-6 py-14">
      <div className="mb-10 animate-fade-up">
        <h1 className="text-3xl font-medium tracking-tight mb-2" style={{ color:"rgba(225,235,252,0.92)", letterSpacing:"-0.03em" }}>
          Intervenants
        </h1>
        <p className="text-sm font-light" style={{ color:"rgba(150,170,210,0.40)" }}>
          {speakers.length} expert{speakers.length > 1 ? "s" : ""} au programme
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {speakers.map((speaker, i) => {
          const initials = speaker.fullName.split(" ").map(n=>n[0]).join("").toUpperCase().slice(0,2);
          const hue = (speaker.fullName.charCodeAt(0)*37 + speaker.fullName.charCodeAt(1)*13) % 360;
          return (
            <Link key={speaker.id} href={`/speakers/${speaker.id}`}
              className={`group block rounded-2xl p-5 relative overflow-hidden transition-all duration-400 animate-fade-up delay-${(i%6)+1}`}
              style={{
                background:"rgba(200,218,248,0.04)",
                backdropFilter:"blur(14px)",
                border:"1px solid rgba(200,218,248,0.06)",
              }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ background:"rgba(200,218,248,0.03)" }} />
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background:"linear-gradient(90deg,transparent,rgba(200,218,248,0.15),transparent)" }} />

              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-semibold text-white mb-4 relative"
                style={{ background:`hsl(${hue},28%,35%)`, border:"1px solid rgba(200,218,248,0.07)" }}>
                {initials}
              </div>

              <h2 className="text-[13px] font-medium mb-1 transition-opacity group-hover:opacity-90"
                style={{ color:"rgba(215,228,252,0.90)", letterSpacing:"-0.01em" }}>
                {speaker.fullName}
              </h2>
              <p className="text-[11px] font-light mb-3" style={{ color:"rgba(135,158,205,0.38)" }}>
                {speaker.sessions.length} session{speaker.sessions.length>1?"s":""}
              </p>
              <p className="text-[12px] font-light leading-relaxed line-clamp-2 mb-4"
                style={{ color:"rgba(160,180,220,0.40)" }}>
                {speaker.bio}
              </p>
              <div className="flex items-center gap-1.5">
                {speaker.links.slice(0,3).map(l => (
                  <span key={l.url} className="text-[9px] px-2 py-1 rounded-lg uppercase tracking-wider font-medium"
                    style={{ background:"rgba(200,218,248,0.04)", border:"1px solid rgba(200,218,248,0.07)", color:"rgba(135,158,205,0.38)" }}>
                    {l.type}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}