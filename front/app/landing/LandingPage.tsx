"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight, Zap, Users, MessageSquare, BarChart3 } from "lucide-react"

// ── Floating stat card (left panel, like Soni's "30 days" card) ──────────
function StatCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-52 rounded-3xl overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #1a2a4a 0%, #0f1a32 60%, #0a1220 100%)",
        border: "1px solid rgba(37,99,235,0.35)",
        boxShadow: "0 0 60px rgba(37,99,235,0.2), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* Top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.8), transparent)" }}
      />
      {/* Inner blue circle bg */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)" }}
      />

      <div className="relative p-6">
        <div className="text-7xl font-black text-white tracking-tighter leading-none mb-1" style={{ fontFamily: "Syne, sans-serif" }}>
          500
          <span className="text-3xl text-blue-400">+</span>
        </div>
        <div className="text-sm font-medium text-blue-300/70 uppercase tracking-widest mt-2">
          Live Attendees
        </div>

        {/* Mini progress bar */}
        <div className="mt-4 h-1 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #2563eb, #0ea5e9)" }}
            initial={{ width: 0 }}
            animate={{ width: "78%" }}
            transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
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

// ── Mini feature chip ─────────────────────────────────────────────────────
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

// ── Animated blob ─────────────────────────────────────────────────────────
function Blob({ style, delay = 0 }: { style: React.CSSProperties; delay?: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ filter: "blur(80px)", ...style }}
      animate={{
        x: [0, 20, -10, 0],
        y: [0, -15, 10, 0],
        scale: [1, 1.05, 0.97, 1],
      }}
      transition={{
        duration: 18,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}

// ── Main landing page ─────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ background: "#070709", fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Background blobs ── */}
      <Blob
        style={{
          top: "-10%", left: "-8%",
          width: "55vw", height: "55vw",
          background: "radial-gradient(circle at 40% 40%, rgba(29,78,216,0.55), rgba(37,99,235,0.2) 50%, transparent 70%)",
        }}
        delay={0}
      />
      <Blob
        style={{
          bottom: "-5%", right: "-5%",
          width: "45vw", height: "45vw",
          background: "radial-gradient(circle at 55% 55%, rgba(16,185,129,0.35), rgba(5,150,105,0.15) 50%, transparent 70%)",
        }}
        delay={-8}
      />
      <Blob
        style={{
          top: "20%", right: "-8%",
          width: "38vw", height: "38vw",
          background: "radial-gradient(circle, rgba(30,58,138,0.45), transparent 70%)",
        }}
        delay={-4}
      />

      {/* ── Grain overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.5,
          zIndex: 1,
        }}
      />

      {/* ── Split layout ── */}
      <div className="relative z-10 flex min-h-screen">

        {/* LEFT PANEL — like Soni's left sidebar */}
        <div
          className="hidden lg:flex flex-col justify-between px-10 py-12 w-[340px] flex-shrink-0"
          style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
                boxShadow: "0 0 20px rgba(37,99,235,0.5)",
              }}
            >
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <span
              className="text-lg font-bold text-white"
              style={{ fontFamily: "Syne, sans-serif", letterSpacing: "-0.02em" }}
            >
              EventSync
            </span>
          </motion.div>

          {/* Center content */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-base font-medium text-white/60 mb-8 leading-relaxed"
            >
              Engage your audience.<br />
              Manage sessions.<br />
              Go live instantly.
            </motion.p>

            {/* Stat card — Soni's "30 days" card equivalent */}
            <StatCard />
          </div>

          {/* Bottom link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-blue-400 font-medium hover:gap-3 transition-all duration-200"
              style={{ fontSize: "15px" }}
            >
              Explore Events
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* RIGHT PANEL — hero content, like Soni's "Keep Balance Easy" */}
        <div className="flex-1 flex flex-col">

          {/* Top nav (mobile) */}
          <div className="flex lg:hidden items-center justify-between px-6 py-5">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#1d4ed8,#2563eb)" }}
              >
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="text-base font-bold text-white" style={{ fontFamily: "Syne, sans-serif" }}>
                EventSync
              </span>
            </div>
            <Link
              href="/events"
              className="px-4 py-2 rounded-full text-sm font-medium text-white"
              style={{
                background: "linear-gradient(135deg,#1d4ed8,#2563eb)",
                boxShadow: "0 0 20px rgba(37,99,235,0.4)",
              }}
            >
              Get Started
            </Link>
          </div>

          {/* HERO — massive type like Soni */}
          <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-20 py-12 lg:py-0">

            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-8 self-start"
            >
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(239,68,68,0.12)",
                  border: "1px solid rgba(239,68,68,0.3)",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-semibold text-red-400 uppercase tracking-widest">
                  Sessions Live Now
                </span>
              </div>
            </motion.div>

            {/* MAIN HEADLINE — Soni style: massive, stacked, mixed opacity */}
            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-white leading-[0.9] tracking-[-0.04em]"
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(52px, 10vw, 120px)",
                }}
              >
                Engage
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.42, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="leading-[0.9] tracking-[-0.04em]"
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(52px, 10vw, 120px)",
                  color: "rgba(255,255,255,0.28)",
                }}
              >
                Audiences
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-10">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.54, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-white leading-[0.9] tracking-[-0.04em]"
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(52px, 10vw, 120px)",
                }}
              >
                Live.
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-base md:text-lg font-light max-w-lg mb-10 leading-relaxed"
              style={{ color: "rgba(255,255,255,0.42)" }}
            >
              Replace static programmes with a dynamic real-time platform.
              Q&amp;A, live badges, session planning — all in one place.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.5 }}
              className="flex flex-wrap items-center gap-4 mb-12"
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
              className="flex flex-wrap gap-3"
            >
              <FeatureChip icon={Zap} label="Live session detection" />
              <FeatureChip icon={MessageSquare} label="Real-time Q&A" />
              <FeatureChip icon={Users} label="Speaker profiles" />
              <FeatureChip icon={BarChart3} label="Multi-track planning" />
            </motion.div>
          </div>

          {/* Bottom stats bar — full width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="px-8 md:px-16 lg:px-20 py-8"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex flex-wrap gap-10">
              {[
                { value: "2", label: "Events scheduled" },
                { value: "6+", label: "Sessions planned" },
                { value: "5", label: "Expert speakers" },
                { value: "∞", label: "Questions possible" },
              ].map(({ value, label }) => (
                <div key={label}>
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
    </div>
  )
}