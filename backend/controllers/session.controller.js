import { createSessionQuestionService, getSessionQuestionsService } from "../services/session.service.js";


export const getSessionQuestionsController = async(req, res) => {
    const { sessionId } = req.params;
    if(!sessionId) {
        return res.status(400).json({ error: "Session ID is required" });
    }
    const questions = await getSessionQuestionsService(sessionId);
    if(!questions) {
        return res.status(404).json({ error: "Session not found" });
    }
    return res.status(200).json(questions);
}

export const createSessionQuestionController = async(req, res) => {
    const { sessionId } = req.params;
    const { question } = req.body;
    if(!sessionId) {
        return res.status(400).json({ error: "Session ID is required" });
    }
    if(!question) {
        return res.status(400).json({ error: "Question is required" });
    }
    const questionRequest = await createSessionQuestionService(sessionId, question);
    return res.status(200).json(questionRequest);
}