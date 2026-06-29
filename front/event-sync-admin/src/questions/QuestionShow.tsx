// src/questions/QuestionShow.tsx
import { Show, SimpleShowLayout, TextField, DateField, NumberField } from "react-admin"

export const QuestionShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="content" label="Question" />
      <TextField source="authorName" label="Auteur" />
      <NumberField source="upvotes" label="Votes" />
      <TextField source="sessionId" label="Session ID" />
      <DateField source="createdAt" showTime label="Date" />
    </SimpleShowLayout>
  </Show>
)
