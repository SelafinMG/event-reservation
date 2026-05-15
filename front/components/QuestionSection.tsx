"use client"

import { useState, useTransition } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp, MessageSquare, Send, User } from "lucide-react"
import type { Question } from "@/lib/types"
import { addQuestion, upvoteQuestion } from "@/lib/mockApi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface QuestionSectionProps {
  sessionId: string
  initialQuestions: Question[]
  isLive?: boolean
}

export function QuestionSection({
  sessionId,
  initialQuestions,
  isLive = false,
}: QuestionSectionProps) {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions)
  const [newQuestion, setNewQuestion] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [isPending, startTransition] = useTransition()
  const [votedQuestions, setVotedQuestions] = useState<Set<string>>(new Set())

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newQuestion.trim()) return

    startTransition(async () => {
      const result = await addQuestion(sessionId, {
        content: newQuestion.trim(),
        authorName: authorName.trim() || null,
      })

      if ("error" in result) {
        console.error(result.error)
        return
      }

      setQuestions((prev) =>
        [...prev, result].sort((a, b) => b.upvotes - a.upvotes)
      )
      setNewQuestion("")
    })
  }

export default function QuestionSection({ initialQuestions, sessionId, isLive }: QuestionSectionProps) {
  const [questions, setQuestions] = useState(initialQuestions);
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [upvoted, setUpvoted] = useState<Set<string>>(new Set());

  const handleSubmit = async () => {
    if (!content.trim() || !isLive) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 380));
    const newQ: Question = {
      id: `q-${Date.now()}`, sessionId,
      content: content.trim(),
      authorName: authorName.trim() || null,
      upvotes: 0,
      createdAt: new Date().toISOString(),
    };
    setQuestions(prev => [newQ, ...prev]);
    setContent(""); setAuthorName(""); setSubmitting(false);
  };

  // Load upvoted from localStorage
  useState(() => {
    if (typeof window !== "undefined") {
      const stored = JSON.parse(localStorage.getItem("eventsync_upvoted") || "[]");
      setUpvoted(new Set(stored));
    }
  });

  const handleUpvote = (qid: string) => {
    if (upvoted.has(qid)) return;
    const nextUpvoted = new Set([...Array.from(upvoted), qid]);
    setUpvoted(nextUpvoted);
    localStorage.setItem("eventsync_upvoted", JSON.stringify(Array.from(nextUpvoted)));
    
    setQuestions(prev =>
      [...prev.map(q => q.id === qid ? {...q, upvotes: q.upvotes + 1} : q)]
        .sort((a,b) => b.upvotes - a.upvotes)
    );
  };

  const inputStyle = {
    background: "rgba(200,218,248,0.04)",
    border: "1px solid rgba(200,218,248,0.09)",
    borderRadius: "10px",
    color: "rgba(220,232,252,0.88)",
    fontSize: "13px",
    outline: "none",
    fontFamily: "inherit",
    fontWeight: 300,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <h2 className="text-base font-medium" style={{ color:"rgba(215,228,252,0.88)", letterSpacing:"-0.01em" }}>
            Questions
          </h2>
          {questions.length > 0 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full"
              style={{ background:"rgba(200,218,248,0.06)", border:"1px solid rgba(200,218,248,0.09)", color:"rgba(150,170,210,0.5)" }}>
              {questions.length}
            </span>
          )}
        </div>
        {isLive && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full animate-pulse"
            style={{ background:"rgba(220,55,45,0.1)", border:"1px solid rgba(220,55,45,0.2)" }}>
            <span className="w-1 h-1 rounded-full bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.8)]" />
            <span className="text-[9px] uppercase tracking-wider font-semibold text-red-400">Direct</span>
          </div>
        )}
      </div>

      {/* Question Form */}
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
      )}

      {questions.length === 0 ? (
        <p className="text-center text-[12px] py-8 font-light" style={{ color:"rgba(140,162,205,0.30)" }}>
          {isLive ? "Aucune question pour l'instant — soyez le premier !" : "Aucune question."}
        </p>
      ) : (
        <div className="space-y-2.5">
          {questions.map((q, i) => (
            <div key={q.id} className="flex gap-3 px-4 py-3.5 rounded-xl transition-all duration-200"
              style={{ background:"rgba(200,218,248,0.03)", border:"1px solid rgba(200,218,248,0.06)" }}>
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
                <p className="text-[13px] leading-relaxed mb-2 font-light" style={{ color:"rgba(210,225,252,0.82)" }}>
                  {q.content}
                </p>
                <div className="flex items-center gap-2 text-[10px]" style={{ color:"rgba(130,155,200,0.35)" }}>
                  {i === 0 && questions.length > 1 && q.upvotes > 0 && (
                    <span className="px-1.5 py-0.5 rounded flex items-center gap-1"
                      style={{ background:"rgba(250,210,80,0.08)", border:"1px solid rgba(250,210,80,0.15)", color:"rgba(250,210,80,0.7)" }}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      POPULAIRE
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