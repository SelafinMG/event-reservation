// backend/test-db.js
import dotenv from "dotenv"
dotenv.config({ path: "../.env" })

import pool from "./pg.js"

async function testConnection() {
  console.log("User lu:", process.env.DB_USER)
  console.log("Password lu:", process.env.DB_PASSWORD)

  try {
    const res = await pool.query("SELECT NOW()")
    console.log("Connexion réussie :", res.rows[0])
  } catch (err) {
    console.error("Erreur de connexion :", err.message)
  } finally {
    pool.end()
  }
}

testConnection()
