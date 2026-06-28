// src/events/EventCreate.tsx
import { Create, SimpleForm, TextInput, DateTimeInput, required } from "react-admin"

export const EventCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" validate={required()} />
      <TextInput source="description" />
      <DateTimeInput source="startDate" validate={required()} />
      <DateTimeInput source="endDate" validate={required()} />
    </SimpleForm>
  </Create>
)
