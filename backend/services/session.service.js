import pool from "../config/pg.js";

export const getSessionQuestionsService = async (sessionId) => {
    try {
        const sessionQuery = "SELECT * FROM sessions WHERE id = $1";
        const sessionRequest = await pool.query(sessionQuery, [sessionId]);
        if(sessionRequest.rowCount === 0) {
            throw new Error("Session not found");
        }
        const getQuestionsQuery = "SELECT * FROM questions WHERE session_id = $1 ORDER BY upvotes DESC, created_at DESC";
        const questionRequest = await pool.query(getQuestionsQuery, [sessionId]);
        return questionRequest.rows;
        
    } catch (error) {
        throw error;
    }
}

export const getSessionByIdService = async (sessionId) => {
    try {
        const sessionQuery = `
            SELECT s.*, r.name as room_name 
            FROM sessions s
            JOIN rooms r ON s.room_id = r.id
            WHERE s.id = $1
        `;
        const sessionRequest = await pool.query(sessionQuery, [sessionId]);
        
        if (sessionRequest.rowCount === 0) {
            throw new Error("Session not found");
        }
        
        const session = sessionRequest.rows[0];
        
        // Fetch speakers
        const speakersQuery = `
            SELECT sp.* 
            FROM speakers sp
            JOIN session_speakers ss ON sp.id = ss.speaker_id
            WHERE ss.session_id = $1
        `;
        const speakersRequest = await pool.query(speakersQuery, [sessionId]);
        
        // Fetch questions (sorted by upvotes)
        const questions = await getSessionQuestionsService(sessionId);
        
        const now = new Date();
        const isLive = now >= new Date(session.start_time) && now <= new Date(session.end_time);
        
        return {
            id: session.id,
            eventId: session.event_id,
            title: session.title,
            description: session.description,
            startTime: session.start_time,
            endTime: session.end_time,
            room: {
                id: session.room_id,
                name: session.room_name
            },
            capacity: session.capacity,
            isLive: isLive,
            speakers: speakersRequest.rows,
            questions: questions
        };
    } catch (error) {
        throw error;
    }
}

export const createSessionQuestionService = async (sessionId, questionContent, authorName = null) => {
    try {
        const sessionQuery = "SELECT * FROM sessions WHERE id = $1";
        const sessionRequest = await pool.query(sessionQuery, [sessionId]);
        if(sessionRequest.rowCount === 0) {
            throw new Error("Session not found");
        }
        
        const session = sessionRequest.rows[0];
        const now = new Date();
        const isLive = now >= new Date(session.start_time) && now <= new Date(session.end_time);
        
        if (!isLive) {
            const error = new Error("Les questions ne peuvent être posées que pendant une session en cours.");
            error.code = "SESSION_NOT_LIVE";
            throw error;
        }

        const createQuestionQuery = "INSERT INTO questions (session_id, content, author_name) VALUES ($1, $2, $3) RETURNING *";
        const questionRequest = await pool.query(createQuestionQuery, [sessionId, questionContent, authorName]);
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

        const session = sessionRequest.rows[0];
        const now = new Date();
        const isLive = now >= new Date(session.start_time) && now <= new Date(session.end_time);
        
        if (!isLive) {
            const error = new Error("Les upvotes ne sont autorisés que pendant une session en cours.");
            error.code = "SESSION_NOT_LIVE";
            throw error;
        }

        const questionQuery = "SELECT * FROM questions WHERE id = $1 AND session_id = $2";
        const questionRequest = await pool.query(questionQuery, [questionId, sessionId]);
        if(questionRequest.rowCount === 0) {
            throw new Error("Question not found in this session");
        }
        const upvoteQuery = "UPDATE questions SET upvotes = upvotes + 1 WHERE id = $1 RETURNING *";
        const upvoteRequest = await pool.query(upvoteQuery, [questionId]);
        return upvoteRequest.rows[0];
        
    } catch (error) {
        throw error;
    }
}