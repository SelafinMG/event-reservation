// src/sessions/SessionsByEvent.tsx
import { useRecordContext, useGetList } from "react-admin"
import { Link } from "react-router-dom"

export const SessionsByEvent = () => {
  const event = useRecordContext()
  const { data, total, isLoading } = useGetList("sessions", {
    filter: { eventId: event?.id },
  })

  if (isLoading) return <p>Chargement...</p>
  if (!data || total === 0) return <p>Aucune session pour cet événement</p>

  return (
    <div>
      <h3>Sessions ({total})</h3>
      {data?.map(session => (
        <div key={session.id}>
          <Link to={`/sessions/${session.id}/show`}>
            {session.title}
          </Link>
        </div>
      ))}
    </div>
  )
}
