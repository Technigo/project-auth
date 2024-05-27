import axios from "axios";

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: "https://project-auth-backend-kfgp.onrender.com/",
  timeout: 10000,
  headers: {
    "Content-type": "application/json",
  },
});

console.log("Axios baseURL:", axiosInstance.defaults.baseURL);

export default axiosInstance;
