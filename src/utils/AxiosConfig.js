import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API;
axios.defaults.headers.post["Access-Control-Allow-Origin"] =
  "https://quiniela-backend.vercel.app";

axios.defaults.headers.patch["Access-Control-Allow-Origin"] =
  "https://quiniela-cis.netlify.app";

axios.defaults.headers.put["Access-Control-Allow-Origin"] =
  "https://quiniela-cis.netlify.app";

export const AxiosConfig = axios;
