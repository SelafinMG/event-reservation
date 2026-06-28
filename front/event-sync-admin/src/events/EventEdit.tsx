// src/events/EventEdit.tsx
import { Edit, SimpleForm, TextInput, DateInput, required } from "react-admin"

export const EventEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" validate={required()} />
      <TextInput source="description" />
      <DateInput source="startDate" validate={required()} />
      <DateInput source="endDate" validate={required()} />
    </SimpleForm>
  </Edit>
)
