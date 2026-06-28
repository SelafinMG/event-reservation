import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import {
  getAllQuestionsController,
  getQuestionByIdController,
  createQuestionController,
  updateQuestionController,
  deleteQuestionController,
} from '../controllers/question.controller.js';

const router = Router();

router.get('/', getAllQuestionsController);
router.get('/:questionId', getQuestionByIdController);
router.post('/', requireAuth, createQuestionController);
router.put('/:questionId', requireAuth, updateQuestionController);
router.delete('/:questionId', requireAuth, deleteQuestionController);

export default router;
