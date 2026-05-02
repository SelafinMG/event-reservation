"use client";

import { useState } from "react";
import type { Question } from "@/lib/mockApi";

interface QuestionSectionProps {
  initialQuestions: Question[];
  sessionId: string;
  isLive: boolean;
}

function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return "à l'instant";
  if (diff < 3600) return `il y a ${Math.floor(diff/60)} min`;
  return `il y a ${Math.floor(diff/3600)} h`;
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

  const handleUpvote = (qid: string) => {
    if (upvoted.has(qid)) return;
    setUpvoted(prev => new Set([...prev, qid]));
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
      <div className="flex items-center gap-2.5 mb-5">
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

      {isLive ? (
        <div className="mb-5 p-4 rounded-xl" style={{ background:"rgba(200,218,248,0.04)", border:"1px solid rgba(200,218,248,0.07)" }}>
          <p className="text-[11px] mb-3 font-light" style={{ color:"rgba(140,162,205,0.40)" }}>
            Posez votre question en direct
          </p>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Votre question…"
            rows={3}
            maxLength={500}
            className="w-full px-3 py-2.5 mb-2.5 resize-none transition-colors duration-200"
            style={{ ...inputStyle, minHeight:"72px" }}
          />
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={authorName}
              onChange={e => setAuthorName(e.target.value)}
              placeholder="Votre nom (optionnel)"
              className="flex-1 px-3 py-2 transition-colors duration-200"
              style={inputStyle}
            />
            <button
              onClick={handleSubmit}
              disabled={!content.trim() || submitting}
              className="px-4 py-2 rounded-lg text-[12px] font-medium transition-all duration-200"
              style={{
                background: content.trim() ? "rgba(200,218,248,0.1)" : "rgba(200,218,248,0.04)",
                border: "1px solid rgba(200,218,248,0.12)",
                color: content.trim() ? "rgba(215,228,252,0.85)" : "rgba(140,162,205,0.30)",
                letterSpacing:"0.02em",
              }}
            >
              {submitting ? "…" : "Envoyer"}
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-5 px-4 py-3 rounded-xl text-center"
          style={{ background:"rgba(200,218,248,0.025)", border:"1px solid rgba(200,218,248,0.05)" }}>
          <p className="text-[12px] font-light" style={{ color:"rgba(140,162,205,0.32)" }}>
            Les questions sont disponibles uniquement pendant la session
          </p>
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
                  {i === 0 && questions.length > 1 && (
                    <span className="px-1.5 py-0.5 rounded"
                      style={{ background:"rgba(200,170,60,0.1)", border:"1px solid rgba(200,170,60,0.2)", color:"rgba(220,190,70,0.6)" }}>
                      top
                    </span>
                  )}
                  <span>{q.authorName || "anonyme"}</span>
                  <span>·</span>
                  <span>{timeAgo(q.createdAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}