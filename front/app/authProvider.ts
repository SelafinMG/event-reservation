// @ts-nocheck
import { loginAdmin } from "@/data/auth";

const authProvider = {
  login: async ({ username, password }) => {
    const email = username || "";
    const { token } = await loginAdmin(email, password);

    if (!token) {
      return Promise.reject("Identifiants invalides");
    }

    localStorage.setItem("token", token);
    return Promise.resolve();
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

export default authProvider;
