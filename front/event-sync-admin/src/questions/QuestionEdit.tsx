// src/questions/QuestionEdit.tsx
import { Edit, SimpleForm, TextInput, DateInput, ReferenceInput, SelectInput, required } from "react-admin"

export const QuestionEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="content" validate={required()} />
      <TextInput source="author" />
      <DateInput source="createdAt" />
      <ReferenceInput source="sessionId" reference="sessions">
        <SelectInput optionText="title" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
)
