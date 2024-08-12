import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

Axios.interceptors.request.use(
  (config) => {
    // This is important for sending cookies
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.name === "AxiosError")
      return Promise.reject({ ...error, message: error.response.data.error });
    return Promise.reject(error);
  }
);

export default Axios;
