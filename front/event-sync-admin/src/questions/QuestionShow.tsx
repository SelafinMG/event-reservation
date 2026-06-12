// src/questions/QuestionShow.tsx
import { Show, SimpleShowLayout, TextField, DateField, ReferenceField } from "react-admin"

export const QuestionShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="content" />
      <TextField source="author" />
      <DateField source="createdAt" />
      <ReferenceField source="sessionId" reference="sessions" />
    </SimpleShowLayout>
  </Show>
)
