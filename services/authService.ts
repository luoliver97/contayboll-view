import axios from "axios";
import { Storage } from "@/utils/storage";

const API_URL = "http://127.0.0.1:5000/auth";

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    await Storage.setItem("token", response.data.token);
    return {
      code: true,
      data: response.data,
    };
  } catch (error: any) {
    if (error.response) {
      return {
        code: false,
        status: error.response.status,
        message: error.response.data?.message || "Error en la autenticación",
      };
    } else if (error.request) {
      return {
        code: false,
        message: "No se pudo conectar con el servidor. Verifica tu conexión.",
      };
    } else {
      return {
        code: false,
        message: error.message || "Ocurrió un error inesperado",
      };
    }
  }
};

export const logout = async () => {
  await Storage.removeItem("token");
};

export const getToken = async () => {
  return await Storage.getItem("token");
};
