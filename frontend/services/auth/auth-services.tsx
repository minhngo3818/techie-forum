import axiosInst from "@services/axios/axios-instance";
import { toastResponse } from "@utils/toast-helper";
import {
  IChangePasswordForm,
  IResetPasswordForm,
} from "@interfaces/user/auth-interface";

/**
 * Request an verification email if user don't receive an email
 * @param email an email verification token
 * @returns Promise<void>
 */
export async function requestVerifyEmail() {
  let udsf = sessionStorage.getItem("udsf"); // Use a substitution in later update
  return axiosInst
    .get(`user/email-verification/request/${udsf}`)
    .then(() => {
      toastResponse("success", "Email verification request was sent");
    })
    .catch((error) => {
      toastResponse("error", error.message);
    });
}

/**
 * Perform GET request to verify user email
 * Use wrap function in order to be consumed by useQuery hook
 * @param token an email verification token
 * @returns Promise<void>
 */
export async function verifyEmail(token: string) {
  return axiosInst
    .get(`user/email-verification?token=${token}`)
    .then(() => {
      let userTraits = sessionStorage.getItem("techie:traits");
      if (userTraits) {
        let user = JSON.parse(userTraits);
        user.is_verified = true;
        sessionStorage.setItem("techie:traits", JSON.stringify(user));
      }
    })
    .catch((error) => {
      toastResponse("error", error.message);
    });
}

/**
 * Perform a PUT request for changing user email
 * State unverified email in user object in session Storage
 * @param email
 * @returns Promise<void>
 */
export async function changeEmail(email: string) {
  return axiosInst
    .put(`user/change-email`, { email: email })
    .then(() => {
      let userTraits = sessionStorage.getItem("techie:traits");
      if (userTraits) {
        let user = JSON.parse(userTraits);
        user.email = email;
        user.is_verified = false;
        sessionStorage.setItem("techie:traits", JSON.stringify(user));
      }
    })
    .catch((error) => {
      toastResponse("error", error.message);
    });
}

/**
 * Change user password word with auth
 * @param data: a change password form
 * @returns Promise<void>
 */
export async function changePassword(data: IChangePasswordForm) {
  return axiosInst
    .put("user/change-password", data)
    .then(() => {
      toastResponse("success", "Your password has changed");
    })
    .catch((error) => {
      toastResponse("error", error.message);
    });
}

/**
 * Temporarily delete user account
 */
export async function deleteAccount() {
  return axiosInst.post("user/delete-account").catch((error) => {
    toastResponse("error", error.message);
  });
}

/**
 * Send a requet to reset password
 * @param email
 * @returns Promise<void>
 */
export async function requestResetPassword(email: string) {
  let isSuccess = false;
  await axiosInst
    .post("user/password-reset-request", { email: email })
    .then(() => {
      isSuccess = true;
    })
    .catch((error) => {
      toastResponse("error", error.message);
    });
  return isSuccess;
}

/**
 * Send a POST request to reset user password
 * @param data IResetPasswordForm
 * @returns Promise<boolean>
 */
export async function resetPassword(data: IResetPasswordForm) {
  let isSuccess = false;
  await axiosInst
    .post("user/reset-password", data)
    .then(() => {
      isSuccess = true;
    })
    .catch((error) => {
      toastResponse("error", "Reset password failed");
    });
  return isSuccess;
}
