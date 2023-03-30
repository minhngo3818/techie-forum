import { useRouter } from "next/router";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { ReactElement } from "react";
import AuthContextInterface from "../../interfaces/user/auth-interface";
import {
  LoginInterface,
  ChangePasswordInterface,
  RegisterInterface,
} from "../../interfaces/user/auth-interface";
import axiosInst from "../axios/axios-instance";
import UserInterface from "../../interfaces/user/user-interface";
import { toast } from "react-toastify";
import { getCsrfToken } from "./auth-services";

export const AuthContext = createContext<AuthContextInterface>({
  user: null,
  login: async () => {},
  logout: async () => {},
  register: async () => false,
  verifyUser: async () => false,
  changePassword: async () => {},
  loading: false,
});

export function AuthProvider({ children }: { children: ReactElement }) {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // Persist user information if page refreshs
  useEffect(() => {
    if (!router.isReady) return;
    let userTraits = sessionStorage.getItem("techie:traits");

    if (userTraits) {
      let userObject = JSON.parse(userTraits);
      setUser(userObject);
    }
  }, [router, router.isReady]);

  /**
   * Resolve login response and set auth states, notify an error if happens
   * Perform subsequence request if user account has not beend verified or inactive
   * @param data {username: string, password: string}
   * @returns void
   */
  async function login(data: LoginInterface) {
    setLoading(true);
    await getCsrfToken()
      .then((token) => {
        return axiosInst.post("user/login", data, {
          headers: {
            "x-csrftoken": token,
          },
        });
      })
      .then((res) => {
        toast.success("Authorization succeeded!", {
          position: "top-center",
          hideProgressBar: true,
        });
        let userObj = { username: res.data.username, email: res.data.email };
        setUser(userObj);
        sessionStorage.setItem("techie:traits", JSON.stringify(userObj));
        router.push("forum");
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-center",
          hideProgressBar: true,
        });
      })
      .finally(() => setLoading(false));
  }

  /**
   * Handle logout procedure
   * Pre-request a token before post request
   * Remove all user credentials once success
   */
  async function logout() {
    setLoading(true);
    await getCsrfToken()
      .then((token) => {
        return axiosInst.post("user/logout", null, {
          headers: {
            "x-csrftoken": token,
          },
        });
      })
      .then((res) => {
        setUser(null);
        sessionStorage.removeItem("techie:traits");
        toast.success("You have logged out!", {
          position: "top-center",
          hideProgressBar: true,
        });
        router.replace("/");
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-center",
        });
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }

  /**
   * Register a new user account
   * @param data registration inputs
   * @return boolean
   */
  async function register(data: RegisterInterface) {
    let isSuccess = false;
    setLoading(true);
    await getCsrfToken()
      .then((token) => {
        return axiosInst.post("user/register", data, {
          headers: {
            "x-csrftoken": token,
          },
        });
      })
      .then((res) => {
        toast.success("Your account was created successfully!", {
          position: "top-center",
          hideProgressBar: true,
        });
        isSuccess = true;
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-center",
          hideProgressBar: true,
        });
      })
      .finally(() => setLoading(false));
    return isSuccess;
  }

  /**
   * Verify current authorized user
   */
  async function verifyUser() {
    let isVerified = false;
    setLoading(true);
    await axiosInst
      .post(`/user/auth/verify`, null)
      .then((res) => {
        isVerified = true;
      })
      .catch((error) => {
        toast.error(error.message + error.details.detail, {
          position: "top-center",
        });
      })
      .finally(() => setLoading(false));
    return isVerified;
  }

  /**
   * Change user password with authentication
   * @param data password inputs
   */
  async function changePassword(data: ChangePasswordInterface) {}

  const context = useMemo(
    () => ({
      user: user,
      login: login,
      logout: logout,
      register: register,
      verifyUser: verifyUser,
      changePassword: changePassword,
      loading: loading,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
