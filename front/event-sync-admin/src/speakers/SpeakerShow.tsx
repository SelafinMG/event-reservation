// src/speakers/SpeakerShow.tsx
import { Show, SimpleShowLayout, TextField, EmailField, BooleanField } from "react-admin"

export const SpeakerShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="fullName" />
      <EmailField source="email" />
      <TextField source="photoUrl" />
      <BooleanField source="active" />
    </SimpleShowLayout>
  </Show>
)
