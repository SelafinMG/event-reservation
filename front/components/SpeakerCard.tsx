"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Globe, ArrowRight } from "lucide-react"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
import type { Speaker } from "@/lib/types"

interface SpeakerCardProps {
  speaker: Speaker
  index?: number
}

const socialIcons = {
  twitter: FaTwitter,
  linkedin: FaLinkedin,
  github: FaGithub,
  website: Globe,
  other: Globe,
}

export function SpeakerCard({ speaker, index = 0 }: SpeakerCardProps) {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/speakers/${speaker.id}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group cursor-pointer"
      onClick={handleCardClick}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleCardClick()}
    >
      <div className="relative bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative">
          {/* Photo */}
          <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-3 border-primary/30 group-hover:border-primary/60 transition-colors">
            {speaker.photoUrl ? (
              <Image
                src={speaker.photoUrl}
                alt={speaker.fullName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
                {speaker.fullName.charAt(0)}
              </div>
            )}
          </div>

          {/* Name */}
          <h3 className="text-lg font-bold text-foreground text-center mb-2 group-hover:text-primary transition-colors">
            {speaker.fullName}
          </h3>

          {/* Bio */}
          {speaker.bio && (
            <p className="text-sm text-muted-foreground text-center mb-4 line-clamp-2">
              {speaker.bio}
            </p>
          )}

          {/* Sessions count */}
          {speaker.sessions && speaker.sessions.length > 0 && (
            <p className="text-xs text-primary text-center mb-4">
              {speaker.sessions.length} session
              {speaker.sessions.length > 1 ? "s" : ""}
            </p>
          )}

          {/* Social links */}
          {speaker.links && speaker.links.length > 0 && (
            <div className="flex justify-center gap-2 mb-4">
              {speaker.links.slice(0, 4).map((link, i) => {
                const Icon = socialIcons[link.type] || Globe
                return (
                  <motion.a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                )
              })}
            </div>
          )}

          {/* CTA */}
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
            <span>View Profile</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
