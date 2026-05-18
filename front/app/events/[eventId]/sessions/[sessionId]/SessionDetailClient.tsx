"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, MapPin, Users, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { BadgeLive } from "@/components/BadgeLive"
import { QuestionSection } from "@/components/QuestionSection"
import { isFavorite, addFavorite, removeFavorite } from "@/lib/mockApi"
import type { Session, Event } from "@/lib/types"

interface SessionDetailClientProps {
  sessionId: string
  eventId: string
}

export function SessionDetailClient({ sessionId, eventId }: SessionDetailClientProps) {
  const [session, setSession] = useState<Session | null>(null)
  const [event, setEvent] = useState<Event | null>(null)
  const [favorite, setFavorite] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        const [sessionRes, eventRes] = await Promise.all([
          fetch(`http://localhost:3001/api/sessions/${sessionId}`),
          fetch(`http://localhost:3001/api/events/${eventId}`)
        ])
        if (!sessionRes.ok) throw new Error("Failed to fetch session")
        if (!eventRes.ok) throw new Error("Failed to fetch event")
        const sessionData = await sessionRes.json()
        const eventData = await eventRes.json()
        setSession(sessionData)
        setEvent(eventData)
        setFavorite(isFavorite(sessionId))
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [sessionId, eventId])

  if (loading) return <p className="text-center py-10">Chargement de la session...</p>
  if (error) return <p className="text-center py-10 text-red-500">Erreur : {error}</p>
  if (!session || !event) return <p className="text-center py-10">Session introuvable</p>

  const startTime = new Date(session.startTime)
  const endTime = new Date(session.endTime)

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })

  const formatDate = (date: Date) =>
    date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(session.id)
    } else {
      addFavorite(session.id)
    }
    setFavorite(!favorite)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back button */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
        <Link
          href={`/events/${event.id}`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {event.title}</span>
        </Link>
      </motion.div>

      {/* Session header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            {session.isLive && (
              <div className="mb-3">
                <BadgeLive />
              </div>
            )}
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              {session.title}
            </h1>
          </div>
          <motion.button
            onClick={toggleFavorite}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-xl bg-card/60 border border-border/50 hover:border-primary/50 transition-all"
          >
            <Star
              className={`w-6 h-6 transition-colors ${
                favorite ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground hover:text-yellow-400"
              }`}
            />
          </motion.button>
        </div>

        {session.description && (
          <p className="text-lg text-muted-foreground mb-6">{session.description}</p>
        )}

        {/* Meta info */}
        <div className="flex flex-wrap gap-6 text-muted-foreground mb-8">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <span>{formatDate(startTime)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-secondary" />
            <span>{formatTime(startTime)} - {formatTime(endTime)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span>{session.room?.name}</span>
          </div>
          {session.capacity && (
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-secondary" />
              <span>{session.capacity} places</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Speakers */}
      {session.speakers?.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Speakers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {session.speakers.map((speaker) => (
              <Link key={speaker.id} href={`/speakers/${speaker.id}`} className="group">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 p-4 bg-card/60 border border-border/50 rounded-xl hover:border-primary/50 transition-all"
                >
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/30">
                    {speaker.photoUrl ? (
                      <Image src={speaker.photoUrl} alt={speaker.fullName} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-primary/20 flex items-center justify-center text-lg font-semibold text-primary">
                        {speaker.fullName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {speaker.fullName}
                    </p>
                    <p className="text-sm text-muted-foreground">View profile</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* Q&A Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <QuestionSection
          sessionId={session.id}
          initialQuestions={session.questions || []}
          isLive={session.isLive}
        />
      </motion.div>
    </div>
  )
}
