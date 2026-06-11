import api from "@/lib/api"
import type { Speaker } from "@/lib/types"

export async function getSpeakers() {
  const { data } = await api.get<Speaker[]>("/v1/speakers")
  return data
}

export async function getSpeaker(speakerId: string) {
  const { data } = await api.get<Speaker>(`/v1/speakers/${speakerId}`)
  return data
}
