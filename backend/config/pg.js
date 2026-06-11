import dotenv from "dotenv"
dotenv.config({ path: "../.env" })

import { Pool } from "pg"

const pool = new Pool({
  user: String(process.env.DB_USER || "postgres"),
  host: String(process.env.DB_HOST || "localhost"),
  database: String(process.env.DB_NAME || "event_reservation"),
  password: String(process.env.DB_PASSWORD || ""),
  port: Number(process.env.DB_PORT || 5432),
})

export default pool
