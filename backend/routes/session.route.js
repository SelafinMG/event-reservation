import { Router } from "express"
import { createSessionQuestionController, getSessionQuestionsController, upvoteQuestionController } from "../controllers/session.controller.js"

const router = Router()

router.get("/:sessionId/questions", getSessionQuestionsController);
router.post("/:sessionId/questions", createSessionQuestionController);
router.post("/:sessionId/questions/:questionId/upvote", upvoteQuestionController);

export default router