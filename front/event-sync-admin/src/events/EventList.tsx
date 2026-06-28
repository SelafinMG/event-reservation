// src/events/EventList.tsx
import { List, Datagrid, TextField, DateField, EditButton, ShowButton } from "react-admin"

export const EventList = () => (
  <List>
    <Datagrid>
      <TextField source="title" />
      <TextField source="description" />
      <DateField source="startDate" />
      <DateField source="endDate" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
)
