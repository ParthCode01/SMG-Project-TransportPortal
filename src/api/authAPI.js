import api from "./axiosConfig";

export const loginUser = async (payload) => {
  try {
    const response = await api.post("/login", payload);
    return response.data;
  } catch (error) {
    throw error?.response?.data?.message || "Login failed";
  }
};
