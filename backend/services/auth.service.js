import pool from '../config/pg.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginService = async (email, password) => {
  const { rows } = await pool.query(
    'SELECT * FROM admins WHERE email = $1',
    [email]
  );

  const admin = rows[0];

  if (!admin) return null;

  const isPasswordValid = await bcrypt.compare(password, admin.password_hash);
  if (!isPasswordValid) return null;

  const expiresIn = '8h';
  const token = jwt.sign(
    { id: admin.id, email: admin.email }, 
    process.env.JWT_SECRET,
    { expiresIn }
  );

  const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString();

  return { token, expiresAt };
};

export const registerAdminService = async (email, password) => {
  const passwordHash = await bcrypt.hash(password, 10);

  const { rows } = await pool.query(
    'INSERT INTO admins (email, password_hash) VALUES ($1, $2) RETURNING id, email',
    [email, passwordHash]
  );

  return rows[0];
};