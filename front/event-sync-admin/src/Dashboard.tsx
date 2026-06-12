// src/Dashboard.tsx
import { useGetList } from "react-admin"
import { Card, CardContent, Typography } from "@mui/material"
import Grid from "@mui/material/Grid"   // MUI v6 Grid

type StatCardProps = {
  title: string
  total: number | undefined
}

const StatCard = ({ title, total }: StatCardProps) => (
  <Card>
    <CardContent>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h3">{total ?? 0}</Typography>
    </CardContent>
  </Card>
)

export const Dashboard = () => {
  const events = useGetList("events", { pagination: { page: 1, perPage: 1 } })
  const sessions = useGetList("sessions", { pagination: { page: 1, perPage: 1 } })
  const liveSessions = useGetList("sessions", { filter: { isLive: true }, pagination: { page: 1, perPage: 1 } })
  const speakers = useGetList("speakers", { filter: { active: true }, pagination: { page: 1, perPage: 1 } })

  return (
    <Grid container spacing={2}>
      <Grid size={3}>
        <StatCard title="Total événements" total={events.total} />
      </Grid>
      <Grid size={3}>
        <StatCard title="Total sessions" total={sessions.total} />
      </Grid>
      <Grid size={3}>
        <StatCard title="Sessions en live" total={liveSessions.total} />
      </Grid>
      <Grid size={3}>
        <StatCard title="Speakers actifs" total={speakers.total} />
      </Grid>
    </Grid>
  )
}
