import api from "@/lib/api"
import type { LoginResponse } from "@/lib/types"

export async function loginAdmin(email: string, password: string) {
  const { data } = await api.post<LoginResponse>("/admins/login", { email, password })
  return data
}
