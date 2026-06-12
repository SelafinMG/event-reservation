// src/sessions/SessionCreate.tsx
import { Create, SimpleForm, TextInput, DateInput, BooleanInput, NumberInput, ReferenceInput, SelectInput, required } from "react-admin"

export const SessionCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" validate={required()} />
      <TextInput source="description" />
      <DateInput source="startTime" validate={required()} />
      <DateInput source="endTime" validate={required()} />
      <BooleanInput source="isLive" />
      <NumberInput resource="capacity" />
      <ReferenceInput source="eventId" reference="events">
        <SelectInput optionText="title" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
)
