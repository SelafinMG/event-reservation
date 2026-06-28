// src/events/EventShow.tsx
import { Show, SimpleShowLayout, TextField, DateField } from "react-admin"
import { SessionsByEvent } from "../sessions/SessionByEvent"

export const EventShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="title" />
      <TextField source="description" />
      <DateField source="startDate" showTime />
      <DateField source="endDate" showTime />
      <SessionsByEvent />
    </SimpleShowLayout>
  </Show>
)
