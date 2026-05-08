import pool from '../config/pg.js';

export const getRoomsByEventService = async (eventId) => {
  const { rows } = await pool.query(
    'SELECT id, name FROM rooms WHERE event_id = $1 ORDER BY name',
    [eventId]
  );
  return rows;
};

export const createRoomService = async (eventId, name) => {
  const { rows: [room] } = await pool.query(
    'INSERT INTO rooms (event_id, name) VALUES ($1, $2) RETURNING id, name',
    [eventId, name]
  );
  return room;
};

export const updateRoomService = async (roomId, name) => {
  const { rows: [room] } = await pool.query(
    'UPDATE rooms SET name = $1 WHERE id = $2 RETURNING id, name',
    [name, roomId]
  );
  return room ?? null;
};

export const deleteRoomService = async (roomId) => {
  const { rowCount } = await pool.query(
    'DELETE FROM rooms WHERE id = $1',
    [roomId]
  );
  return rowCount > 0;
};