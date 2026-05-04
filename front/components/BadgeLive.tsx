"use client"

import { motion } from "framer-motion"

interface BadgeLiveProps {
  className?: string
}

export function BadgeLive({ className }: BadgeLiveProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-500/20 border border-red-500/30 rounded-full ${className}`}
    >
      <motion.span
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [1, 0.7, 1]
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-2 h-2 rounded-full bg-red-500"
      />
      <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">
        Live
      </span>
    </motion.div>
  )
}
