import api from "@/lib/api";

const httpClient = async (url, options = {}) => {
  const response = await api.request({
    url,
    method: options.method ?? "GET",
    data: options.body ? JSON.parse(options.body) : undefined,
    headers: options.headers,
  });

  return { json: response.data };
};

const dataProvider = {
  getList: (resource, params) =>
    httpClient(`/${resource}`).then(({ json }) => ({
      data: json,
      total: json.length,
    })),

  getOne: (resource, params) =>
    httpClient(`/${resource}/${params.id}`).then(({ json }) => ({
      data: json,
    })),

  create: (resource, params) =>
    httpClient(`/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: json,
    })),

  update: (resource, params) =>
    httpClient(`/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: json,
    })),

  delete: (resource, params) =>
    httpClient(`/${resource}/${params.id}`, {
      method: "DELETE",
    }).then(({ json }) => ({
      data: json,
    })),
};

export default dataProvider;
