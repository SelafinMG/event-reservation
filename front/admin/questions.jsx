import { List, Datagrid, TextField, NumberField, DateField, EditButton, Edit, SimpleForm, TextInput, NumberInput, ReferenceInput, SelectInput, Create } from "react-admin";

export const QuestionList = () => (
  <List>
    <Datagrid>
      <TextField source="content" />
      <TextField source="author_name" />
      <NumberField source="upvotes" />
      <DateField source="created_at" />
      <EditButton />
    </Datagrid>
  </List>
);

export const QuestionEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="content" />
      <TextInput source="author_name" />
      <NumberInput source="upvotes" />
      <ReferenceInput source="session_id" reference="sessions">
        <SelectInput optionText="title" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const QuestionCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="content" />
      <TextInput source="author_name" />
      <NumberInput source="upvotes" />
      <ReferenceInput source="session_id" reference="sessions">
        <SelectInput optionText="title" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
