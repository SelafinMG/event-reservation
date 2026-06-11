import api from "@/lib/api"
import type { Event } from "@/lib/types"

export async function getEvents() {
  const { data } = await api.get<Event[]>("/v1/events")
  return data
}

export async function getEvent(eventId: string) {
  const { data } = await api.get<Event>(`/v1/events/${eventId}`)
  return data
}
