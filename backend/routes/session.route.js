import { Router } from "express"
import { getSessionQuestionsController } from "../controllers/session.controller.js"

const router = Router()

router.get("/", (req, res) => {
    res.send("Session route")
})


router.get("/:sessionId/questions", getSessionQuestionsController)

export default router