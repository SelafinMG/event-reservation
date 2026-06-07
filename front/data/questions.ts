import api from "@/lib/api"
import type { Question, QuestionInput } from "@/lib/types"

export async function getSessionQuestions(sessionId: string) {
  const { data } = await api.get<Question[]>(`/api/sessions/${sessionId}/questions`)
  return data
}

export async function createSessionQuestion(sessionId: string, question: QuestionInput) {
  const { data } = await api.post<Question>(`/api/sessions/${sessionId}/questions`, question)
  return data
}

export async function upvoteSessionQuestion(sessionId: string, questionId: string) {
  const { data } = await api.post<Question>(`/api/sessions/${sessionId}/questions/${questionId}/upvote`)
  return data
}
