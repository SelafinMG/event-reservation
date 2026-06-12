import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import adminsRouter from "./routes/admins.routes.js"
import sessionRoute from "./routes/session.route.js"
import authRoute from "./routes/auth.route.js"
import eventRoute from "./routes/event.route.js"
import { roomsByEventRouter, roomsRouter } from "./routes/room.route.js"
import speakerRoute from "./routes/speaker.route.js"
import { sessionsByEventRouter, sessionsRouter } from "./routes/session.admin.route.js"
import favoritesRoute from "./routes/favorites.routes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/admins", adminsRouter)
app.use("/v1/auth", authRoute)
app.use("/v1/events", eventRoute)
app.use("/v1/events/:eventId/rooms", roomsByEventRouter)
app.use("/v1/rooms", roomsRouter)
app.use("/v1/sessions", sessionsRouter)
app.use("/v1/sessions", sessionRoute)
app.use("/v1/speakers", speakerRoute)
app.use("/v1/favorites", favoritesRoute)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ code: "SERVER_ERROR", message: "Internal server error." })
})

export default app
