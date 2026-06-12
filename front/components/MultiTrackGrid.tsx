"use client";

import React from "react";
import type { SessionSummary } from "@/lib/mockApi";
import SessionCard from "./SessionCard";

interface MultiTrackGridProps {
  sessions: SessionSummary[];
  eventId: string;
}

function formatTime(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }).replace(":", "h");
}

export default function MultiTrackGrid({ sessions, eventId }: MultiTrackGridProps) {
  // Sort sessions by start time
  const sortedSessions = [...sessions].sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  
  // Extract unique rooms for these sessions
  const roomsMap = new Map<string, SessionSummary['room']>();
  sortedSessions.forEach(s => roomsMap.set(s.room.id, s.room));
  const rooms = Array.from(roomsMap.values());

  // Extract unique time slots
  const timeSlots = Array.from(new Set(sortedSessions.map(s => s.startTime))).sort();

  return (
    <div className="overflow-x-auto w-full pb-6 custom-scrollbar">
      <div className="min-w-[600px] flex flex-col" style={{ minWidth: `${Math.max(600, rooms.length * 250)}px` }}>
        {/* Header: Rooms */}
        <div className="flex mb-4 gap-4">
          <div className="w-16 flex-shrink-0" /> {/* Time column header placeholder */}
          {rooms.map(room => (
            <div key={room.id} className="flex-1 px-4 py-2 rounded-lg text-center text-[11px] font-mono tracking-wider uppercase" 
                 style={{ 
                   background: "rgba(200,218,248,0.03)", 
                   border: "1px solid rgba(200,218,248,0.08)",
                   color: "rgba(170,190,230,0.6)" 
                 }}>
              {room.name}
            </div>
          ))}
        </div>
        
        {/* Rows: Time slots */}
        <div className="flex flex-col gap-4 relative">
          {timeSlots.map(time => {
            const sessionsAtTime = sortedSessions.filter(s => s.startTime === time);
            return (
              <div key={time} className="flex gap-4 relative">
                {/* Time label */}
                <div className="w-16 flex-shrink-0 text-[12px] font-mono pt-4 text-right pr-3" 
                     style={{ color: "rgba(150,170,210,0.5)" }}>
                  {formatTime(time)}
                </div>
                
                {/* Track columns */}
                {rooms.map(room => {
                  const session = sessionsAtTime.find(s => s.room.id === room.id);
                  return (
                    <div key={room.id} className="flex-1">
                      {session ? (
                        <div className="h-full">
                          <SessionCard session={session} eventId={eventId} />
                        </div>
                      ) : (
                        <div className="h-full w-full rounded-xl border border-dashed" 
                             style={{ 
                               borderColor: "rgba(200,218,248,0.05)",
                               background: "rgba(200,218,248,0.01)" 
                             }} />
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
