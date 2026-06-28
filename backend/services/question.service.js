import pool from '../config/pg.js';

const mapQuestion = (q) => ({
  id: q.id,
  sessionId: q.session_id,
  content: q.content,
  authorName: q.author_name,
  upvotes: q.upvotes,
  createdAt: q.created_at,
});

export const getAllQuestionsService = async () => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM questions ORDER BY created_at DESC'
    );
    return rows.map(mapQuestion);
  } catch (err) {
    console.error('[getAllQuestionsService]', err.message);
    throw err;
  }
};

export const getQuestionByIdService = async (questionId) => {
  try {
    const { rows: [question] } = await pool.query(
      'SELECT * FROM questions WHERE id = $1',
      [questionId]
    );
    return question ? mapQuestion(question) : null;
  } catch (err) {
    if (err.code === '22P02') return null;
    console.error('[getQuestionByIdService]', err.message);
    throw err;
  }
};

export const createQuestionService = async ({ sessionId, content, authorName }) => {
  try {
    const { rows: [question] } = await pool.query(
      'INSERT INTO questions (session_id, content, author_name) VALUES ($1, $2, $3) RETURNING *',
      [sessionId, content, authorName ?? null]
    );
    return mapQuestion(question);
  } catch (err) {
    console.error('[createQuestionService]', err.message);
    throw err;
  }
};

export const updateQuestionService = async (questionId, { content, authorName, upvotes }) => {
  try {
    const { rows: [question] } = await pool.query(
      `UPDATE questions
       SET content = COALESCE($1, content),
           author_name = COALESCE($2, author_name),
           upvotes = COALESCE($3, upvotes)
       WHERE id = $4
       RETURNING *`,
      [content ?? null, authorName ?? null, upvotes ?? null, questionId]
    );
    return question ? mapQuestion(question) : null;
  } catch (err) {
    if (err.code === '22P02') return null;
    console.error('[updateQuestionService]', err.message);
    throw err;
  }
};

export const deleteQuestionService = async (questionId) => {
  try {
    const { rowCount } = await pool.query(
      'DELETE FROM questions WHERE id = $1',
      [questionId]
    );
    return rowCount > 0;
  } catch (err) {
    if (err.code === '22P02') return false;
    console.error('[deleteQuestionService]', err.message);
    throw err;
  }
};
