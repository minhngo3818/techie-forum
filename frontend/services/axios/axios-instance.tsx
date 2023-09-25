import axios, { AxiosRequestConfig } from "axios";
import { toastResponse } from "@utils/toast-helper";

// API CONFIGS
const API = process.env.API;

const axiosConfigs = {
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFTOKEN",
};

// AXIOS INSTANCE
const axiosInst = axios.create(axiosConfigs);

/**
 * Show error message on response
 */
axiosInst.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.status === 401) {
      toastResponse("error", "Unauthorized or session expired");
      let redirectProcess = setTimeout(() => {
        window.location.assign("/");
        window.clearTimeout(redirectProcess);
      }, 2000);
      return;
    }

    if (error.status === 500) {
      toastResponse("error", "Internal server error");
      return;
    }

    return Promise.reject(error);
  }
);

/**
 * CSRF guard on write method requests
 */
async function getCsrfToken(): Promise<string> {
  const response = await axiosInst.get("user/csrf");
  return response.data.csrftoken;
}

axiosInst.interceptors.request.use(
  async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    const methodsToGuard = ["post", "put", "patch", "delete"];

    if (methodsToGuard.includes(config.method as string)) {
      const csrfToken = await getCsrfToken();

      if (csrfToken) {
        config.headers = {
          "X-CSRFTOKEN": csrfToken,
        };
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInst;
