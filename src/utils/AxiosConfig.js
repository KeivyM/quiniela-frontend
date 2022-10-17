import axios from "axios";

const token = localStorage.getItem("user_Auth");

console.log(token);

// axios.defaults.baseURL = "https://quiniela-crazy-imagine.herokuapp.com/";

axios.defaults.baseURL = process.env.REACT_APP_API;

axios.defaults.headers.common["Authorization"] = `Bearer ${token}` || "";

export const AxiosConfig = axios;

// export const AxiosConfig = axios.create({
//   baseURL: "https://quiniela-crazy-imagine.herokuapp.com/",
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });
