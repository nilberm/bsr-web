import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/",
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
