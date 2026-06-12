// src/speakers/SpeakerEdit.tsx
import { Edit, SimpleForm, TextInput, BooleanInput, required, email } from "react-admin"

export const SpeakerEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="fullName" validate={required()} />
      <TextInput source="email" validate={[required(), email()]} />
      <TextInput source="photoUrl" />
      <BooleanInput source="active" />
    </SimpleForm>
  </Edit>
)
