import { Admin, Resource } from "react-admin";
import { authProvider } from "./authProvider";
import dataProvider from "./dataProvider";
import { EventList, EventEdit, EventCreate } from "./events";
import { RoomList, RoomEdit, RoomCreate } from "./room";
import { SessionList, SessionEdit, SessionCreate } from "./sessions";
import { SpeakerList, SpeakerEdit, SpeakerCreate } from "./speakers";
import { QuestionList, QuestionEdit, QuestionCreate } from "./questions";

export const AppAdmin = () => (
  <Admin basename="/admin" dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="events" list={EventList} edit={EventEdit} create={EventCreate} />
    <Resource name="rooms" list={RoomList} edit={RoomEdit} create={RoomCreate} />
    <Resource name="sessions" list={SessionList} edit={SessionEdit} create={SessionCreate} />
    <Resource name="speakers" list={SpeakerList} edit={SpeakerEdit} create={SpeakerCreate} />
    <Resource name="questions" list={QuestionList} edit={QuestionEdit} create={QuestionCreate} />
  </Admin>
);
