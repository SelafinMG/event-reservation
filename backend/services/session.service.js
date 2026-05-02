import pool from "../config/pg.js";

export const getSessionQuestionsService = async (sessionId) => {
    try {
        const sessionQuery = "SELECT * FROM sessions WHERE id = $1";
        const sessionRequest = await pool.query(sessionQuery, [sessionId]);
        if(sessionRequest.rowCount === 0) {
            throw new Error("Session not found");
        }
        const getQUestionsQuery = "SELECT * FROM questions WHERE session_id = $1";
        const questionRequest = await pool.query(getQUestionsQuery, [sessionId]);
        return questionRequest.rows;
        
    } catch (error) {
        throw error;
        
    }
}

export const createSessionQuestionService = async (sessionId, question) => {
    try {
        const sessionQuery = "SELECT * FROM sessions WHERE id = $1";
        const sessionRequest = await pool.query(sessionQuery, [sessionId]);
        if(sessionRequest.rowCount === 0) {
            throw new Error("Session not found");
        }
        const questions = await getSessionQuestionsService(sessionId);
        const questionCount = questions.length;
        const questionIdPrefix = "q-";
        const questionId = questionIdPrefix + (questionCount + 1);
        const createQuestionQuery = "INSERT INTO questions (id, session_id, question) VALUES ($1, $2, $3) RETURNING *";
        const questionRequest = await pool.query(createQuestionQuery, [questionId, sessionId, question]);
        return questionRequest.rows[0];
    } catch (error) {
        throw error;
    }
}

export const upvoteQUestionService = async (questionId, sessionId) => {
    try {
        const sessionQuery = "SELECT * FROM sessions WHERE id = $1";
        const sessionRequest = await pool.query(sessionQuery, [sessionId]);
        if(sessionRequest.rowCount === 0) {
            throw new Error("Session not found");
        }
        const questionQuery = "SELECT * FROM questions WHERE id = $1";
        const questionRequest = await pool.query(questionQuery, [questionId]);
        if(questionRequest.rowCount === 0) {
            throw new Error("Question not found");
        }
        const upvoteQuery = "UPDATE questions SET upvotes = upvotes + 1 WHERE id = $1 RETURNING *";
        const upvoteRequest = await pool.query(upvoteQuery, [questionId]);
        return upvoteRequest.rows[0];
        
    } catch (error) {
        throw error;
        
    }
}