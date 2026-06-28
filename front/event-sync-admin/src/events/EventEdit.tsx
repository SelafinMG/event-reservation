// src/events/EventEdit.tsx
import { Edit, SimpleForm, TextInput, DateTimeInput, required } from "react-admin"

export const EventEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" validate={required()} />
      <TextInput source="description" />
      <DateTimeInput source="startDate" validate={required()} />
      <DateTimeInput source="endDate" validate={required()} />
    </SimpleForm>
  </Edit>
)
