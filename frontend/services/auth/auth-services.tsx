import axiosInst from "../axios/axios-instance";
import { toastResponse } from "../../utils/toast-helper";

/**
 * Request an verification email if user don't receive an email
 * @param email an email verification token
 * @returns axios get function
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
 * @returns axios get function
 */
export function verifyEmail(token: string) {
  return axiosInst.get(`user/email-verification?token=${token}`);
}
