// src/sessions/SessionList.tsx
import { List, Datagrid, TextField, DateField, BooleanField, EditButton, ShowButton } from "react-admin"

export const SessionList = () => (
  <List>
    <Datagrid>
      <TextField source="title" label="Titre" />
      <TextField source="description" label="Description" />
      <DateField source="startTime" showTime label="Début" />
      <DateField source="endTime" showTime label="Fin" />
      <BooleanField source="isLive" label="En cours" />
      <TextField source="capacity" label="Capacité" />
      <TextField source="roomName" label="Salle" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
)
