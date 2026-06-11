// @ts-nocheck
import { List, Datagrid, TextField, EditButton, Edit, SimpleForm, TextInput, Create } from "react-admin";

export const SpeakerList = () => (
  <List>
    <Datagrid>
      <TextField source="fullName" />
      <TextField source="bio" />
      <TextField source="photoUrl" />
      <EditButton />
    </Datagrid>
  </List>
);

export const SpeakerEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="fullName" />
      <TextInput source="bio" />
      <TextInput source="photoUrl" />
    </SimpleForm>
  </Edit>
);

export const SpeakerCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="fullName" />
      <TextInput source="bio" />
      <TextInput source="photoUrl" />
    </SimpleForm>
  </Create>
);
