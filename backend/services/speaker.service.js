import pool from '../config/pg.js';

const fetchSpeakerById = async (speakerId) => {
  const { rows: [speaker] } = await pool.query(
    'SELECT * FROM speakers WHERE id = $1',
    [speakerId]
  );

  if (!speaker) return null;

  const { rows: links } = await pool.query(
    'SELECT type, url FROM speaker_links WHERE speaker_id = $1',
    [speakerId]
  );

  const { rows: sessions } = await pool.query(
    `SELECT
       s.id, s.title, s.start_time, s.end_time,
       r.id AS room_id, r.name AS room_name,
       (NOW() BETWEEN s.start_time AND s.end_time) AS is_live
     FROM sessions s
     JOIN rooms r ON r.id = s.room_id
     JOIN session_speakers ss ON ss.session_id = s.id
     WHERE ss.speaker_id = $1
     ORDER BY s.start_time`,
    [speakerId]
  );

  return {
    id: speaker.id,
    fullName: speaker.full_name,
    photoUrl: speaker.photo_url,
    bio: speaker.bio,
    links, 
    sessions: sessions.map((s) => ({
      id: s.id,
      title: s.title,
      startTime: s.start_time,
      endTime: s.end_time,
      isLive: s.is_live,
      room: { id: s.room_id, name: s.room_name },
    })),
  };
};

export const getAllSpeakersService = async () => {
  const { rows } = await pool.query('SELECT id FROM speakers ORDER BY full_name');
  return Promise.all(rows.map((row) => fetchSpeakerById(row.id)));
};

export const getSpeakerByIdService = async (speakerId) => {
  return fetchSpeakerById(speakerId);
};

export const createSpeakerService = async ({ fullName, photoUrl, bio, links }) => {
  const { rows: [speaker] } = await pool.query(
    'INSERT INTO speakers (full_name, photo_url, bio) VALUES ($1, $2, $3) RETURNING id',
    [fullName, photoUrl, bio]
  );

  for (const link of links ?? []) {
    await pool.query(
      'INSERT INTO speaker_links (speaker_id, type, url) VALUES ($1, $2, $3)',
      [speaker.id, link.type, link.url]
    );
  }

  return fetchSpeakerById(speaker.id);
};

export const updateSpeakerService = async (speakerId, { fullName, photoUrl, bio, links }) => {
  const { rowCount } = await pool.query(
    'UPDATE speakers SET full_name=$1, photo_url=$2, bio=$3 WHERE id=$4',
    [fullName, photoUrl, bio, speakerId]
  );

  if (!rowCount) return null;

  if (links !== undefined) {
    await pool.query('DELETE FROM speaker_links WHERE speaker_id = $1', [speakerId]);
    for (const link of links) {
      await pool.query(
        'INSERT INTO speaker_links (speaker_id, type, url) VALUES ($1, $2, $3)',
        [speakerId, link.type, link.url]
      );
    }
  }

  return fetchSpeakerById(speakerId);
};

export const deleteSpeakerService = async (speakerId) => {
  const { rowCount } = await pool.query(
    'DELETE FROM speakers WHERE id = $1',
    [speakerId]
  );
  return rowCount > 0;
};