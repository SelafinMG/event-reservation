// src/rooms/RoomList.tsx
import { List, Datagrid, TextField, NumberField, EditButton, ShowButton } from "react-admin"

export const RoomList = () => (
  <List>
    <Datagrid>
      <TextField source="name" />
      <NumberField source="capacity" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
)
