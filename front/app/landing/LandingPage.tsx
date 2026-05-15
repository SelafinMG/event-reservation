"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight, Zap, Users, MessageSquare, BarChart3 } from "lucide-react"

// ── Stat card ─────────────────────────────────────────────────────────────
function StatCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl overflow-hidden w-full sm:w-56"
      style={{
        background: "linear-gradient(145deg, #1a2a4a 0%, #0f1a32 60%, #0a1220 100%)",
        border: "1px solid rgba(37,99,235,0.35)",
        boxShadow: "0 0 60px rgba(37,99,235,0.2), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.8), transparent)" }}
      />
      <div
        className="absolute -top-8 -right-8 w-28 h-28 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)" }}
      />
      <div className="relative p-5">
        <div
          className="text-6xl font-black text-white tracking-tighter leading-none mb-1"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          500<span className="text-2xl text-blue-400">+</span>
        </div>
        <div className="text-xs font-medium text-blue-300/70 uppercase tracking-widest mt-2">
          Live Attendees
        </div>
        <div className="mt-4 h-1 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #2563eb, #0ea5e9)" }}
            initial={{ width: 0 }}
            animate={{ width: "78%" }}
            transition={{ delay: 1.4, duration: 1, ease: "easeOut" }}
          />
        </div>
        <div className="mt-1.5 flex justify-between text-[10px] text-blue-300/40">
          <span>0</span>
          <span>78% capacity</span>
        </div>
      </div>
    </motion.div>
  )
}

// ── Feature chip ──────────────────────────────────────────────────────────
function FeatureChip({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.09)",
        color: "rgba(255,255,255,0.55)",
      }}
    >
      <Icon className="w-3.5 h-3.5 text-blue-400" />
      {label}
    </div>
  )
}
// ── Blob ──────────────────────────────────────────────────────────────────
function Blob({ style, delay = 0 }: { style: React.CSSProperties; delay?: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ filter: "blur(80px)", maxWidth: "500px", maxHeight: "500px", ...style }}
      animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0], scale: [1, 1.05, 0.97, 1] }}
      transition={{ duration: 18, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  )
}

// ── Landing page ──────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div
      className="relative overflow-hidden min-h-screen w-full"
      style={{ background: "#070709", fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Blobs */}
      <Blob
        style={{
          top: "-10%", left: "-8%", width: "55vw", height: "55vw",
          background: "radial-gradient(circle at 40% 40%, rgba(29,78,216,0.55), rgba(37,99,235,0.2) 50%, transparent 70%)"
        }}
        delay={0}
      />
      <Blob
        style={{
          bottom: "-5%", right: "-5%", width: "45vw", height: "45vw",
          background: "radial-gradient(circle at 55% 55%, rgba(16,185,129,0.35), rgba(5,150,105,0.15) 50%, transparent 70%)"
        }}
        delay={-8}
      />
      <Blob
        style={{
          top: "20%", right: "-8%", width: "38vw", height: "38vw",
          background: "radial-gradient(circle, rgba(30,58,138,0.45), transparent 70%)"
        }}
        delay={-4}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.5, zIndex: 1,
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Hero */}
        <div className="flex-1 flex flex-col lg:flex-row flex-wrap items-center max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16 py-16 lg:py-0 gap-16 lg:gap-24">

          {/* Left — text */}
          <div className="flex-1 flex flex-col justify-center text-center lg:text-left">

            {/* Live pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex mb-8 self-center lg:self-start"
            >
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)" }}
              >
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-semibold text-red-400 uppercase tracking-widest">
                  Sessions Live Now
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <div className="overflow-hidden mb-3">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-white font-extrabold leading-[0.9] tracking-[-0.04em]"
                style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(48px, 8vw, 100px)" }}
              >
                Engage
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-3">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.42, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-extrabold leading-[0.9] tracking-[-0.04em]"
                style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(48px, 8vw, 100px)", color: "rgba(255,255,255,0.25)" }}
              >
                Audiences
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-10">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.54, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-white font-extrabold leading-[0.9] tracking-[-0.04em]"
                style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(48px, 8vw, 100px)" }}
              >
                Live.
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-base md:text-lg font-light max-w-md mx-auto lg:mx-0 mb-10 leading-relaxed"
              style={{ color: "rgba(255,255,255,0.42)" }}
            >
              Replace static programmes with a dynamic real-time platform.
              Q&A, live badges, session planning — all in one place.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start items-center gap-4 mb-10"
            >
              <Link
                href="/events"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-medium text-white text-sm"
                style={{
                  background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
                  boxShadow: "0 0 32px rgba(37,99,235,0.45)",
                  letterSpacing: "0.01em",
                }}
              >
                <Zap className="w-4 h-4 fill-white" />
                Browse Events
              </Link>
              <Link
                href="/speakers"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-medium text-sm transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                Meet Speakers
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Feature chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3"
            >
              <FeatureChip icon={Zap} label="Live session detection" />
              <FeatureChip icon={MessageSquare} label="Real-time Q&A" />
              <FeatureChip icon={Users} label="Speaker profiles" />
              <FeatureChip icon={BarChart3} label="Multi-track planning" />
            </motion.div>
          </div>
          {/* Right — stat card + tagline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex flex-col gap-8 flex-shrink-0"
          >
            {/* Tagline */}
            <p
              className="text-base font-medium leading-relaxed max-w-[200px]"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Engage your audience.<br />
              Manage sessions.<br />
              Go live instantly.
            </p>

            <StatCard />

            <Link
              href="/events"
              className="inline-flex items-center gap-2 font-medium transition-all duration-200 hover:gap-3"
              style={{ color: "rgba(96,165,250,0.85)", fontSize: "14px" }}
            >
              Explore Events
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Bottom stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16 py-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex flex-wrap justify-center lg:justify-start gap-10">
            {[
              { value: "2",  label: "Events scheduled" },
              { value: "6+", label: "Sessions planned" },
              { value: "5",  label: "Expert speakers" },
              { value: "∞",  label: "Questions possible" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center lg:text-left">
                <div
                  className="text-2xl font-bold text-white mb-0.5"
                  style={{ fontFamily: "Syne, sans-serif", letterSpacing: "-0.03em" }}
                >
                  {value}
                </div>
                <div className="text-xs font-light" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
