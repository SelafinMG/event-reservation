"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Star, Calendar } from "lucide-react"
import type { Session } from "@/lib/types"
import { SessionCard } from "@/components/SessionCard"
import { getFavoriteSessions } from "@/data/sessions"

export default function FavoritesPage() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadFavorites() {
      try {
        const favSessions = await getFavoriteSessions()
        setSessions(favSessions)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadFavorites()
  }, [])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
          />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <p className="text-red-500">Error : {error}</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-yellow-500/20">
            <Star className="w-6 h-6 text-yellow-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
            Favorites
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Your saved sessions. Quick access to the talks you don&apos;t want to miss.
        </p>
      </motion.div>

      {/* Sessions list */}
      {sessions.length > 0 ? (
        <div className="space-y-4">
          {sessions.map((session, index) => (
            <SessionCard
              key={session.id}
              session={session}
              eventId={session.eventId}
              index={index}
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <Star className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
          <h2 className="text-xl font-semibold text-muted-foreground mb-2">
            No favorites yet
          </h2>
          <p className="text-muted-foreground mb-6">
            Start exploring sessions and save your favorites by clicking the star icon.
          </p>
          <motion.a
            href="/events"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            Browse Events
          </motion.a>
        </motion.div>
      )}
    </div>
  )
}
