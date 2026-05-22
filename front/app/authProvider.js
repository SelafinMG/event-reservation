const authProvider = {
  login: async ({ username, password }) => {
    const response = await fetch("http://localhost:3001/admins/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: username, password }),
    });

    if (response.status !== 200) {
      throw new Error("Login failed");
    }

    const { token } = await response.json();
    localStorage.setItem("token", token);
    return Promise.resolve();
  },

  logout: () => {
    localStorage.removeItem("token");
    return Promise.resolve();
  },

  checkAuth: () => {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  },

  checkError: (error) => {
    if (error.status === 401 || error.status === 403) {
      localStorage.removeItem("token");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: () => Promise.resolve(),
};

export default authProvider;
