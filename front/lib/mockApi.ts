/**
 * EventSync — Mock API Layer
 * Simule les appels API de la spec OAS3.
 * À remplacer par de vrais fetch() vers https://api.eventsync.io/v1
 */

import events from "@/data/events.json";
import sessions from "@/data/sessions.json";
import speakers from "@/data/speakers.json";
import questions from "@/data/questions.json";

// ── Types ─────────────────────────────────────────────────────────────────

export interface Room {
  id: string;
  name: string;
}

export interface SpeakerSummary {
  id: string;
  fullName: string;
  photoUrl: string | null;
}

export interface Speaker extends SpeakerSummary {
  bio: string;
  links: { type: string; url: string }[];
  sessions: SessionSummary[];
}

export interface SessionSummary {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  room: Room;
  isLive: boolean;
  speakers: SpeakerSummary[];
}

export interface Session extends SessionSummary {
  eventId: string;
  description: string;
  capacity: number;
  questions: Question[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  sessions: SessionSummary[];
}

export interface Question {
  id: string;
  sessionId: string;
  content: string;
  authorName: string | null;
  upvotes: number;
  createdAt: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────

/**
 * Calcule isLive côté client à partir de la date locale.
 * En production, ce flag vient du serveur.
 * Pour tester : modifiez startTime/endTime dans sessions.json
 * à ±30 minutes autour de now.
 */
export function computeIsLive(startTime: string, endTime: string): boolean {
  const now = new Date();
  return new Date(startTime) <= now && now <= new Date(endTime);
}

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });
}

// ── Mock API ──────────────────────────────────────────────────────────────

/** GET /events */
export function getEvents(): Event[] {
  return (events as Event[]).map((evt) => ({
    ...evt,
    sessions: evt.sessions.map((s) => ({
      ...s,
      isLive: computeIsLive(s.startTime, s.endTime),
    })),
  }));
}

/** GET /events/:id */
export function getEvent(id: string): Event | null {
  const evt = (events as Event[]).find((e) => e.id === id);
  if (!evt) return null;
  return {
    ...evt,
    sessions: evt.sessions.map((s) => ({
      ...s,
      isLive: computeIsLive(s.startTime, s.endTime),
    })),
  };
}

/** GET /events/:eventId/sessions */
export function getEventSessions(
  eventId: string,
  roomId?: string
): SessionSummary[] {
  let list = (sessions as unknown as Session[]).filter((s) => s.eventId === eventId);
  if (roomId) list = list.filter((s) => s.room.id === roomId);
  return list.map((s) => ({ ...s, isLive: computeIsLive(s.startTime, s.endTime) }));
}

/** GET /sessions/:id */
export function getSession(id: string): Session | null {
  const s = (sessions as unknown as Session[]).find((s) => s.id === id);
  if (!s) return null;
  const sessionQuestions = (questions as Question[])
    .filter((q) => q.sessionId === id)
    .sort((a, b) => b.upvotes - a.upvotes);
  return {
    ...s,
    isLive: computeIsLive(s.startTime, s.endTime),
    questions: sessionQuestions,
  };
}

/** GET /speakers */
export function getSpeakers(): Speaker[] {
  return speakers as Speaker[];
}

/** GET /speakers/:id */
export function getSpeaker(id: string): Speaker | null {
  return (speakers as Speaker[]).find((s) => s.id === id) ?? null;
}

/** GET /sessions/:sessionId/questions */
export function getSessionQuestions(sessionId: string): Question[] {
  return (questions as Question[])
    .filter((q) => q.sessionId === sessionId)
    .sort((a, b) => b.upvotes - a.upvotes);
}