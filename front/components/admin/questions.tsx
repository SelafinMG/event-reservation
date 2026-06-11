// @ts-nocheck
import { List, Datagrid, TextField, NumberField, DateField, EditButton, Edit, SimpleForm, TextInput, NumberInput, ReferenceInput, SelectInput, Create } from "react-admin";

export const QuestionList = () => (
  <List>
    <Datagrid>
      <TextField source="content" />
      <TextField source="authorName" />
      <NumberField source="upvotes" />
      <DateField source="createdAt" />
      <EditButton />
    </Datagrid>
  </List>
);

export const QuestionEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="content" />
      <TextInput source="authorName" />
      <NumberInput source="upvotes" />
      <ReferenceInput source="sessionId" reference="sessions">
        <SelectInput optionText="title" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const QuestionCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="content" />
      <TextInput source="authorName" />
      <NumberInput source="upvotes" />
      <ReferenceInput source="sessionId" reference="sessions">
        <SelectInput optionText="title" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
