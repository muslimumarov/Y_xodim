import axios from "axios";
import { getToken } from "utils/storages";

export const baseUrl = import.meta.env.VITE_APP_BASE_URL;
export const imgUrl = import.meta.env.VITE_APP_BASE_IMGURL;

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

api.interceptors.request.use(
  (request) => {
    request.headers["Content-Type"] = "application/json";
    if (getToken()) {
      request.headers.Authorization = `Bearer ${getToken()}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => Promise.reject(error)
);
