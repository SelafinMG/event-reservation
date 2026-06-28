// src/sessions/SessionCreate.tsx
import { Create, SimpleForm, TextInput, DateTimeInput, BooleanInput, NumberInput, ReferenceInput, SelectInput, required } from "react-admin"

export const SessionCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" validate={required()} />
      <TextInput source="description" />
      <DateTimeInput source="startTime" validate={required()} />
      <DateTimeInput source="endTime" validate={required()} />
      <BooleanInput source="isLive" />
      <NumberInput source="capacity" />
      <ReferenceInput source="eventId" reference="events">
        <SelectInput optionText="title" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
)
