import type { Event, SessionSummary, Session, Speaker, Question, Room } from "@/lib/types"

// Simule une API avec des données en mémoire
import eventsData from '@/data/events.json'
import sessionsData from '@/data/sessions.json'
import speakersData from '@/data/speakers.json'
import questionsData from '@/data/questions.json'
import roomsData from '@/data/rooms.json'

// Simule un délai réseau
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Vérifie si une session est live
function isSessionLive(startTime: string, endTime: string): boolean {
  const now = new Date()
  const start = new Date(startTime)
  const end = new Date(endTime)
  return now >= start && now <= end
}

// Récupère une room par ID
function getRoomById(roomId: string): Room {
  const room = roomsData.find(r => r.id === roomId)
  return room || { id: roomId, name: 'Unknown Room' }
}

// Récupère les speakers par leurs IDs
function getSpeakerSummariesByIds(speakerIds: string[]): SpeakerSummary[] {
  return speakerIds.map(id => {
    const speaker = speakersData.find(s => s.id === id)
    return speaker 
      ? { id: speaker.id, fullName: speaker.fullName, photoUrl: speaker.photoUrl }
      : { id, fullName: 'Unknown Speaker' }
  })
}

// Transforme les données brutes de session en SessionSummary
function toSessionSummary(sessionRaw: typeof sessionsData[0]): SessionSummary {
  return {
    id: sessionRaw.id,
    title: sessionRaw.title,
    startTime: sessionRaw.startTime,
    endTime: sessionRaw.endTime,
    room: getRoomById(sessionRaw.roomId),
    isLive: isSessionLive(sessionRaw.startTime, sessionRaw.endTime),
    speakers: getSpeakerSummariesByIds(sessionRaw.speakerIds)
  }
}

// Transforme les données brutes de session en Session complète
function toSession(sessionRaw: typeof sessionsData[0]): Session {
  const sessionQuestions = questionsData
    .filter(q => q.sessionId === sessionRaw.id)
    .sort((a, b) => b.upvotes - a.upvotes)

  return {
    id: sessionRaw.id,
    eventId: sessionRaw.eventId,
    title: sessionRaw.title,
    description: sessionRaw.description,
    startTime: sessionRaw.startTime,
    endTime: sessionRaw.endTime,
    room: getRoomById(sessionRaw.roomId),
    capacity: sessionRaw.capacity,
    isLive: isSessionLive(sessionRaw.startTime, sessionRaw.endTime),
    speakers: getSpeakerSummariesByIds(sessionRaw.speakerIds),
    questions: sessionQuestions
  }
}

// ═══════════════════════════════════════════════════════════════
// API EVENTS
// ═══════════════════════════════════════════════════════════════

export async function getEvents(): Promise<Event[]> {
  await delay(100)
  return eventsData.map(event => ({
    ...event,
    sessions: sessionsData
      .filter(s => s.eventId === event.id)
      .map(toSessionSummary)
  }))
}

export async function getEventById(eventId: string): Promise<Event | null> {
  await delay(100)
  const event = eventsData.find(e => e.id === eventId)
  if (!event) return null
  
  return {
    ...event,
    sessions: sessionsData
      .filter(s => s.eventId === eventId)
      .map(toSessionSummary)
  }
}

// ═══════════════════════════════════════════════════════════════
// API SESSIONS
// ═══════════════════════════════════════════════════════════════

export async function getSessionsByEventId(
  eventId: string, 
  options?: { roomId?: string; live?: boolean }
): Promise<SessionSummary[]> {
  await delay(100)
  let sessions = sessionsData.filter(s => s.eventId === eventId)
  
  if (options?.roomId) {
    sessions = sessions.filter(s => s.roomId === options.roomId)
  }
  
  const summaries = sessions.map(toSessionSummary)
  
  if (options?.live) {
    return summaries.filter(s => s.isLive)
  }
  
  return summaries
}

export async function getSessionById(sessionId: string): Promise<Session | null> {
  await delay(100)
  const session = sessionsData.find(s => s.id === sessionId)
  if (!session) return null
  return toSession(session)
}

