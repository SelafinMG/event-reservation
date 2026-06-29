// src/questions/QuestionList.tsx
import { List, Datagrid, TextField, DateField, NumberField, EditButton, ShowButton } from "react-admin"

export const QuestionList = () => (
  <List>
    <Datagrid>
      <TextField source="content" label="Question" />
      <TextField source="authorName" label="Auteur" />
      <NumberField source="upvotes" label="Votes" />
      <TextField source="sessionId" label="Session ID" />
      <DateField source="createdAt" showTime label="Date" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
)
