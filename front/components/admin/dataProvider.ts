// @ts-nocheck
import api from "@/lib/api";

const API_PREFIX = "/v1";

const httpClient = async (url, options = {}) => {
  const response = await api.request({
    url: `${API_PREFIX}${url}`,
    method: options.method ?? "GET",
    data: options.body ? JSON.parse(options.body) : undefined,
    headers: options.headers,
  });

  return { json: response.data };
};

const dataProvider = {
  getList: (resource, params) =>
    httpClient(`/${resource}`).then(({ json }) => {
      const data = Array.isArray(json) ? json : [];
      const { field, order } = params.sort ?? {};
      const sorted = field
        ? [...data].sort((a, b) => {
            if (a[field] === b[field]) return 0;
            const cmp = a[field] > b[field] ? 1 : -1;
            return order === "DESC" ? -cmp : cmp;
          })
        : data;

      const { page = 1, perPage = 10 } = params.pagination ?? {};
      const start = (page - 1) * perPage;
      const paginated = sorted.slice(start, start + perPage);

      return { data: paginated, total: data.length };
    }),

  getOne: (resource, params) =>
    httpClient(`/${resource}/${params.id}`).then(({ json }) => ({
      data: json,
    })),

  getMany: (resource, params) =>
    httpClient(`/${resource}`).then(({ json }) => {
      const data = Array.isArray(json) ? json : [];
      const ids = params.ids.map((id) => String(id));
      return { data: data.filter((record) => ids.includes(String(record.id))) };
    }),

  getManyReference: (resource, params) =>
    httpClient(`/${resource}`).then(({ json }) => {
      const data = Array.isArray(json) ? json : [];
      const filtered = params.target
        ? data.filter(
            (record) => String(record[params.target]) === String(params.id)
          )
        : data;
      return { data: filtered, total: filtered.length };
    }),

  create: (resource, params) =>
    httpClient(`/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, ...json },
    })),

  update: (resource, params) =>
    httpClient(`/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: json ?? params.data,
    })),

  delete: (resource, params) =>
    httpClient(`/${resource}/${params.id}`, {
      method: "DELETE",
    }).then(() => ({
      data: params.previousData ?? { id: params.id },
    })),

  deleteMany: (resource, params) =>
    Promise.all(
      params.ids.map((id) =>
        httpClient(`/${resource}/${id}`, { method: "DELETE" })
      )
    ).then(() => ({ data: params.ids })),
};

export default dataProvider;