// ═══════════════════════════════════════════════════════════════
// API SPEAKERS
// ═══════════════════════════════════════════════════════════════

export async function getSpeakers(): Promise<Speaker[]> {
  await delay(100)
  return speakersData.map(speaker => ({
    ...speaker,
    links: speaker.links as Speaker['links'],
    sessions: sessionsData
      .filter(s => s.speakerIds.includes(speaker.id))
      .map(toSessionSummary)
  }))
}

export async function getSpeakerById(speakerId: string): Promise<Speaker | null> {
  await delay(100)
  const speaker = speakersData.find(s => s.id === speakerId)
  if (!speaker) return null
  
  return {
    ...speaker,
    links: speaker.links as Speaker['links'],
    sessions: sessionsData
      .filter(s => s.speakerIds.includes(speakerId))
      .map(toSessionSummary)
  }
}

// ═══════════════════════════════════════════════════════════════
// API QUESTIONS
// ═══════════════════════════════════════════════════════════════

export async function getQuestionsBySessionId(sessionId: string): Promise<Question[]> {
  await delay(100)
  return questionsData
    .filter(q => q.sessionId === sessionId)
    .sort((a, b) => b.upvotes - a.upvotes)
}

// Variable pour stocker les nouvelles questions (en mémoire)
let localQuestions = [...questionsData]

export async function addQuestion(
  sessionId: string, 
  input: { content: string; authorName?: string | null }
): Promise<Question | { error: string }> {
  await delay(200)
  
  const session = sessionsData.find(s => s.id === sessionId)
  if (!session) {
    return { error: 'Session not found' }
  }
  
  // Vérifier si la session est live (commenté pour la démo)
  // if (!isSessionLive(session.startTime, session.endTime)) {
  //   return { error: 'SESSION_NOT_LIVE' }
  // }
  
  const newQuestion: Question = {
    id: `q-${Date.now()}`,
    sessionId,
    content: input.content,
    authorName: input.authorName || null,
    upvotes: 0,
    createdAt: new Date().toISOString()
  }
  
  localQuestions.push(newQuestion)
  return newQuestion
}

export async function upvoteQuestion(
  sessionId: string, 
  questionId: string
): Promise<Question | { error: string }> {
  await delay(100)
  
  const questionIndex = localQuestions.findIndex(
    q => q.id === questionId && q.sessionId === sessionId
  )
  
  if (questionIndex === -1) {
    return { error: 'Question not found' }
  }
  
  localQuestions[questionIndex] = {
    ...localQuestions[questionIndex],
    upvotes: localQuestions[questionIndex].upvotes + 1
  }
  
  return localQuestions[questionIndex]
}

// ═══════════════════════════════════════════════════════════════
// API ROOMS
// ═══════════════════════════════════════════════════════════════

export async function getRoomsByEventId(eventId: string): Promise<Room[]> {
  await delay(100)
  // Pour la démo, retourner toutes les rooms
  return roomsData
}

// ═══════════════════════════════════════════════════════════════
// FAVORIS (localStorage côté client)
// ═══════════════════════════════════════════════════════════════

export function getFavorites(): string[] {
  if (typeof window === 'undefined') return []
  const favorites = localStorage.getItem('eventsync-favorites')
  return favorites ? JSON.parse(favorites) : []
}

export function addFavorite(sessionId: string): void {
  const favorites = getFavorites()
  if (!favorites.includes(sessionId)) {
    favorites.push(sessionId)
    localStorage.setItem('eventsync-favorites', JSON.stringify(favorites))
  }
}

export function removeFavorite(sessionId: string): void {
  const favorites = getFavorites().filter(id => id !== sessionId)
  localStorage.setItem('eventsync-favorites', JSON.stringify(favorites))
}

export function isFavorite(sessionId: string): boolean {
  return getFavorites().includes(sessionId)
}

export async function getFavoriteSessions(): Promise<Session[]> {
  const favoriteIds = getFavorites()
  const sessions = await Promise.all(
    favoriteIds.map(id => getSessionById(id))
  )
  return sessions.filter((s): s is Session => s !== null)
}
