// Types basés sur l'API OAS3 EventSync

export interface Event {
  id: string
  title: string
  description?: string
  startDate: string
  endDate: string
  location: string
  sessions?: SessionSummary[]
}

export interface EventInput {
  title: string
  description?: string
  startDate: string
  endDate: string
  location: string
}

export interface Session {
  id: string
  eventId: string
  title: string
  description?: string
  startTime: string
  endTime: string
  room: Room
  capacity?: number
  isLive?: boolean
  speakers: SpeakerSummary[]
  questions?: Question[]
}

export interface SessionSummary {
  id: string
  title: string
  startTime: string
  endTime: string
  room: Room
  isLive?: boolean
  speakers: SpeakerSummary[]
}

export interface SessionInput {
  eventId: string
  title: string
  description?: string
  startTime: string
  endTime: string
  roomId: string
  capacity?: number
  speakerIds: string[]
}

export interface Speaker {
  id: string
  fullName: string
  photoUrl?: string
  bio?: string
  links?: SocialLink[]
  sessions?: SessionSummary[]
}

export interface SpeakerSummary {
  id: string
  fullName: string
  photoUrl?: string
}

export interface SpeakerInput {
  fullName: string
  photoUrl?: string
  bio?: string
  links?: SocialLink[]
}

export interface SocialLink {
  type: 'twitter' | 'linkedin' | 'github' | 'website' | 'other'
  url: string
}

export interface Room {
  id: string
  name: string
}

export interface RoomInput {
  name: string
}

export interface Question {
  id: string
  sessionId: string
  content: string
  authorName?: string | null
  upvotes: number
  createdAt: string
}

export interface QuestionInput {
  content: string
  authorName?: string | null
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  expiresAt: string
}

export interface ApiError {
  code: string
  message: string
}
