import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { EventList, EventEdit, EventCreate } from "./events";
import { RoomList, RoomEdit, RoomCreate } from "./rooms";
import { SessionList, SessionEdit, SessionCreate } from "./sessions";
import { SpeakerList, SpeakerEdit, SpeakerCreate } from "./speakers";
import { QuestionList, QuestionEdit, QuestionCreate } from "./questions";

const dataProvider = simpleRestProvider("http://localhost:3001");

const authProvider = {
  login: ({ username, password }) => {
    localStorage.setItem("auth", JSON.stringify({ username }));
    return Promise.resolve();
  },
  logout: () => {
    localStorage.removeItem("auth");
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem("auth") ? Promise.resolve() : Promise.reject(),
};

export const AppAdmin = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="events" list={EventList} edit={EventEdit} create={EventCreate} />
    <Resource name="rooms" list={RoomList} edit={RoomEdit} create={RoomCreate} />
    <Resource name="sessions" list={SessionList} edit={SessionEdit} create={SessionCreate} />
    <Resource name="speakers" list={SpeakerList} edit={SpeakerEdit} create={SpeakerCreate} />
    <Resource name="questions" list={QuestionList} edit={QuestionEdit} create={QuestionCreate} />
  </Admin>
);
