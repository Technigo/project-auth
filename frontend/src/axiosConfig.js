// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://project-auth-3.onrender.com/", // Update with your backend server URL
});

export default api;
