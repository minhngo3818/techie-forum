import axios from "axios";

const DEV_URL = "http://127.0.0.1:8000/api/";

const axiosInstance = axios.create({
  baseURL: DEV_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.message) {
      toast.error(error?.message);
      return;
    }
    if (error?.response?.status === 401) {
      toast.error("Unauthorized request!");
      window.location = "/login";
      return;
    }

    return Promise.reject(error);
  }
);

// - Use interceptor to add refresh authentication

export default axiosInstance;
