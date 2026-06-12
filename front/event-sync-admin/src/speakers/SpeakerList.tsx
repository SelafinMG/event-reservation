// src/speakers/SpeakerList.tsx
import { List, Datagrid, TextField, EmailField, BooleanField, EditButton, ShowButton } from "react-admin"

export const SpeakerList = () => (
  <List>
    <Datagrid>
      <TextField source="fullName" />
      <EmailField source="email" />
      <TextField source="photoUrl" />
      <BooleanField source="active" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
)
