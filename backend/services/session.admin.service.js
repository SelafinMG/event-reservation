import pool from '../config/pg.js';

const fetchSessionById = async (sessionId) => {
  try {
    const { rows: [session] } = await pool.query(
      `SELECT
         s.*,
         r.id   AS room_id, r.name AS room_name,
         (NOW() BETWEEN s.start_time AND s.end_time) AS is_live
       FROM sessions s
       JOIN rooms r ON r.id = s.room_id
       WHERE s.id = $1`,
      [sessionId]
    );

    if (!session) return null;

    const { rows: speakers } = await pool.query(
      `SELECT sp.id, sp.full_name, sp.photo_url
       FROM speakers sp
       JOIN session_speakers ss ON ss.speaker_id = sp.id
       WHERE ss.session_id = $1`,
      [sessionId]
    );

    const { rows: questions } = await pool.query(
      'SELECT * FROM questions WHERE session_id = $1 ORDER BY upvotes DESC',
      [sessionId]
    );

    return {
      id: session.id,
      eventId: session.event_id,
      title: session.title,
      description: session.description,
      startTime: session.start_time,
      endTime: session.end_time,
      capacity: session.capacity,
      isLive: session.is_live,
      roomId: session.room_id,
      room: { id: session.room_id, name: session.room_name },
      speakers: speakers.map((sp) => ({
        id: sp.id,
        fullName: sp.full_name,
        photoUrl: sp.photo_url,
      })),
      questions: questions.map((q) => ({
        id: q.id,
        sessionId: q.session_id,
        content: q.content,
        authorName: q.author_name,
        upvotes: q.upvotes,
        createdAt: q.created_at,
      })),
    };
  } catch (err) {
    if (err.code === '22P02') return null;
    console.error('[fetchSessionById]', err.message);
    throw err;
  }
};

export const getAllSessionsService = async () => {
  try {
    const { rows } = await pool.query(
      `SELECT s.id, s.event_id AS "eventId", s.title, s.description,
              s.start_time AS "startTime", s.end_time AS "endTime",
              s.capacity, s.room_id AS "roomId", r.name AS "roomName",
              (NOW() BETWEEN s.start_time AND s.end_time) AS "isLive"
       FROM sessions s
       JOIN rooms r ON r.id = s.room_id
       ORDER BY s.start_time`
    );
    return rows;
  } catch (err) {
    console.error('[getAllSessionsService]', err.message);
    throw err;
  }
};

export const getSessionsByEventService = async (eventId, filters = {}) => {
  try {
    const { rows: [event] } = await pool.query(
      'SELECT id FROM events WHERE id = $1',
      [eventId]
    );
    if (!event) return null;

    let query = `
      SELECT s.id, s.title, s.start_time, s.end_time,
             r.id AS room_id, r.name AS room_name,
             (NOW() BETWEEN s.start_time AND s.end_time) AS is_live
      FROM sessions s
      JOIN rooms r ON r.id = s.room_id
      WHERE s.event_id = $1
    `;
    const params = [eventId];

    if (filters.roomId) {
      params.push(filters.roomId);
      query += ` AND s.room_id = $${params.length}`;
    }
    if (filters.live === 'true') {
      query += ' AND NOW() BETWEEN s.start_time AND s.end_time';
    }

    query += ' ORDER BY s.start_time';

    const { rows: sessions } = await pool.query(query, params);

    return sessions.map((s) => ({
      id: s.id,
      title: s.title,
      startTime: s.start_time,
      endTime: s.end_time,
      isLive: s.is_live,
      room: { id: s.room_id, name: s.room_name },
    }));
  } catch (err) {
    if (err.code === '22P02') return null;
    console.error('[getSessionsByEventService]', err.message);
    throw err;
  }
};

export const getSessionByIdService = async (sessionId) => {
  try {
    return await fetchSessionById(sessionId);
  } catch (err) {
    console.error('[getSessionByIdService]', err.message);
    throw err;
  }
};

export const createSessionService = async (eventId, body) => {
  try {
    const { title, description, startTime, endTime, roomId, capacity, speakerIds } = body;

    const { rows: [session] } = await pool.query(
      `INSERT INTO sessions (event_id, room_id, title, description, start_time, end_time, capacity)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [eventId, roomId, title, description, startTime, endTime, capacity]
    );

    for (const speakerId of speakerIds ?? []) {
      await pool.query(
        `INSERT INTO session_speakers (session_id, speaker_id)
         VALUES ($1, $2)
         ON CONFLICT DO NOTHING`,
        [session.id, speakerId]
      );
    }

    return fetchSessionById(session.id);
  } catch (err) {
    console.error('[createSessionService]', err.message);
    throw err;
  }
};

export const updateSessionService = async (sessionId, body) => {
  try {
    const { title, description, startTime, endTime, roomId, capacity, speakerIds } = body;

    const { rowCount } = await pool.query(
      `UPDATE sessions
       SET title=$1, description=$2, start_time=$3, end_time=$4, room_id=$5, capacity=$6
       WHERE id=$7`,
      [title, description, startTime, endTime, roomId, capacity, sessionId]
    );

    if (!rowCount) return null;

    if (speakerIds !== undefined) {
      await pool.query(
        'DELETE FROM session_speakers WHERE session_id = $1',
        [sessionId]
      );
      for (const speakerId of speakerIds) {
        await pool.query(
          'INSERT INTO session_speakers (session_id, speaker_id) VALUES ($1, $2)',
          [sessionId, speakerId]
        );
      }
    }

    return fetchSessionById(sessionId);
  } catch (err) {
    if (err.code === '22P02') return null;
    console.error('[updateSessionService]', err.message);
    throw err;
  }
};

export const deleteSessionService = async (sessionId) => {
  try {
    const { rowCount } = await pool.query(
      'DELETE FROM sessions WHERE id = $1',
      [sessionId]
    );
    return rowCount > 0;
  } catch (err) {
    if (err.code === '22P02') return false;
    console.error('[deleteSessionService]', err.message);
    throw err;
  }
};