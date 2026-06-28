// @ts-nocheck
import { List, Datagrid, TextField, DateField, EditButton, Edit, SimpleForm, TextInput, DateTimeInput, Create } from "react-admin";

export const EventList = () => (
  <List>
    <Datagrid>
      <TextField source="title" />
      <TextField source="location" />
      <DateField source="startDate" showTime />
      <DateField source="endDate" showTime />
      <EditButton />
    </Datagrid>
  </List>
);

export const EventEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="location" />
      <DateTimeInput source="startDate" />
      <DateTimeInput source="endDate" />
      <TextInput source="description" />
    </SimpleForm>
  </Edit>
);

export const EventCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="location" />
      <DateTimeInput source="startDate" />
      <DateTimeInput source="endDate" />
      <TextInput source="description" />
    </SimpleForm>
  </Create>
);
