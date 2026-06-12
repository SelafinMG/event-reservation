// src/sessions/SessionShow.tsx
import { Show, SimpleShowLayout, TextField, DateField, BooleanField, ReferenceField } from "react-admin"
import { QuestionsBySession } from "../questions/QuestionsBySession"

export const SessionShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="title" />
      <TextField source="description" />
      <DateField source="startTime" />
      <DateField source="endTime" />
      <BooleanField source="isLive" />
      <TextField source="capacity" />
      <ReferenceField source="eventId" reference="events" />
      <QuestionsBySession />
    </SimpleShowLayout>
  </Show>
)
