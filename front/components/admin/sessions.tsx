// @ts-nocheck
import { List, Datagrid, TextField, DateField, EditButton, Edit, SimpleForm, TextInput, DateTimeInput, NumberInput, ReferenceInput, SelectInput, Create } from "react-admin";

export const SessionList = () => (
  <List>
    <Datagrid>
      <TextField source="title" />
      <TextField source="description" />
      <DateField source="startTime" showTime />
      <DateField source="endTime" showTime />
      <NumberInput source="capacity" />
      <EditButton />
    </Datagrid>
  </List>
);

export const SessionEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="description" />
      <DateTimeInput source="startTime" />
      <DateTimeInput source="endTime" />
      <NumberInput source="capacity" />
      <ReferenceInput source="eventId" reference="events">
        <SelectInput optionText="title" />
      </ReferenceInput>
      <ReferenceInput source="roomId" reference="rooms">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const SessionCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="description" />
      <DateTimeInput source="startTime" />
      <DateTimeInput source="endTime" />
      <NumberInput source="capacity" />
      <ReferenceInput source="eventId" reference="events">
        <SelectInput optionText="title" />
      </ReferenceInput>
      <ReferenceInput source="roomId" reference="rooms">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
