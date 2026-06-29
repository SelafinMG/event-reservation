// src/sessions/SessionShow.tsx
import { Show, SimpleShowLayout, TextField, DateField, BooleanField } from "react-admin"
import { QuestionsBySession } from "../questions/QuestionsBySession"

export const SessionShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="title" label="Titre" />
      <TextField source="description" label="Description" />
      <DateField source="startTime" showTime label="Début" />
      <DateField source="endTime" showTime label="Fin" />
      <BooleanField source="isLive" label="En cours" />
      <TextField source="capacity" label="Capacité" />
      <TextField source="roomName" label="Salle" />
      <QuestionsBySession />
    </SimpleShowLayout>
  </Show>
)
