"use client"

import { useEffect, useState, useTransition } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Send, User } from "lucide-react"
import type { Question } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createSessionQuestion, getSessionQuestions, upvoteSessionQuestion } from "@/data/questions"

interface QuestionSectionProps {
  sessionId: string
  initialQuestions?: Question[]
  isLive?: boolean
}

export default function QuestionSection({
  sessionId,
  initialQuestions = [],
  isLive = false,
}: QuestionSectionProps) {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions)
  const [newQuestion, setNewQuestion] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [isPending, startTransition] = useTransition()
  const [upvoted, setUpvoted] = useState<Set<string>>(new Set())

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const data = await getSessionQuestions(sessionId)
        if (!mounted) return
        setQuestions(data)
      } catch (err) {
        console.error(err)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [sessionId])

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const stored = JSON.parse(localStorage.getItem("eventsync_upvoted") || "[]")
      setUpvoted(new Set<string>(stored))
    } catch (e) {
      setUpvoted(new Set())
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newQuestion.trim()) return

    startTransition(() => {
      ;(async () => {
        try {
          const created = await createSessionQuestion(sessionId, {
            content: newQuestion.trim(),
            authorName: authorName.trim() || null,
          })
          setQuestions((prev) => [created, ...prev].sort((a, b) => b.upvotes - a.upvotes))
          setNewQuestion("")
          setAuthorName("")
        } catch (err) {
          console.error(err)
        }
      })()
    })
  }

  const handleUpvote = async (qid: string) => {
    if (upvoted.has(qid)) return
    const next = new Set(Array.from(upvoted))
    next.add(qid)
    setUpvoted(next)
    try {
      localStorage.setItem("eventsync_upvoted", JSON.stringify(Array.from(next)))
    } catch {}

    // Optimistic update
    setQuestions((prev) =>
      prev
        .map((q) => (q.id === qid ? { ...q, upvotes: q.upvotes + 1 } : q))
        .sort((a, b) => b.upvotes - a.upvotes)
    )

    // Try to persist on server (best-effort)
    try {
      await upvoteSessionQuestion(sessionId, qid)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <h2 className="text-base font-medium" style={{ color: "rgba(215,228,252,0.88)", letterSpacing: "-0.01em" }}>
            Questions
          </h2>
          {questions.length > 0 && (
            <span
              className="text-[10px] px-2 py-0.5 rounded-full"
              style={{ background: "rgba(200,218,248,0.06)", border: "1px solid rgba(200,218,248,0.09)", color: "rgba(150,170,210,0.5)" }}
            >
              {questions.length}
            </span>
          )}
        </div>
        {isLive && (
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full animate-pulse"
            style={{ background: "rgba(220,55,45,0.1)", border: "1px solid rgba(220,55,45,0.2)" }}
          >
            <span className="w-1 h-1 rounded-full bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.8)]" />
            <span className="text-[9px] uppercase tracking-wider font-semibold text-red-400">Direct</span>
          </div>
        )}
      </div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-4 space-y-3"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-4 h-4" />
            <Input
              type="text"
              placeholder="Votre nom (optionnel)"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="h-8 w-40 bg-background/50 border-border/50"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Posez une question..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="flex-1 bg-background/50 border-border/50"
            disabled={isPending}
          />
          <Button type="submit" disabled={isPending || !newQuestion.trim()} className="bg-primary hover:bg-primary/90">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </motion.form>

      {questions.length === 0 ? (
        <p className="text-center text-[12px] py-8 font-light" style={{ color: "rgba(140,162,205,0.30)" }}>
          {isLive ? "Aucune question pour l'instant — soyez le premier !" : "Aucune question."}
        </p>
      ) : (
        <div className="space-y-2.5">
          <AnimatePresence>
            {questions.map((q, index) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.12 }}
                className="flex gap-3 px-4 py-3.5 rounded-xl transition-all duration-200"
                style={{ background: "rgba(200,218,248,0.03)", border: "1px solid rgba(200,218,248,0.06)" }}
              >
                <button
                  onClick={() => handleUpvote(q.id)}
                  className="flex flex-col items-center gap-0.5 flex-shrink-0 w-8 transition-all duration-150"
                  style={{ color: upvoted.has(q.id) ? "rgba(200,218,248,0.7)" : "rgba(140,162,205,0.25)" }}
                >
                  <svg width="10" height="7" fill="none" stroke="currentColor" viewBox="0 0 12 8">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M1 7L6 2L11 7" />
                  </svg>
                  <span className="text-[10px] font-medium">{q.upvotes}</span>
                </button>

                <div className="flex-1 min-w-0">
                  <p className="text-[13px] leading-relaxed mb-2 font-light" style={{ color: "rgba(210,225,252,0.82)" }}>
                    {q.content}
                  </p>

                  <div className="flex items-center gap-2 text-[10px]" style={{ color: "rgba(130,155,200,0.35)" }}>
                    {index === 0 && questions.length > 1 && q.upvotes > 0 && (
                      <span
                        className="px-1.5 py-0.5 rounded flex items-center gap-1"
                        style={{ background: "rgba(250,210,80,0.08)", border: "1px solid rgba(250,210,80,0.15)", color: "rgba(250,210,80,0.7)" }}
                      >
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        POPULAIRE
                      </span>
                    )}

                    <div style={{ color: "rgba(130,155,200,0.35)" }}>{q.authorName ?? "Anonyme"}</div>
                    <div style={{ marginLeft: "auto", color: "rgba(120,140,180,0.35)", fontSize: 11 }}>{new Date(q.createdAt).toLocaleTimeString()}</div>
                  </div>

                  {index < 3 && (
                    <div
                      className={`px-2 py-1 rounded-lg text-xs font-bold ${
                        index === 0 ? "bg-yellow-500/20 text-yellow-400" : index === 1 ? "bg-gray-400/20 text-gray-300" : "bg-orange-500/20 text-orange-400"
                      }`}
                      style={{ display: "inline-block", marginTop: 8 }}
                    >
                      #{index + 1}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
