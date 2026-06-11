"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Globe, Calendar } from "lucide-react"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
import Link from "next/link"
import Image from "next/image"
import type { Speaker } from "@/lib/types"
import { BadgeLive } from "@/components/BadgeLive"
import { getSpeaker } from "@/data/speakers"

interface SpeakerDetailClientProps {
  speakerId: string
}

const socialIcons = {
  twitter: FaTwitter,
  linkedin: FaLinkedin,
  github: FaGithub,
  website: Globe,
  other: Globe,
}

const socialLabels = {
  twitter: "Twitter",
  linkedin: "LinkedIn",
  github: "GitHub",
  website: "Website",
  other: "Link",
}

export function SpeakerDetailClient({ speakerId }: SpeakerDetailClientProps) {
  const [speaker, setSpeaker] = useState<Speaker | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadSpeaker() {
      try {
        const data = await getSpeaker(speakerId)
        setSpeaker(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadSpeaker()
  }, [speakerId])

  if (loading) return <p className="text-center py-10">Chargement du profil...</p>
  if (error) return <p className="text-center py-10 text-red-500">Erreur : {error}</p>
  if (!speaker) return <p className="text-center py-10">Intervenant introuvable</p>

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
        <Link
          href="/speakers"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to speakers</span>
        </Link>
      </motion.div>

      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-8 mb-8"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Photo */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-primary/30 shrink-0"
          >
            {speaker.photoUrl ? (
              <Image
                src={speaker.photoUrl}
                alt={speaker.fullName}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 160px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-primary/20 flex items-center justify-center text-4xl font-bold text-primary">
                {speaker.fullName.charAt(0)}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {speaker.fullName}
            </h1>
            {speaker.bio && (
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{speaker.bio}</p>
            )}

            {speaker.links && speaker.links.length > 0 && (
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {speaker.links.map((link, i) => {
                  const Icon = socialIcons[link.type] || Globe
                  return (
                    <motion.a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{socialLabels[link.type]}</span>
                    </motion.a>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Sessions */}
      {speaker.sessions && speaker.sessions.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Sessions ({speaker.sessions.length})
          </h2>
          <div className="space-y-4">
            {speaker.sessions.map((session, index) => {
              const startTime = new Date(session.startTime)
              const endTime = new Date(session.endTime)
              const sessionEventId = (session as any).eventId ?? "evt-001"

              return (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Link href={`/events/${sessionEventId}/sessions/${session.id}`} className="group block">
                    <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-5 hover:border-primary/50 transition-all">
                      {session.isLive && <div className="mb-2"><BadgeLive /></div>}
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {session.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span>
                          {startTime.toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                        </span>
                        <span>
                          {startTime.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                          {" - "}
                          {endTime.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        <span>{session.room.name}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}
    </div>
  )
}
