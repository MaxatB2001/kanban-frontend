import axios from "axios";

export const API_URL = "http://localhost:3000";

const $api = axios.create({
  baseURL: API_URL,
});

const $authApi = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$authApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export { $api, $authApi };
