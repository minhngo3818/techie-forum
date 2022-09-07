import { useState, useEffect, createContext } from "react";
import axiosInstance from "../axios/index";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  const login = async (userInput) => {
    const response = await axiosInstance
      .post("user/auth/login/", JSON.stringify(userInput))
      .catch((error) => console.log(error));

    if (response?.data) {
      setIsAuth(true);
      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      router.push("/homepage");
    }
  };

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("user");
    router.push("/login");
  };

  const register = async (userInput) => {
    let response = await axiosInstance
      .post("user/register/", JSON.stringify(userInput))
      .catch((error) => console.log(error));

    if (response?.status === 201) {
      // TODO
      // Add time out message to redirect
      toast.success("Your account was created successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });
      // Proceed user login
      // Redirect to profile page
      router.push("/homepage");
    }
  };

  const authService = {
    isAuth: isAuth,
    login: login,
    logout: logout,
    register: register,
  };

  return (
    <AuthContext.Provider value={authService}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
