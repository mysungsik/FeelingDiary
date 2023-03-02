import axios from "axios";

const axiosConfig = {
  baseURL: "http://localhost:5000/api/diary/",
  timeout: 1000000,
  headers: { "Content-Type": "application/json" },
};

export const client = axios.create(axiosConfig);
