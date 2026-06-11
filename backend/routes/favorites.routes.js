import { Router } from "express"
import { requireAuth } from "../middlewares/auth.middleware.js"
import {
  getFavoriteSessionsController,
  addFavoriteSessionController,
  removeFavoriteSessionController,
} from "../controllers/favorites.controller.js"

const router = Router()

router.get("/sessions", requireAuth, getFavoriteSessionsController)

router.post("/:sessionId", requireAuth, addFavoriteSessionController)

router.delete("/:sessionId", requireAuth, removeFavoriteSessionController)

export default router
