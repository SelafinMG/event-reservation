import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";
import pool from "../config/pg.js";

async function createAdmin() {
  const email = "admin@example.com";
  const password = "supersecret";
  const passwordHash = await bcrypt.hash(password, 10);
    const result = await pool.query("SELECT current_database(), current_schema();");
    console.log("Connecté à :", result.rows[0]);

  await pool.query(
    "INSERT INTO admins (email, password_hash) VALUES ($1, $2)",
    [email, passwordHash]
  );

  console.log("Admin créé !");
}

createAdmin();
