import { notFound } from "next/navigation"
import { getEventById } from "@/lib/mockApi"
import { EventDetailClient } from "./EventsDetailClient"

interface EventDetailPageProps {
  params: Promise<{ eventId: string }>
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { eventId } = await params
  const event = await getEventById(eventId)

  if (!event) {
    notFound()
  }

  return <EventDetailClient event={event} />
}
