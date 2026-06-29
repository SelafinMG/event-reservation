import pool from '../config/pg.js';

export const getRoomsByEventService = async (eventId) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, name FROM rooms WHERE event_id = $1 ORDER BY name',
      [eventId]
    );
    return rows;
  } catch (err) {
    if (err.code === '22P02') return [];
    console.error('[getRoomsByEventService]', err.message);
    throw err;
  }
};

export const getAllRoomsService = async () => {
  try {
    const { rows } = await pool.query(
      `SELECT r.id, r.name, r.event_id AS "eventId", e.title
       AS "eventName"
       FROM rooms r
       LEFT JOIN events e ON e.id = r.event_id
       ORDER BY r.name`
    );
    return rows;
  } catch (err) {
    console.error('[getAllRoomsService]', err.message);
    throw err;
  }
};

export const getRoomByIdService = async (roomId) => {
  try {
    const { rows: [room] } = await pool.query(
      `SELECT r.id, r.name, r.event_id AS "eventId", e.title AS "eventName"
       FROM rooms r
       LEFT JOIN events e ON e.id = r.event_id
       WHERE r.id = $1`,
      [roomId]
    );
    return room ?? null;
  } catch (err) {
    if (err.code === '22P02') return null;
    console.error('[getRoomByIdService]', err.message);
    throw err;
  }
};

export const createRoomService = async (eventId, name) => {
  try {
    const { rows: [room] } = await pool.query(
      'INSERT INTO rooms (event_id, name) VALUES ($1, $2) RETURNING id, name',
      [eventId, name]
    );
    return room;
  } catch (err) {
    console.error('[createRoomService]', err.message);
    throw err;
  }
};

export const updateRoomService = async (roomId, name) => {
  try {
    const { rows: [room] } = await pool.query(
      'UPDATE rooms SET name = $1 WHERE id = $2 RETURNING id, name',
      [name, roomId]
    );
    return room ?? null;
  } catch (err) {
    if (err.code === '22P02') return null;
    console.error('[updateRoomService]', err.message);
    throw err;
  }
};

export const deleteRoomService = async (roomId) => {
  try {
    const { rowCount } = await pool.query(
      'DELETE FROM rooms WHERE id = $1',
      [roomId]
    );
    return rowCount > 0;
  } catch (err) {
    if (err.code === '22P02') return false;
    console.error('[deleteRoomService]', err.message);
    throw err;
  }
};