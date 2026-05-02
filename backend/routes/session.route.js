import { Router } from "express"
import { createSessionQuestionController, getSessionQuestionsController } from "../controllers/session.controller.js"

const router = Router()

router.get("/:sessionId/questions", getSessionQuestionsController);
router.post("/:sessionId/questions", createSessionQuestionController);

export default router