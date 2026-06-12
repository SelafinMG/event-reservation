import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const storedToken = localStorage.getItem("token") ?? localStorage.getItem("auth")

    if (storedToken) {
      let token = storedToken

      try {
        token = JSON.parse(storedToken)
      } catch {}

      config.headers.Authorization = `Bearer ${token}`
    }
  }

  return config
})

export default api
