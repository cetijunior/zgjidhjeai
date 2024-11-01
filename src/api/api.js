import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Backend URL
  headers: { "Content-Type": "application/json" },
});

// Attach the token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;