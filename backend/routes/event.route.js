import { Router } from "express"
import { requireAuth } from "../middlewares/auth.middleware.js"
import {
  getAllEventsController,
  getEventByIdController,
  createEventController,
  updateEventController,
  deleteEventController,
} from "../controllers/event.controller.js"
import { sessionsByEventRouter } from "./session.admin.route.js"

const router = Router()

router.get("/", getAllEventsController)
router.get("/:eventId", getEventByIdController)
router.post("/", requireAuth, createEventController)
router.put("/:eventId", requireAuth, updateEventController)
router.delete("/:eventId", requireAuth, deleteEventController)
router.use("/:eventId/sessions", sessionsByEventRouter)

export default router
