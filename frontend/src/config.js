import axios from "axios";

const instance = axios.create({
  baseURL: "https://project-auth-ws3k.onrender.com/",
});

export default instance;
