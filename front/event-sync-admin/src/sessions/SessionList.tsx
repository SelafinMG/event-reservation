// src/sessions/SessionList.tsx
import { List, Datagrid, TextField, DateField, BooleanField, ReferenceField, EditButton, ShowButton } from "react-admin"

export const SessionList = () => (
  <List>
    <Datagrid>
      <TextField source="title" />
      <TextField source="description" />
      <DateField source="startTime" />
      <DateField source="endTime" />
      <BooleanField source="isLive" />
      <TextField source="capacity" />
      <ReferenceField source="eventId" reference="events" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
)
