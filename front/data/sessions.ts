import api from "@/lib/api"
import type { Session } from "@/lib/types"

export async function getSession(sessionId: string) {
  const { data } = await api.get<Session>(`/v1/sessions/${sessionId}`, {
    headers: { 'Cache-Control': 'no-store' },
  })
  return data
}

export async function getFavoriteSessions(): Promise<Session[]> {
  if (typeof window === "undefined") return []
  const favoritesStr = localStorage.getItem("eventsync-favorites")
  if (!favoritesStr) return []
  
  try {
    const favoriteIds: string[] = JSON.parse(favoritesStr)
    if (!Array.isArray(favoriteIds)) return []
    
    const sessions = await Promise.all(
      favoriteIds.map(async (id) => {
        try {
          return await getSession(id)
        } catch (err) {
          console.error(`Error fetching favorite session with id ${id}:`, err)
          return null
        }
      })
    )
    return sessions.filter((s): s is Session => s !== null)
  } catch (e) {
    console.error("Error parsing favorites from localStorage:", e)
    return []
  }
}
