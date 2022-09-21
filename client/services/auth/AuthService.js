import { useState, useEffect, createContext } from "react";
import axiosInstance from "../axios/index";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import UserServices from "../user/UserServices";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  // default state null will logout user when refresh despite
  // auth in local storage
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("tf_auth")) {
      setAuth(JSON.parse(localStorage.getItem("tf_auth")));
    }
    if (localStorage.getItem("tf_user")) {
      setUser(JSON.parse(localStorage.getItem("tf_user")));
    }
    if (localStorage.getItem("tf_profile")) {
      setProfile(JSON.parse(localStorage.getItem("tf_profile")));
    }
  }, []);

  const login = async (userInput) => {
    let authResponse = await axiosInstance.post(
      "user/auth/",
      JSON.stringify(userInput)
    );

    if (authResponse?.data) {
      let userResponse = await UserServices.getUser(authResponse?.data?.access);
      let profileResponse = await UserServices.getProfile(
        userResponse?.data?.id,
        authResponse?.data?.access
      );

      // Set user context data
      setAuth(authResponse?.data);
      setUser(userResponse?.data);

      // TODO: hash sensitive data before store in localStorage
      localStorage.setItem("tf_auth", JSON.stringify(authResponse?.data));
      localStorage.setItem("tf_user", JSON.stringify(userResponse?.data));

      if (profileResponse.status === 404) {
        router.push("/user/profile-create");
      } else {
        setProfile(profileResponse?.data);
        localStorage.setItem(
          "tf_profile",
          JSON.stringify(profileResponse?.data)
        );
        router.push("/");
      }
    }
  };

  const logout = () => {
    setAuth(null);
    setUser(null);
    setProfile(null);
    localStorage.removeItem("tf_auth");
    localStorage.removeItem("tf_user");
    localStorage.removeItem("tf_profile");
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
            Authorization: Bearer`${accessToken}`,
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
    // Context data
    auth: auth,
    user: user,
    profile: profile,

    // Context functions
    login: login,
    logout: logout,
    register: register,
    verifyToken: verifyToken,
    changePassword: changePassword,
  };

  return (
    <AuthContext.Provider value={authService}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
