import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? "http://127.0.0.1:5050/api" : "/api");

const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("fm_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  register: (data: object) => api.post("/auth/register", data),
  login: (data: object) => api.post("/auth/login", data),
};

export const projectAPI = {
  getOpen: () => api.get("/projects"),
  getMine: () => api.get("/projects/mine"),
  create: (data: object) => api.post("/projects", data),
  edit: (id: string, data: object) => api.put(`/projects/${id}`, data),
  delete: (id: string) => api.delete(`/projects/${id}`),
  acceptBid: (pId: string, bId: string) =>
    api.patch(`/projects/${pId}/bids/${bId}/accept`),
  markComplete: (pId: string) => api.patch(`/projects/${pId}/complete`),
  getBids: (pId: string) => api.get(`/projects/${pId}/bids`),
};

export const bidAPI = {
  place: (pId: string, data: object) => api.post(`/projects/${pId}/bids`, data),
  withdraw: (bId: string) => api.delete(`/bids/${bId}/withdraw`),
  getMine: () => api.get("/bids/mine"),
};

export const adminAPI = {
  getUsers: () => api.get("/admin/users"),
  blockUser: (id: string) => api.patch(`/admin/users/${id}/block`),
  unblockUser: (id: string) => api.patch(`/admin/users/${id}/unblock`),
  getProjects: () => api.get("/admin/projects"),
  getDisputes: () => api.get("/admin/disputes"),
  openDispute: (data: object) => api.post("/admin/disputes", data),
  resolveDispute: (id: string, resolution: string) =>
    api.patch(`/admin/disputes/${id}/resolve`, { resolution }),
};
