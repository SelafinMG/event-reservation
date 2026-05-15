import pool from '../config/pg.js';

const fetchEventById = async (eventId) => {
  try {
    const { rows: [event] } = await pool.query(
      'SELECT * FROM events WHERE id = $1',
      [eventId]
    );

    if (!event) return null;

    const { rows: sessions } = await pool.query(
      `SELECT
         s.id, s.title, s.start_time, s.end_time,
         r.id   AS room_id, r.name AS room_name,
         (NOW() BETWEEN s.start_time AND s.end_time) AS is_live
       FROM sessions s
       JOIN rooms r ON r.id = s.room_id
       WHERE s.event_id = $1
       ORDER BY s.start_time`,
      [eventId]
    );

    for (const session of sessions) {
      const { rows: speakers } = await pool.query(
        `SELECT sp.id, sp.full_name, sp.photo_url
         FROM speakers sp
         JOIN session_speakers ss ON ss.speaker_id = sp.id
         WHERE ss.session_id = $1`,
        [session.id]
      );

      session.room = { id: session.room_id, name: session.room_name };
      session.isLive = session.is_live;
      session.startTime = session.start_time;
      session.endTime = session.end_time;
      session.speakers = speakers.map((sp) => ({
        id: sp.id,
        fullName: sp.full_name,
        photoUrl: sp.photo_url,
      }));

      delete session.room_id;
      delete session.room_name;
      delete session.start_time;
      delete session.end_time;
      delete session.is_live;
    }

    return {
      id: event.id,
      title: event.title,
      description: event.description,
      startDate: event.start_date,
      endDate: event.end_date,
      location: event.location,
      sessions,
    };
  } catch (err) {
    // 22P02 = invalid UUID format → treat as not found
    if (err.code === '22P02') return null;
    console.error('[fetchEventById]', err.message);
    throw err;
  }
};

export const getAllEventsService = async () => {
  try {
    const { rows } = await pool.query(
      'SELECT id FROM events ORDER BY start_date'
    );
    return Promise.all(rows.map((row) => fetchEventById(row.id)));
  } catch (err) {
    console.error('[getAllEventsService]', err.message);
    throw err;
  }
};

export const getEventByIdService = async (eventId) => {
  try {
    return await fetchEventById(eventId);
  } catch (err) {
    console.error('[getEventByIdService]', err.message);
    throw err;
  }
};

export const createEventService = async ({ title, description, startDate, endDate, location }) => {
  try {
    const { rows: [event] } = await pool.query(
      `INSERT INTO events (title, description, start_date, end_date, location)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [title, description, startDate, endDate, location]
    );
    return fetchEventById(event.id);
  } catch (err) {
    console.error('[createEventService]', err.message);
    throw err;
  }
};

export const updateEventService = async (eventId, { title, description, startDate, endDate, location }) => {
  try {
    const { rowCount } = await pool.query(
      `UPDATE events
       SET title=$1, description=$2, start_date=$3, end_date=$4, location=$5
       WHERE id=$6`,
      [title, description, startDate, endDate, location, eventId]
    );
    if (!rowCount) return null;
    return fetchEventById(eventId);
  } catch (err) {
    if (err.code === '22P02') return null;
    console.error('[updateEventService]', err.message);
    throw err;
  }
};

export const deleteEventService = async (eventId) => {
  try {
    const { rowCount } = await pool.query(
      'DELETE FROM events WHERE id = $1',
      [eventId]
    );
    return rowCount > 0;
  } catch (err) {
    if (err.code === '22P02') return null;
    console.error('[deleteEventService]', err.message);
    throw err;
  }
};