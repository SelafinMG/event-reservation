import { getSessionQuestionsService } from "../services/session.service.js";


export const getSessionQuestionsController = async(req, res) => {
    const { sessionId } = req.params;
    const questions = await getSessionQuestionsService(sessionId);
    res.json(questions);
}