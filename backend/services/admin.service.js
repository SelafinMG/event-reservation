import pool from "../config/pg.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginAdminService = async (email, password) => {
  const { rows } = await pool.query("SELECT * FROM admins WHERE email = $1", [email]);
  const admin = rows[0];
  if (!admin) return null;

  const match = await bcrypt.compare(password, admin.password_hash);
  if (!match) return null;

  const token = jwt.sign(
    { id: admin.id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  return { token };
};
