import { getSpeakers } from "@/lib/mockApi"
import { SpeakersClient } from "./SpeakersClient"

export default async function SpeakersPage() {
  const speakers = await getSpeakers()

  return <SpeakersClient speakers={speakers} />
}
