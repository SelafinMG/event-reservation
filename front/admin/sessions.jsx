import { List, Datagrid, TextField, DateField, EditButton, Edit, SimpleForm, TextInput, DateInput, NumberInput, ReferenceInput, SelectInput, Create } from "react-admin";

export const SessionList = () => (
  <List>
    <Datagrid>
      <TextField source="title" />
      <TextField source="description" />
      <DateField source="start_time" />
      <DateField source="end_time" />
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
      <DateInput source="start_time" />
      <DateInput source="end_time" />
      <NumberInput source="capacity" />
      <ReferenceInput source="event_id" reference="events">
        <SelectInput optionText="title" />
      </ReferenceInput>
      <ReferenceInput source="room_id" reference="rooms">
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
      <DateInput source="start_time" />
      <DateInput source="end_time" />
      <NumberInput source="capacity" />
      <ReferenceInput source="event_id" reference="events">
        <SelectInput optionText="title" />
      </ReferenceInput>
      <ReferenceInput source="room_id" reference="rooms">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
