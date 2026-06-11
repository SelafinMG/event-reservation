"use client"

import { useEffect, useState, useMemo } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { SessionCard } from "@/components/SessionCard"
import { cn } from "@/lib/utils"
import type { Event } from "@/lib/types"
import { getEvent } from "@/data/events"

interface EventDetailClientProps {
  eventId: string
}

export function EventDetailClient({ eventId }: EventDetailClientProps) {
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDay, setSelectedDay] = useState("")

  useEffect(() => {
    async function loadEvent() {
      try {
        const data = await getEvent(eventId)
        setEvent(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadEvent()
  }, [eventId])
  useEffect(() => {
    if (event?.sessions && event.sessions.length > 0) {
      const firstDay = new Date(event.sessions[0].startTime).toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
      setSelectedDay(firstDay)
    }
  }, [event])

  const sessionsByDay = useMemo(() => {
    if (!event?.sessions) return {}
    const grouped: Record<string, typeof event.sessions> = {}
    event.sessions.forEach((session) => {
      const day = new Date(session.startTime).toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
      if (!grouped[day]) grouped[day] = []
      grouped[day].push(session)
    })
    Object.keys(grouped).forEach((day) => {
      grouped[day].sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      )
    })
    return grouped
  }, [event])

  const days = Object.keys(sessionsByDay)

  const formatDate = (date: Date) =>
    date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })

  if (loading) {
    return <p className="text-center py-10">Chargement de l’événement...</p>
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">Erreur : {error}</p>
  }

  if (!event) {
    return (
      <div className="text-center py-20">
        <Calendar className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
        <p className="text-muted-foreground">Événement introuvable</p>
      </div>
    )
  }

  const startDate = new Date(event.startDate)
  const endDate = new Date(event.endDate)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back button */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
        <Link href="/events" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to events</span>
        </Link>
      </motion.div>

      {/* Event header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">{event.title}</h1>
        {event.description && <p className="text-lg text-muted-foreground mb-6 max-w-3xl">{event.description}</p>}
        <div className="flex flex-wrap gap-6 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <span>{formatDate(startDate)} - {formatDate(endDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-secondary" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <span>{event.sessions?.length || 0} sessions</span>
          </div>
        </div>
      </motion.div>

      {/* Day tabs */}
      {days.length > 1 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                selectedDay === day ? "bg-primary text-primary-foreground" : "bg-card/60 text-muted-foreground hover:text-foreground hover:bg-card"
              )}
            >
              {day}
            </button>
          ))}
        </motion.div>
      )}

      {/* Sessions list */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="space-y-4">
        {sessionsByDay[selectedDay]?.map((session, index) => (
          <SessionCard key={session.id} session={session} eventId={event.id} index={index} />
        ))}

        {(!event.sessions || event.sessions.length === 0) && (
          <div className="text-center py-16">
            <Calendar className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
            <p className="text-muted-foreground">No sessions scheduled for this event yet.</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
