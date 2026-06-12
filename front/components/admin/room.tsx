// @ts-nocheck
import { List, Datagrid, TextField, EditButton, Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, Create } from "react-admin";

export const RoomList = () => (
  <List>
    <Datagrid>
      <TextField source="name" />
      <TextField source="eventId" />
      <EditButton />
    </Datagrid>
  </List>
);

export const RoomEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
      <ReferenceInput source="eventId" reference="events">
        <SelectInput optionText="title" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const RoomCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <ReferenceInput source="eventId" reference="events">
        <SelectInput optionText="title" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
