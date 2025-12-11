import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",  // When backend comes, replace this
});

// Add interceptors here for auth tokens (if needed later)

export default api;
