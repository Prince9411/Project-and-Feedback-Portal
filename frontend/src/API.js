import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:7279/api"  
  
});

export default API;

