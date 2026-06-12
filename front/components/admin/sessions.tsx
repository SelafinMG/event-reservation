// @ts-nocheck
import { List, Datagrid, TextField, DateField, EditButton, Edit, SimpleForm, TextInput, DateInput, NumberInput, ReferenceInput, SelectInput, Create } from "react-admin";

export const SessionList = () => (
  <List>
    <Datagrid>
      <TextField source="title" />
      <TextField source="description" />
      <DateField source="startTime" />
      <DateField source="endTime" />
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
      <DateInput source="startTime" />
      <DateInput source="endTime" />
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
      <DateInput source="startTime" />
      <DateInput source="endTime" />
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
