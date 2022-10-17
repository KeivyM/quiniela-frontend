import axios from "axios";

const token = localStorage.getItem("user_Auth");

export const AxiosConfig = axios.create({
  baseURL: "https://quiniela-crazy-imagine.herokuapp.com/",
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
