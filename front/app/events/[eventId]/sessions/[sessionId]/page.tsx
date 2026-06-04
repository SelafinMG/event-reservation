import { notFound } from "next/navigation"
import { SessionDetailClient } from "./SessionDetailClient"

interface SessionDetailPageProps {
  params: Promise<{ eventId: string; sessionId: string }>
}

export default async function SessionDetailPage({ params }: SessionDetailPageProps) {
  // ⚡ Ici on attend la Promise
  const { eventId, sessionId } = await params

  const [sessionRes, eventRes] = await Promise.all([
    fetch(`http://localhost:3001/v1/sessions/${sessionId}`, { cache: "no-store" }),
    fetch(`http://localhost:3001/v1/events/${eventId}`, { cache: "no-store" })
  ])

  if (!sessionRes.ok || !eventRes.ok) {
    notFound()
  }

  const [session, event] = await Promise.all([
    sessionRes.json(),
    eventRes.json()
  ])

  return <SessionDetailClient session={session} event={event} />
}
