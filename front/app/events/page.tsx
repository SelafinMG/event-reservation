import { getEvents } from "@/lib/mockApi"
import { EventsClient } from "./EventsClient"

export default async function EventsPage() {
  const events = await getEvents()

  const Client: any = EventsClient
  return <Client events={events} />
}
