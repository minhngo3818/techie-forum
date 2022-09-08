import { useState, useEffect, createContext } from "react";
import axiosInstance from "../axios/index";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [auth, setAuth] = useState(null);

  const login = async (userInput) => {
    try {
      let response = await axiosInstance.post(
        "user/auth/login/",
        JSON.stringify(userInput)
      );

      if (response?.data) {
        setAuth(response?.data);
        localStorage.setItem("auth", JSON.stringify(response?.data));
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  const register = async (userInput) => {
    try {
      let response = await axiosInstance.post(
        "user/register/",
        JSON.stringify(userInput)
      );

      if (response?.status === 201) {
        // TODO
        // Add time out message to redirect
        toast.success("Your account was created successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
        // Proceed user login
        // Redirect to profile page
        router.push("/user/profile-create");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyToken = async (token) => {
    try {
      let response = await axiosInstance.post("user/auth/verify/", { token });

      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const authService = {
    auth: auth,
    login: login,
    logout: logout,
    register: register,
    verifyToken: verifyToken,
  };

  return (
    <AuthContext.Provider value={authService}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
