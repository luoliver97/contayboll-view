import apiClient from "@/services/apiClient";

export const getAccounts = async (page: number = 1, per_page: number = 10) => {
  try {
    const response = await apiClient.get("/cuentas/", {
      params: { page, per_page },
    });

    return {
      code: true,
      data: response.data.data,
    };
  } catch (error: any) {
    console.error("Error en getAccounts:", error); // Para depuración

    // Si el error tiene estructura Axios, lo devolvemos tal cual
    if (error.code === false) {
      return error;
    }

    // Si es un error inesperado, devolvemos un mensaje genérico
    return {
      code: false,
      message: "Ocurrió un error al obtener las cuentas",
    };
  }
};

export const addAccounts = async (account: object) => {
  try {
    const response = await apiClient.post("/cuentas", {
      body: { account },
    });

    return {
      code: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error("Error en getAccounts:", error); // Para depuración

    // Si el error tiene estructura Axios, lo devolvemos tal cual
    if (error.code === false) {
      return error;
    }

    // Si es un error inesperado, devolvemos un mensaje genérico
    return {
      code: false,
      message: "Ocurrió un error al crear la cuentas",
    };
  }
};
export const updateAccount = async (account: object) => {
  try {
    const response = await apiClient.post("/cuentas", {
      body: { account },
    });

    return {
      code: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error("Error en getAccounts:", error); // Para depuración

    // Si el error tiene estructura Axios, lo devolvemos tal cual
    if (error.code === false) {
      return error;
    }

    // Si es un error inesperado, devolvemos un mensaje genérico
    return {
      code: false,
      message: "Ocurrió un error al crear la cuentas",
    };
  }
};
export const removeAccount = async (account: object) => {
  try {
    const response = await apiClient.post("/cuentas", {
      body: { account },
    });

    return {
      code: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error("Error en getAccounts:", error); // Para depuración

    // Si el error tiene estructura Axios, lo devolvemos tal cual
    if (error.code === false) {
      return error;
    }

    // Si es un error inesperado, devolvemos un mensaje genérico
    return {
      code: false,
      message: "Ocurrió un error al crear la cuentas",
    };
  }
};
