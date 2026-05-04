import { notFound } from "next/navigation"
import { getSessionById, getEventById } from "@/lib/mockApi"
import { SessionDetailClient } from "./session-detail-client"

interface SessionDetailPageProps {
  params: Promise<{ eventId: string; sessionId: string }>
}

export default async function SessionDetailPage({ params }: SessionDetailPageProps) {
  const { eventId, sessionId } = await params
  
  const [session, event] = await Promise.all([
    getSessionById(sessionId),
    getEventById(eventId)
  ])

  if (!session || !event) {
    notFound()
  }

  return <SessionDetailClient session={session} event={event} />
}
