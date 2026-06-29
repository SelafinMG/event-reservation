// src/rooms/RoomShow.tsx
import { Show, SimpleShowLayout, TextField, NumberField } from "react-admin"

export const RoomShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" label="Nom" />
      <NumberField source="capacity" label="Capacité" />
      <TextField source="eventName" label="Événement" />
    </SimpleShowLayout>
  </Show>
)
