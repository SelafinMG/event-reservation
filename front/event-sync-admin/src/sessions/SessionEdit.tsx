// src/sessions/SessionEdit.tsx
import { Edit, SimpleForm, TextInput, DateTimeInput, NumberInput, ReferenceInput, SelectInput, required } from "react-admin"

export const SessionEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" validate={required()} label="Titre" />
      <TextInput source="description" label="Description" />
      <DateTimeInput source="startTime" validate={required()} label="Début" />
      <DateTimeInput source="endTime" validate={required()} label="Fin" />
      <NumberInput source="capacity" label="Capacité" />
      <ReferenceInput source="eventId" reference="events">
        <SelectInput optionText="title" label="Événement" />
      </ReferenceInput>
      <ReferenceInput source="roomId" reference="rooms">
        <SelectInput optionText="name" label="Salle" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
)
