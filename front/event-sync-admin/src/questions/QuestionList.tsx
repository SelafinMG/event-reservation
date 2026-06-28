// src/questions/QuestionList.tsx
import { List, Datagrid, TextField, DateField, ReferenceField, EditButton, ShowButton } from "react-admin"

export const QuestionList = () => (
  <List>
    <Datagrid>
      <TextField source="content" />
      <TextField source="author" />
      <DateField source="createdAt" />
      <ReferenceField source="sessionId" reference="sessions" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
)
