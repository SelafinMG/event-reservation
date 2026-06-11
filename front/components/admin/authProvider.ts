// @ts-nocheck
import { loginAdmin } from "@/data/auth";

export const authProvider = {
  login: async ({ username, password }) => {
    try {
      const data = await loginAdmin(username, password);
      localStorage.setItem("auth", JSON.stringify(data.token));
      return Promise.resolve();
    } catch {
      return Promise.reject("Identifiants invalides");
    }
  },

  logout: () => {
    localStorage.removeItem("auth");
    return Promise.resolve();
  },

  checkAuth: () => {
    return localStorage.getItem("auth") ? Promise.resolve() : Promise.reject();
  },

  checkError: (error) => {
    if (error.status === 401 || error.status === 403) {
      localStorage.removeItem("auth");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: () => Promise.resolve(),
};
