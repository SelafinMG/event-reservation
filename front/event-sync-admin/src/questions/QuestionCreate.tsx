// src/questions/QuestionCreate.tsx
import { Create, SimpleForm, TextInput, DateInput, ReferenceInput, SelectInput, required } from "react-admin"

export const QuestionCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="content" validate={required()} />
      <TextInput source="author" />
      <DateInput source="createdAt" />
      <ReferenceInput source="sessionId" reference="sessions">
        <SelectInput optionText="title" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
)
