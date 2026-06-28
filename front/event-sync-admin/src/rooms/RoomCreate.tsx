// src/rooms/RoomCreate.tsx
import { Create, SimpleForm, TextInput, NumberInput, required } from "react-admin"

export const RoomCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
      <NumberInput resource="capacity" />
    </SimpleForm>
  </Create>
)
