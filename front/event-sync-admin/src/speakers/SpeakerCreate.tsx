// src/speakers/SpeakerCreate.tsx
import { Create, SimpleForm, TextInput, BooleanInput, required, email } from "react-admin"

export const SpeakerCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="fullName" validate={required()} />
      <TextInput source="email" validate={[required(), email()]} />
      <TextInput source="photoUrl" />
      <BooleanInput source="active" />
    </SimpleForm>
  </Create>
)
