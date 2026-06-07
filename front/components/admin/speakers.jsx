import { List, Datagrid, TextField, EditButton, Edit, SimpleForm, TextInput, Create } from "react-admin";

export const SpeakerList = () => (
  <List>
    <Datagrid>
      <TextField source="full_name" />
      <TextField source="bio" />
      <TextField source="photo_url" />
      <EditButton />
    </Datagrid>
  </List>
);

export const SpeakerEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="full_name" />
      <TextInput source="bio" />
      <TextInput source="photo_url" />
    </SimpleForm>
  </Edit>
);

export const SpeakerCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="full_name" />
      <TextInput source="bio" />
      <TextInput source="photo_url" />
    </SimpleForm>
  </Create>
);
