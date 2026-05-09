import { createSessionQuestionService, getSessionByIdService, getSessionQuestionsService, upvoteQUestionService } from "../services/session.service.js";


export const getSessionQuestionsController = async(req, res) => {
    try {
        const { sessionId } = req.params;
        if(!sessionId) {
            return res.status(400).json({ error: "Session ID is required" });
        }
        const questions = await getSessionQuestionsService(sessionId);
        return res.status(200).json(questions);
    } catch (error) {
        if (error.message === "Session not found") {
            return res.status(404).json({ code: "NOT_FOUND", message: error.message });
        }
        return res.status(500).json({ code: "INTERNAL_SERVER_ERROR", message: error.message });
    }
}

export const getSessionByIdController = async(req, res) => {
    try {
        const { sessionId } = req.params;
        if(!sessionId) {
            return res.status(400).json({ error: "Session ID is required" });
        }
        const session = await getSessionByIdService(sessionId);
        return res.status(200).json(session);
    } catch (error) {
        if (error.message === "Session not found") {
            return res.status(404).json({ code: "NOT_FOUND", message: error.message });
        }
        return res.status(500).json({ code: "INTERNAL_SERVER_ERROR", message: error.message });
    }
}

export const createSessionQuestionController = async(req, res) => {
    try {
        const { sessionId } = req.params;
        const { content, authorName } = req.body;
        if(!sessionId) {
            return res.status(400).json({ code: "VALIDATION_ERROR", message: "Session ID is required" });
        }
        if(!content) {
            return res.status(400).json({ code: "VALIDATION_ERROR", message: "Content is required" });
        }
        const questionRequest = await createSessionQuestionService(sessionId, content, authorName);
        return res.status(201).json(questionRequest);
    } catch (error) {
        if (error.code === "SESSION_NOT_LIVE") {
            return res.status(409).json({ code: error.code, message: error.message });
        }
        if (error.message === "Session not found") {
            return res.status(404).json({ code: "NOT_FOUND", message: error.message });
        }
        return res.status(500).json({ code: "INTERNAL_SERVER_ERROR", message: error.message });
    }
}

export const upvoteQuestionController = async(req, res) => {
    try {
        const { sessionId, questionId } = req.params;
        if(!sessionId) {
            return res.status(400).json({ code: "VALIDATION_ERROR", message: "Session ID is required" });
        }
        if(!questionId) {
            return res.status(400).json({ code: "VALIDATION_ERROR", message: "Question ID is required" });
        }
        const questionRequest = await upvoteQUestionService(questionId, sessionId);
        return res.status(200).json(questionRequest);
    } catch (error) {
        if (error.code === "SESSION_NOT_LIVE") {
            return res.status(409).json({ code: error.code, message: error.message });
        }
        if (error.message === "Session not found" || error.message.includes("not found")) {
            return res.status(404).json({ code: "NOT_FOUND", message: error.message });
        }
        return res.status(500).json({ code: "INTERNAL_SERVER_ERROR", message: error.message });
    }
}