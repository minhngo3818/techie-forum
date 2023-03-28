import axiosInst from "../axios/axios-instance";
import {
  LoginInterface,
  RegisterInterface,
  ResetPasswordInterface,
  ChangePasswordInterface,
} from "../../interfaces/user/auth-interface";
import "react-toastify/dist/ReactToastify.css";

// Hanle login logic and retrieve user data
export async function loginService(data: LoginInterface) {
  const response = await axiosInst.post("/user/login", data, {
    withCredentials: true,
  });

  return response;
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

/**
 * Perform get request to verify user email
 * Use wrap function in order to be consumed by useQuery hook
 * @param token an email verification token
 * @returns axios get function
 */
export function verifyEmail(token: string) {
  return axiosInst.get(`user/email-verification?token=${token}`);
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

// Set account to inactive
export async function deactivateAccountService() {
  const response = await axiosInst.post(
    "user/auth/",
    { is_active: false },
    {
      withCredentials: true,
    }
  );

  return response;
}

// Delete account
export async function deleteAccountService() {
  const response = await axiosInst.post("user/auth/delete-account/");

  return response;
}
