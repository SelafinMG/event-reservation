// src/rooms/RoomShow.tsx
import { Show, SimpleShowLayout, TextField, NumberField } from "react-admin"

export const RoomShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" />
      <NumberField source="capacity" />
    </SimpleShowLayout>
  </Show>
)
