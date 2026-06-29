// @ts-nocheck
import { List, Datagrid, TextField, ReferenceField, EditButton, Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, Create, required } from "react-admin";

export const RoomList = () => (
  <List>
    <Datagrid>
      <TextField source="name" />
      <ReferenceField source="eventId" reference="events" label="Event">
        <TextField source="title" />
      </ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
);

export const RoomEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
      <ReferenceInput source="eventId" reference="events">
        <SelectInput optionText="title" validate={required()} />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const RoomCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
      <ReferenceInput source="eventId" reference="events">
        <SelectInput optionText="title" validate={required()} />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
