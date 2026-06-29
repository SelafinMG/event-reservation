// @ts-nocheck
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useGetList } from "react-admin";

const StatCard = ({ title, total }) => (
  <Card>
    <CardContent>
      <Typography variant="subtitle2" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h4" component="p">
        {total ?? 0}
      </Typography>
    </CardContent>
  </Card>
);

export const Dashboard = () => {
  const events = useGetList("events", { pagination: { page: 1, perPage: 1 } });
  const rooms = useGetList("rooms", { pagination: { page: 1, perPage: 1 } });
  const sessions = useGetList("sessions", { pagination: { page: 1, perPage: 1 } });
  const speakers = useGetList("speakers", { pagination: { page: 1, perPage: 1 } });
  const questions = useGetList("questions", { pagination: { page: 1, perPage: 1 } });

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={12} md={4}>
        <StatCard title="Événements" total={events.total} />
      </Grid>
      <Grid item xs={12} md={4}>
        <StatCard title="Salles" total={rooms.total} />
      </Grid>
      <Grid item xs={12} md={4}>
        <StatCard title="Sessions" total={sessions.total} />
      </Grid>
      <Grid item xs={12} md={4}>
        <StatCard title="Speakers" total={speakers.total} />
      </Grid>
      <Grid item xs={12} md={4}>
        <StatCard title="Questions" total={questions.total} />
      </Grid>
    </Grid>
  );
};
