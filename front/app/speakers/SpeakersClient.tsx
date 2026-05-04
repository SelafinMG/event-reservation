"use client"

import { motion } from "framer-motion"
import { Users } from "lucide-react"
import type { Speaker } from "@/lib/types"
import { SpeakerCard } from "@/components/SpeakerCard"

interface SpeakersClientProps {
  speakers: Speaker[]
}

export function SpeakersClient({ speakers }: SpeakersClientProps) {
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
          <div className="p-3 rounded-2xl bg-secondary/20">
            <Users className="w-6 h-6 text-secondary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
            Speakers
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Meet our incredible lineup of speakers. Industry experts sharing 
          their knowledge and insights.
        </p>
      </motion.div>

      {/* Speakers grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {speakers.map((speaker, index) => (
          <SpeakerCard key={speaker.id} speaker={speaker} index={index} />
        ))}
      </div>

      {speakers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
          <h2 className="text-xl font-semibold text-muted-foreground mb-2">
            No speakers yet
          </h2>
          <p className="text-muted-foreground">
            Check back later for our speaker lineup.
          </p>
        </motion.div>
      )}
    </div>
  )
}
