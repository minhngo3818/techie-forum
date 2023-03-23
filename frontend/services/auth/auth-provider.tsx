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

export const AuthContext = createContext<AuthContextInterface>({
  user: null,
  csrfToken: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  changePassword: async () => {},
  loading: false,
});

export function AuthProvider({ children }: { children: ReactElement }) {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Persist user information if page refreshs
  useEffect(() => {
    let userTraits = sessionStorage.getItem("techie:traits");

    if (userTraits) {
      let userObject = JSON.parse(userTraits);
      setUser(userObject);
    }
  }, []);

  const router = useRouter();

  /**
   * Resolve login response and set auth states, notify an error if happens
   * Perform subsequence request if user account has not beend verified or inactive
   * @param data {username: string, password: string}
   * @returns void
   */
  async function login(data: LoginInterface) {
    setLoading(true);
    await axiosInst
      .post("user/login", data)
      .then((res) => {
        toast.success("Authorization succeeded!", {
          position: "top-center",
          hideProgressBar: true,
        });
        let userObj = { username: res.data.username, email: res.data.email };
        setUser(userObj);
        sessionStorage.setItem("techie:traits", JSON.stringify(userObj));
        setCsrfToken(res.headers["x-csrftoken"] ?? null);
        router.push("forum");
      })
      .catch((error) => {
        toast.error(
          error.message + " - " + error.response.data.details.detail,
          {
            position: "top-center",
            hideProgressBar: true,
          }
        );
      })
      .finally(() => setLoading(false));
  }

  /**
   * Remove all login states and redirect to homepage
   */
  async function logout() {
    setLoading(true);
    await axiosInst
      .post("user/logout", null, {
        headers: {
          "x-csrftoken": csrfToken,
        },
      })
      .then(() => {
        setUser(null);
        sessionStorage.removeItem("techie:traits");
        setCsrfToken(null);
        toast.success("You have logged out!", {
          position: "top-center",
          hideProgressBar: true,
        });
        router.replace("");
      })
      .catch((error) => {
        toast.error(error.message + error.details.detail, {
          position: "top-center",
        });
      })
      .finally(() => setLoading(false));
  }

  /**
   * Register a new user account
   * @param data registration inputs
   */
  async function register(data: RegisterInterface) {
    setLoading(true);
    await axiosInst
      .post("user/register", data)
      .then((res) => {
        toast.success("Your account was created successfully!", {
          position: "top-center",
          hideProgressBar: true,
        });
        router.push("verify-email");
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
   * Change user password with authentication
   * @param data password inputs
   */
  async function changePassword(data: ChangePasswordInterface) {}

  const context = useMemo(
    () => ({
      user: user,
      csrfToken: csrfToken,
      login: login,
      logout: logout,
      register: register,
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
