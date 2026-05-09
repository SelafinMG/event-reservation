"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Clock, MapPin, Star, Users } from "lucide-react"
import type { SessionSummary } from "@/lib/types"
import { BadgeLive } from "./BadgeLive"
import { useState, useEffect } from "react"
import { isFavorite, addFavorite, removeFavorite } from "@/lib/mockApi"

interface SessionCardProps {
  session: SessionSummary
  eventId: string
  index?: number
}

export function SessionCard({ session, eventId, index = 0 }: SessionCardProps) {
  const [favorite, setFavorite] = useState(false)

  useEffect(() => {
    setFavorite(isFavorite(session.id))
  }, [session.id])

  const startTime = new Date(session.startTime)
  const endTime = new Date(session.endTime)

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (favorite) {
      removeFavorite(session.id)
    } else {
      addFavorite(session.id)
    }
    setFavorite(!favorite)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Link href={`/events/${eventId}/sessions/${session.id}`}>
        <div className="relative bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-5 overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {/* Live badge & Title */}
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {session.isLive && <BadgeLive />}
                  </div>
                  <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {session.title}
                  </h4>
                </div>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>
                    {formatTime(startTime)} - {formatTime(endTime)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-secondary" />
                  <span>{session.room.name}</span>
                </div>
              </div>

              {/* Speakers */}
              {session.speakers.length > 0 && (
                <div className="mt-4 flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <div className="flex items-center -space-x-2">
                    {session.speakers.slice(0, 3).map((speaker) => (
                      <div
                        key={speaker.id}
                        className="relative w-7 h-7 rounded-full border-2 border-card overflow-hidden"
                      >
                        {speaker.photoUrl ? (
                          <Image
                            src={speaker.photoUrl}
                            alt={speaker.fullName}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-primary/30 flex items-center justify-center text-xs font-medium text-primary">
                            {speaker.fullName.charAt(0)}
                          </div>
                        )}
                      </div>
                    ))}
                    {session.speakers.length > 3 && (
                      <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground border-2 border-card">
                        +{session.speakers.length - 3}
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground truncate">
                    {session.speakers.map((s) => s.fullName).join(", ")}
                  </span>
                </div>
              )}
            </div>

            {/* Favorite button */}
            <motion.button
              onClick={toggleFavorite}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-muted/50 transition-colors"
            >
              <Star
                className={`w-5 h-5 transition-colors ${
                  favorite
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-muted-foreground hover:text-yellow-400"
                }`}
              />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
