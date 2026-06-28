import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import pkg from "pg"
const { Pool } = pkg

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Charger explicitement backend/.env
dotenv.config({ path: path.join(__dirname, "../.env") })

const pool = new Pool({
  user: String(process.env.DB_USER || "postgres"),
  host: String(process.env.DB_HOST || "localhost"),
  database: String(process.env.DB_NAME || "event-reservation"),
  password: String(process.env.DB_PASSWORD || ""),
  port: Number(process.env.DB_PORT || 5432),
})

async function check() {
  try {
    const { rows: speakers } = await pool.query("SELECT id, full_name FROM speakers")
    console.log("ALL SPEAKERS IN DB:", speakers)
  } catch (err) {
    console.error("Error:", err)
  } finally {
    pool.end()
  }
}

check()
