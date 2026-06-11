import pool from "../config/pg.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginAdminService = async (email, password) => {
  const { rows } = await pool.query("SELECT * FROM admins WHERE email = $1", [email]);
  const admin = rows[0];
  if (!admin) return null;

  const match = await bcrypt.compare(password, admin.password_hash);
  if (!match) return null;

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set. Define it in your environment or .env file.");
  }

  const token = jwt.sign({ id: admin.id, email: admin.email }, secret, {
    expiresIn: "2h",
  });

  return { token };
};
