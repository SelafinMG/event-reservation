"use client"

import { motion } from "framer-motion"
import { Calendar, Sparkles } from "lucide-react"
import type { Event } from "@/lib/types"
import { EventCardItem } from "@/components/EventCard"

interface EventsClientProps {
  events: Event[]
}

export function EventsClient({ events }: EventsClientProps) {
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
          <div className="p-3 rounded-2xl bg-primary/20">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
            Events
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Discover upcoming tech conferences and workshops. Join live sessions, 
          ask questions, and engage with speakers in real-time.
        </p>
      </motion.div>

      {/* Live events highlight */}
      {events.some((e) => e.sessions?.some((s) => s.isLive)) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3"
        >
          <Sparkles className="w-5 h-5 text-red-400 animate-pulse" />
          <span className="text-red-400 font-medium">
            Live sessions happening now! Join the conversation.
          </span>
        </motion.div>
      )}

      {/* Events grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <EventCardItem key={event.id} event={event} index={index} />
        ))}
      </div>

      {events.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
          <h2 className="text-xl font-semibold text-muted-foreground mb-2">
            No events scheduled
          </h2>
          <p className="text-muted-foreground">
            Check back later for upcoming events.
          </p>
        </motion.div>
      )}
    </div>
  )
}
