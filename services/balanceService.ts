import apiClient from "@/services/apiClient";

export const getMonthlyBalance = async (year: number, month: number) => {
  try {
    const response = await apiClient.get("/balance/mensual", {
      params: { anio: year, mes: month },
    });

    return {
      code: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error("Error en getMonthlyBalance:", error); // Para depuración

    // Si el error tiene estructura Axios, lo devolvemos tal cual
    if (error.code === false) {
      return error;
    }

    // Si es un error inesperado, devolvemos un mensaje genérico
    return {
      code: false,
      message: "Ocurrió un error al obtener el balance",
    };
  }
};
