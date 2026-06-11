// @ts-nocheck
import { List, Datagrid, TextField, DateField, EditButton, Edit, SimpleForm, TextInput, DateInput, Create } from "react-admin";

export const EventList = () => (
  <List>
    <Datagrid>
      <TextField source="title" />
      <TextField source="location" />
      <DateField source="start_date" />
      <DateField source="end_date" />
      <EditButton />
    </Datagrid>
  </List>
);

export const EventEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="location" />
      <DateInput source="start_date" />
      <DateInput source="end_date" />
      <TextInput source="description" />
    </SimpleForm>
  </Edit>
);

export const EventCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="location" />
      <DateInput source="start_date" />
      <DateInput source="end_date" />
      <TextInput source="description" />
    </SimpleForm>
  </Create>
);
