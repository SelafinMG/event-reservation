import api from "@/lib/api"
import type { Session } from "@/lib/types"

export async function getSession(sessionId: string) {
  const { data } = await api.get<Session>(`/v1/sessions/${sessionId}`)
  return data
}

export async function getFavoriteSessions() {
  const { data } = await api.get<Session[]>("/v1/favorites/sessions")
  return data
}
