"use client"

import { useState, useTransition, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp, MessageSquare, Send, User } from "lucide-react"
import type { Question } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface QuestionSectionProps {
  sessionId: string
  initialQuestions?: Question[]
  isLive?: boolean
}

export function QuestionSection({
  sessionId,
  initialQuestions = [],
  isLive = false,
}: QuestionSectionProps) {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions)
  const [newQuestion, setNewQuestion] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [isPending, startTransition] = useTransition()
  const [votedQuestions, setVotedQuestions] = useState<Set<string>>(new Set())

  // Charger les questions depuis l’API
  useEffect(() => {
    async function loadQuestions() {
      try {
        const res = await fetch(`http://localhost:3001/api/sessions/${sessionId}/questions`)
        if (!res.ok) throw new Error("Failed to fetch questions")
        const data = await res.json()
        setQuestions(data)
      } catch (err) {
        console.error(err)
      }
    }
    loadQuestions()
  }, [sessionId])

  // Ajouter une question
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newQuestion.trim()) return

    startTransition(async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/sessions/${sessionId}/questions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: newQuestion.trim(),
            authorName: authorName.trim() || null,
          }),
        })
        if (!res.ok) throw new Error("Failed to add question")
        const result = await res.json()
        setQuestions((prev) => [...prev, result].sort((a, b) => b.upvotes - a.upvotes))
        setNewQuestion("")
      } catch (err) {
        console.error(err)
      }
    })
  }

  // Upvote
  const handleUpvote = async (questionId: string) => {
    if (votedQuestions.has(questionId)) return

    startTransition(async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/sessions/${sessionId}/questions/${questionId}/upvote`,
          { method: "POST" }
        )
        if (!res.ok) throw new Error("Failed to upvote question")
        const updated = await res.json()
        setVotedQuestions((prev) => new Set(prev).add(questionId))
        setQuestions((prev) =>
          prev
            .map((q) => (q.id === updated.id ? updated : q))
            .sort((a, b) => b.upvotes - a.upvotes)
        )
      } catch (err) {
        console.error(err)
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          Q&A
          <span className="text-sm font-normal text-muted-foreground">
            ({questions.length} questions)
          </span>
        </h3>
      </div>

      {/* Question Form */}
      {isLive && (
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
                placeholder="Your name (optional)"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="h-8 w-40 bg-background/50 border-border/50"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Ask a question..."
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="flex-1 bg-background/50 border-border/50"
              disabled={isPending}
            />
            <Button
              type="submit"
              disabled={isPending || !newQuestion.trim()}
              className="bg-primary hover:bg-primary/90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </motion.form>
      )}

      {/* Questions List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {questions.map((question, index) => (
            <motion.div
              key={question.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="group bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-4 hover:border-primary/30 transition-colors"
            >
              <div className="flex gap-4">
                {/* Upvote button */}
                <motion.button
                  onClick={() => handleUpvote(question.id)}
                  disabled={votedQuestions.has(question.id)}
                  whileTap={{ scale: 0.9 }}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                    votedQuestions.has(question.id)
                      ? "bg-primary/20 text-primary"
                      : "hover:bg-muted/50 text-muted-foreground hover:text-primary"
                  }`}
                >
                  <ChevronUp className="w-5 h-5" />
                  <motion.span
                    key={question.upvotes}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-sm font-semibold"
                  >
                    {question.upvotes}
                  </motion.span>
                </motion.button>

                {/* Question content */}
                <div className="flex-1 min-w-0">
                  <p className="text-foreground leading-relaxed">{question.content}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{question.authorName || "Anonymous"}</span>
                    <span>•</span>
                    <span>
                      {new Date(question.createdAt).toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                {/* Rank badge for top 3 */}
                {index < 3 && (
                  <div
                    className={`px-2 py-1 rounded-lg text-xs font-bold ${
                      index === 0
                        ? "bg-yellow-500/20 text-yellow-400"
                        : index === 1
                        ? "bg-gray-400/20 text-gray-300"
                        : "bg-orange-500/20 text-orange-400"
                    }`}
                  >
                    #{index + 1}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {questions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-muted-foreground"
          >
            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No questions yet. Be the first to ask!</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
