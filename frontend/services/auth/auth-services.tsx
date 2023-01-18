import { axiosInst } from "../axios/axios-instance";
import { LoginInterface } from "../../interfaces/user/login-interface";
import { RegisterInterface } from "../../interfaces/user/register-interface";
import { ResetPasswordInterface } from "../../interfaces/user/password-interface";
import { ChangePasswordInterface } from "../../interfaces/user/password-interface";
import { UserInterface } from "../../interfaces/user/user-interface";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Hanle login logic and retrieve user data
export async function loginService(
  data: LoginInterface,
  setUser: (user: UserInterface) => void
) {
  await axiosInst
    .post("/user/login", data, {
      withCredentials: true,
    })
    .then(function (response) {
      if (response?.status === 200) {
        toast("login succeed", { position: toast.POSITION.TOP_CENTER });
        setUser({
          username: response.data.username,
          email: response.data.email,
        });
      }
    });
}

// Hanle logout and return to homepage
export async function logoutService() {
  const response = await axiosInst.post("/user/logout", {
    withCredentials: true,
  });

  return response;
}

// Handle user registration logic
export async function registerService(data: RegisterInterface) {
  const response = await axiosInst.post("user/register", data);

  return response;
}

// Handle forgot password and send email to reset password
export async function forgotPasswordService(data: { email: string }) {
  const response = await axiosInst.post("/user/reset-password-request", data, {
    withCredentials: true,
  });
  return response;
}

// Hanle reset password via email, unauthorized access
export async function resetPasswordService(data: ResetPasswordInterface) {
  const response = await axiosInst.post("/user/password-reset-complete", data, {
    withCredentials: true,
  });

  return response;
}

// Handle change password, authorized access
export async function changePasswordService(data: ChangePasswordInterface) {
  const response = await axiosInst.post("/user/auth/change-password", data, {
    withCredentials: true,
  });
  return response;
}