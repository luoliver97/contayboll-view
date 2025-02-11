import axios from "axios";
import { Storage } from "@/utils/storage";

const API_BASE_URL = "http://127.0.0.1:5000/api"; // URL base de la API

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token a cada petición
apiClient.interceptors.request.use(async (config) => {
  const token = await Storage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores globalmente
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      // Si el token es inválido o expiró, eliminarlo del storage
      if (error.response.status === 401) {
        await Storage.removeItem("token");
      }

      return Promise.reject({
        code: false,
        status: error.response.status,
        message: error.response.data?.message || "Error en la petición",
      });
    } else if (error.request) {
      return Promise.reject({
        code: false,
        message: "No se pudo conectar con el servidor. Verifica tu conexión.",
      });
    } else {
      return Promise.reject({
        code: false,
        message: error.message || "Ocurrió un error inesperado",
      });
    }
  }
);

export default apiClient;
