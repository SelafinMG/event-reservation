import {
  getAllQuestionsService,
  getQuestionByIdService,
  createQuestionService,
  updateQuestionService,
  deleteQuestionService,
} from '../services/question.service.js';

export const getAllQuestionsController = async (req, res) => {
  const questions = await getAllQuestionsService();
  return res.status(200).json(questions);
};

export const getQuestionByIdController = async (req, res) => {
  const question = await getQuestionByIdService(req.params.questionId);

  if (!question) {
    return res.status(404).json({ code: 'NOT_FOUND', message: 'Question not found.' });
  }

  return res.status(200).json(question);
};

export const createQuestionController = async (req, res) => {
  const { sessionId, content } = req.body;

  if (!sessionId || !content) {
    return res.status(400).json({
      code: 'VALIDATION_ERROR',
      message: "Required fields: 'sessionId', 'content'.",
    });
  }

  const question = await createQuestionService(req.body);
  return res.status(201).json(question);
};

export const updateQuestionController = async (req, res) => {
  const question = await updateQuestionService(req.params.questionId, req.body);

  if (!question) {
    return res.status(404).json({ code: 'NOT_FOUND', message: 'Question not found.' });
  }

  return res.status(200).json(question);
};

export const deleteQuestionController = async (req, res) => {
  const deleted = await deleteQuestionService(req.params.questionId);

  if (!deleted) {
    return res.status(404).json({ code: 'NOT_FOUND', message: 'Question not found.' });
  }

  return res.status(204).send();
};
