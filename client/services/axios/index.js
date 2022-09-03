import axios from "axios";

const DEV_URL = "http://127.0.0.1:8000/api/";

const axiosInstance = axios.create({
  baseURL: DEV_URL,
});

// TODO
// - Use interceptor to add error checking
// - Use interceptor to add refresh authentication

export default axiosInstance;
