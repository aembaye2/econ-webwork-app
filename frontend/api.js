import axios from "axios";

const prodn = true; //true; // Set to true when deploying to production, which is to use the dist files

const api = axios.create({
  baseURL: prodn ? "api/" : "http://127.0.0.1:8000",
});

export default api;
