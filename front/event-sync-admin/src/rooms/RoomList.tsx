// src/rooms/RoomList.tsx
import { List, Datagrid, TextField, NumberField, EditButton, ShowButton } from "react-admin"

export const RoomList = () => (
  <List>
    <Datagrid>
      <TextField source="name" label="Nom" />
      <NumberField source="capacity" label="Capacité" />
      <TextField source="eventName" label="Événement" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
)
