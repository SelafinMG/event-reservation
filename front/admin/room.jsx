import { List, Datagrid, TextField, EditButton, Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, Create } from "react-admin";

export const RoomList = () => (
  <List>
    <Datagrid>
      <TextField source="name" />
      <TextField source="event_id" />
      <EditButton />
    </Datagrid>
  </List>
);

export const RoomEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
      <ReferenceInput source="event_id" reference="events">
        <SelectInput optionText="title" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const RoomCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <ReferenceInput source="event_id" reference="events">
        <SelectInput optionText="title" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
