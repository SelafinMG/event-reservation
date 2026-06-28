import { Admin, Resource } from "react-admin"
import jsonServerProvider from "ra-data-json-server"

import { EventList } from "./events/EventList"
import { EventCreate } from "./events/EventCreate"
import { EventEdit } from "./events/EventEdit"
import { EventShow } from "./events/EventShow"

import { SessionList } from "./sessions/SessionList"
import { SessionCreate } from "./sessions/SessionCreate"
import { SessionEdit } from "./sessions/SessionEdit"
import { SessionShow } from "./sessions/SessionShow"

import { SpeakerList } from "./speakers/SpeakerList"
import { SpeakerCreate } from "./speakers/SpeakerCreate"
import { SpeakerEdit } from "./speakers/SpeakerEdit"
import { SpeakerShow } from "./speakers/SpeakerShow"

import { RoomList } from "./rooms/RoomList"
import { RoomCreate } from "./rooms/RoomCreate"
import { RoomEdit } from "./rooms/RoomEdit"
import { RoomShow } from "./rooms/RoomShow"

import { QuestionList } from "./questions/QuestionList"
import { QuestionCreate } from "./questions/QuestionCreate"
import { QuestionEdit } from "./questions/QuestionEdit"
import { QuestionShow } from "./questions/QuestionShow"


import { Dashboard } from "./Dashboard"

const dataProvider = jsonServerProvider("http://localhost:3001/v1")

export const App = () => (
  <Admin dashboard={Dashboard} dataProvider={dataProvider}>
    <Resource name="events" list={EventList} create={EventCreate} edit={EventEdit} show={EventShow} />
    <Resource name="sessions" list={SessionList} create={SessionCreate} edit={SessionEdit} show={SessionShow} />
    <Resource name="speakers" list={SpeakerList} create={SpeakerCreate} edit={SpeakerEdit} show={SpeakerShow} />
    <Resource name="rooms" list={RoomList} create={RoomCreate} edit={RoomEdit} show={RoomShow} />
    <Resource name="questions" list={QuestionList} create={QuestionCreate} edit={QuestionEdit} show={QuestionShow} />
  </Admin>
)
