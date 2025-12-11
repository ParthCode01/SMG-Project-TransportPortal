import api from "./axiosConfig";

// Request vehicle from backend
export const requestTransport = async (data) => {
  try {
    const response = await api.post("/transport/request", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Track vehicle
export const trackVehicle = async (uniqueId) => {
  try {
    const response = await api.get(`/transport/track/${uniqueId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
