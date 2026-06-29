"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, MapPin, Users, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { BadgeLive } from "@/components/BadgeLive"
import QuestionSection from "@/components/QuestionSection"
import type { Session, Event } from "@/lib/types"
import { useState, useEffect } from "react"
import { isFavorite, addFavorite, removeFavorite } from "@/lib/mockApi"

interface SessionDetailClientProps {
  session: Session
  event: Event
}

export function SessionDetailClient({ session, event }: SessionDetailClientProps) {
  const [favorite, setFavorite] = useState(false)

  useEffect(() => {
    setFavorite(isFavorite(session.id))
  }, [session.id])

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
    window.dispatchEvent(new Event("fav-change"))
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
            {session.isLive && <BadgeLive />}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {session.speakers.map((speaker) => (
            <Link key={speaker.id} href={`/speakers/${speaker.id}`} className="group">
              <div className="flex items-center gap-4 p-4 bg-card/60 border border-border/50 rounded-xl hover:border-primary/50 transition-all">
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
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Q&A Section */}
      <QuestionSection
        sessionId={session.id}
        initialQuestions={session.questions || []}
        isLive={session.isLive}
        startTime={session.startTime}
        endTime={session.endTime}
      />
    </div>
  )
}
