// @ts-nocheck
import { loginAdmin } from "@/data/auth";

export const authProvider = {
  login: async ({ username, password }) => {
    try {
      const email = username || "";
      const data = await loginAdmin(email, password);

      if (!data?.token) {
        return Promise.reject("Identifiants invalides");
      }

      localStorage.setItem("token", data.token);
      return Promise.resolve();
    } catch {
      return Promise.reject("Identifiants invalides");
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("auth");
    return Promise.resolve();
  },

  checkAuth: () => {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  },

  checkError: (error) => {
    const status = error?.status ?? error?.response?.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("auth");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: () => Promise.resolve(),
};
