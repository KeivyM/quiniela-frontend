import axios from "axios";

const token = localStorage.getItem("user_Auth");

export const AxiosConfig = axios.create({
  baseURL: "https://quiniela-crazy-imagine.herokuapp.com/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
