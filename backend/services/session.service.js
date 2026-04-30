import pool from "../config/pg.js";

export const getSessionQuestionsService = async (sessionId) => {
    try {
        const getQUestionsQuery = "SELECT * FROM questions WHERE session_id = $1";
        const questionRequest = await pool.query(getQUestionsQuery, [sessionId]);
        return questionRequest.rows;
        
    } catch (error) {
        throw error;
        
    }
}