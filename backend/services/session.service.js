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