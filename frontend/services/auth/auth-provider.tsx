import { useRouter } from "next/router";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { ReactElement } from "react";
import AuthContextInterface from "../../interfaces/user/auth-interface";
import {
  ILoginForm,
  IChangePasswordForm,
  IRegisterForm,
} from "../../interfaces/user/auth-interface";
import axiosInst from "../axios/axios-instance";
import IUser from "../../interfaces/user/user";
import { toastResponse } from "../../utils/toast-helper";

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
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // Persist user information if page refreshs
  useEffect(() => {
    if (!router.isReady) return;
    let userTraits = sessionStorage.getItem("techie:traits");

    if (userTraits) {
      console.log(userTraits);
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
  async function login(data: ILoginForm) {
    setLoading(true);
    await axiosInst
      .post("user/login", data)
      .then((res) => {
        if (res.data.is_active === false) {
          toastResponse(
            "success",
            "Your account is inactive. Redirect to account recovery url."
          );
        } else if (res.data.is_verified === false) {
          toastResponse("info", "Email has not been verified!");
          // sessionStorage.setItem("udsf", JSON.stringify(res.data.udsf));
          router.replace("/verify-email/not-verify");
        } else {
          let userObj = {
            username: res.data.username,
            email: res.data.email,
            profile_name: res.data.profile_name,
            is_verified: res.data.is_verified,
          };
          setUser(userObj);
          sessionStorage.setItem("techie:traits", JSON.stringify(userObj));

          if (!res.data.profile_name) {
            router.push("/profile/create");
          } else {
            router.push("/forum");
          }
          toastResponse("success", "Authorization succeeded!");
        }
      })
      .catch((error) => {
        toastResponse("error", error.message);
      })
      .finally(() => setLoading(false));
  }

  /**
   * Handle logout procedure
   * Pre-request a token before post request
   * Remove all user credentials on success
   */
  async function logout() {
    setLoading(true);
    await axiosInst
      .post("user/logout", null)
      .then((res) => {
        setUser(null);
        sessionStorage.removeItem("techie:traits");
        toastResponse("success", "You have logged out!");
        router.replace("/");
      })
      .catch((error) => {
        toastResponse("error", error.message);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }

  /**
   * Register a new user account
   * @param data registration inputs
   * @return boolean
   */
  async function register(data: IRegisterForm) {
    let isSuccess = false;
    setLoading(true);
    await axiosInst
      .post("user/register", data)
      .then((res) => {
        toastResponse("success", "Your account was created successfully!");
        isSuccess = true;
      })
      .catch((error) => {
        toastResponse("error", error.message);
      })
      .finally(() => setLoading(false));
    return isSuccess;
  }

  /**
   * Verify authorized user
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
        toastResponse("error", error.message);
      })
      .finally(() => setLoading(false));
    return isVerified;
  }

  /**
   * Change user password with authentication
   * @param data password inputs
   */
  async function changePassword(data: IChangePasswordForm) {}

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
