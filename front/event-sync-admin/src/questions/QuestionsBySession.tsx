// src/questions/QuestionsBySession.tsx
import { useRecordContext, useGetList } from "react-admin"

export const QuestionsBySession = () => {
  const session = useRecordContext()
  const { data, total, isLoading } = useGetList("questions", {
    filter: { sessionId: session?.id },
  })

  if (isLoading) return <p>Chargement...</p>
  if (!data || total === 0) return <p>Aucune question pour cette session</p>

  return (
    <div>
      <h3>Questions ({total})</h3>
      {data?.map(q => (
        <p key={q.id}>{q.content}</p>
      ))}
    </div>
  )
}
