// src/events/EventCreate.tsx
import { Create, SimpleForm, TextInput, DateInput, required } from "react-admin"

export const EventCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" validate={required()} />
      <TextInput source="description" />
      <DateInput source="startDate" validate={required()} />
      <DateInput source="endDate" validate={required()} />
    </SimpleForm>
  </Create>
)
