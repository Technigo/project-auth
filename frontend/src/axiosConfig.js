// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9090/", // Update with your backend server URL
});

export default api;
