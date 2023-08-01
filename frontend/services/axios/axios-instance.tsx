import axios, { AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";

// API CONFIGS
const DEV_API = "http://127.0.0.1:8000/api/";
const HOST_API = "";
const axiosConfigs = {
  baseURL: DEV_API,
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
      showError("Unauthorized or session expired");
      let redirectProcess = setTimeout(() => {
        window.location.assign("/");
        window.clearTimeout(redirectProcess);
      }, 2000);
      return;
    }

    if (error.status === 500) {
      showError("Internal server error");
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

// Helper functions
function showError(error: string) {
  toast.error(error, {
    position: toast.POSITION.TOP_CENTER,
  });
}
