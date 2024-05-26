import axios from "axios";

const instance = axios.create({
  baseURL: "https://project-auth-jgzj.onrender.com/api",
});

export default instance;
