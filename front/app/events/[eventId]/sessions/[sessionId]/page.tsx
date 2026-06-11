import { notFound } from "next/navigation"
import { SessionDetailClient } from "./SessionDetailClient"
import { getEvent } from "@/data/events"
import { getSession } from "@/data/sessions"

interface SessionDetailPageProps {
  params: Promise<{ eventId: string; sessionId: string }>
}

export default async function SessionDetailPage({ params }: SessionDetailPageProps) {
  // ⚡ Ici on attend la Promise
  const { eventId, sessionId } = await params

  let session
  let event

  try {
    ;[session, event] = await Promise.all([
      getSession(sessionId),
      getEvent(eventId)
    ])
  } catch {
    notFound()
  }

  return <SessionDetailClient session={session} event={event} />
}
