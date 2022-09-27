import axios from "axios";

const token = localStorage.getItem("user_Auth");

export const AxiosConfig = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 1000,
  headers: { Authorization: `Bearer ${JSON.parse(token)}` },
});
