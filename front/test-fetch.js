import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
})

async function run() {
  try {
    const res = await api.get("/v1/speakers/296a50fe-7123-4b25-a7d1-7a961b9d7cdb")
    console.log("Success:", res.data)
  } catch (err) {
    console.error("Error:", err.message)
  }
}

run()
