import { fetchUtils } from "react-admin";

const apiUrl = "http://localhost:3001";
const httpClient = async (url, options = {}) => {
  const token = localStorage.getItem("token");
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = {
  getList: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`).then(({ json }) => ({
      data: json,
      total: json.length,
    })),

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: json,
    })),

  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: json,
    })),

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: json,
    })),

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    }).then(({ json }) => ({
      data: json,
    })),
};

export default dataProvider;
