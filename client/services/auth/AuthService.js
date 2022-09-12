import { useState, useEffect, createContext } from "react";
import axiosInstance from "../axios/index";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  // default state null will logout user when refresh despite
  // auth in local storage
  const [auth, setAuth] = useState(null);

  const login = async (userInput) => {
    try {
      let response = await axiosInstance.post(
        "user/auth/",
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

  const changePassword = async (accessToken, passwords) => {
    try {
      let response = await axiosInstance.patch(
        "user/auth/change-password/",
        JSON.stringify(passwords),
        {
          headers: {
            Authorization: Bearer`${accessToken}`
          },
        }
      );

      if (response.status === 200) {
        toast.success("Your new password was set!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const authService = {
    auth: auth,
    login: login,
    logout: logout,
    register: register,
    verifyToken: verifyToken,
    changePassword: changePassword
  };

  return (
    <AuthContext.Provider value={authService}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
