import axios from "axios";

const token = localStorage.getItem("user_Auth");

axios.defaults.baseURL = process.env.REACT_APP_API;
axios.defaults.headers.common["Authorization"] = `Bearer ${token}` || "";

export const AxiosConfig = axios;
