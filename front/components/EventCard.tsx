"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, Calendar, Users, ArrowRight } from "lucide-react"
import type { Event } from "@/lib/types"
import { BadgeLive } from "./BadgeLive"

interface EventCardItemProps {
  event: Event
  index?: number
}

export function EventCardItem({ event, index = 0 }: EventCardItemProps) {
  const startDate = new Date(event.startDate)
  const endDate = new Date(event.endDate)
  const hasLiveSession = event.sessions?.some(s => s.isLive) ?? false
  const sessionCount = event.sessions?.length ?? 0

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link href={`/events/${event.id}`}>
        <div className="relative bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Live badge */}
          {hasLiveSession && (
            <div className="absolute top-4 right-4">
              <BadgeLive />
            </div>
          )}

          <div className="relative">
            {/* Title */}
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              {event.title}
            </h3>

            {/* Description */}
            {event.description && (
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {event.description}
              </p>
            )}

            {/* Meta info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 text-primary" />
                <span>
                  {formatDate(startDate)} - {formatDate(endDate)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-secondary" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4 text-primary" />
                <span>{sessionCount} sessions</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
              <span>View Event</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
