// src/rooms/RoomEdit.tsx
import { Edit, SimpleForm, TextInput, NumberInput, required } from "react-admin"

export const RoomEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
      <NumberInput resource="capacity" />
    </SimpleForm>
  </Edit>
)
