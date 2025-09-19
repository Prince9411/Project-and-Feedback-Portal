import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:7279/api"  // your HTTP backend port
});

export default API;
