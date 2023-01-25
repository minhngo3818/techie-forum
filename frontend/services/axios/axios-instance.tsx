import { APIConfig } from "../api-config/api-config";
import axios from "axios";
import { toast } from "react-toastify";

// axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
// axios.defaults.xsrfCookieName = "csrftoken";

export const axiosInst = axios.create({
  baseURL: APIConfig.devApi,
  headers: {
    "Content-Type": "application/json",
  },
});



axiosInst.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error)
    if (error.status === 401) {
      toast.error("Unauthorized or session expired", {
        position: toast.POSITION.TOP_CENTER,
      });
      let redirectProcess = setTimeout(() => {
        window.location.assign("/");
        window.clearTimeout(redirectProcess);
      }, 2000);
      return;
    }

    if (error.status === 500) {
      toast.error("Internal server error", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    return Promise.reject(error);
  }
);
