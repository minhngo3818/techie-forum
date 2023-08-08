import axiosInst from "../axios/axios-instance";
import { toastResponse } from "../../utils/toast-helper";

/**
 * Request an verification email if user don't receive an email
 * @param email an email verification token
 * @returns axios get promise
 */
export async function requestVerifyEmail() {
  let udsf = sessionStorage.getItem("udsf"); // Use a substitution in later update
  return axiosInst
    .get(`user/email-verification/request/${udsf}`)
    .then(() => {
      toastResponse("success", "Email verificationr request was sent");
    })
    .catch((error) => {
      toastResponse("error", error.message);
    });
}

/**
 * Perform get request to verify user email
 * Use wrap function in order to be consumed by useQuery hook
 * @param token an email verification token
 * @returns axios get promise
 */
export function verifyEmail(token: string) {
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
 * Perform a put request for changing user email
 * State unverified email in user object in session Storage
 * @param email
 * @returns axios put promise
 */
export function changeEmail(email: string) {
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
