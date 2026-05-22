import pool from "../config/pg.js"

export const getFavoriteSessionsService = async () => {
  try {
    const { rows } = await pool.query(
      `SELECT f.session_id
       FROM favorites f
       ORDER BY f.created_at DESC`
    )

    const sessions = []
    for (const row of rows) {
      const { session_id } = row

      const { rows: [session] } = await pool.query(
        `SELECT s.id, s.title, s.start_time, s.end_time, s.capacity,
                r.id AS room_id, r.name AS room_name,
                s.event_id,
                (NOW() BETWEEN s.start_time AND s.end_time) AS is_live
         FROM sessions s
         JOIN rooms r ON r.id = s.room_id
         WHERE s.id = $1`,
        [session_id]
      )

      if (!session) continue

      const { rows: speakers } = await pool.query(
        `SELECT sp.id, sp.full_name, sp.photo_url
         FROM speakers sp
         JOIN session_speakers ss ON ss.speaker_id = sp.id
         WHERE ss.session_id = $1`,
        [session.id]
      )

      sessions.push({
        id: session.id,
        title: session.title,
        startTime: session.start_time,
        endTime: session.end_time,
        capacity: session.capacity,
        eventId: session.event_id,
        room: { id: session.room_id, name: session.room_name },
        isLive: session.is_live,
        speakers: speakers.map((sp) => ({
          id: sp.id,
          fullName: sp.full_name,
          photoUrl: sp.photo_url,
        })),
      })
    }

    return sessions
  } catch (err) {
    console.error("[getFavoriteSessionsService]", err.message)
    throw err
  }
}

export const addFavoriteSessionService = async (sessionId) => {
  try {

    const { rowCount } = await pool.query(
      "SELECT 1 FROM sessions WHERE id = $1",
      [sessionId]
    )
    if (!rowCount) throw new Error("Session not found")

    const { rowCount: favCount } = await pool.query(
      "SELECT 1 FROM favorites WHERE session_id = $1",
      [sessionId]
    )
    if (favCount) {
      return { id: sessionId, alreadyFavorite: true }
    }

    await pool.query(
      `INSERT INTO favorites (session_id, created_at)
       VALUES ($1, NOW())`,
      [sessionId]
    )

    return { id: sessionId, added: true }
  } catch (err) {
    console.error("[addFavoriteSessionService]", err.message)
    throw err
  }
}

export const removeFavoriteSessionService = async (sessionId) => {
  try {
    const { rowCount } = await pool.query(
      "DELETE FROM favorites WHERE session_id = $1",
      [sessionId]
    )
    return rowCount > 0
  } catch (err) {
    console.error("[removeFavoriteSessionService]", err.message)
    throw err
  }
}
