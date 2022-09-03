import { useState, useEffect, createContext } from "react";
import axiosInstance from "axios";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  const login = async (userInput) => {
    let response = await axiosInstance
      .post("http://127.0.0.1:8000/api/user/auth/login/", JSON.stringify(userInput), {
        headers: { "Content-Type": "application/json" },
      })
      .catch((error) => console.log(error));

    if (response.status === 200) {
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
      .post("http://127.0.0.1:8000/api/user/register", JSON.stringify(userInput), {
        headers: { "Content-Type": "application/json" },
      })
      .catch((error) => console.log(error));

    if (response.status === 200) {
      router.push("/homepage")
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
