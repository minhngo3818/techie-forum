import axiosInst from "../axios/axios-instance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      toast.success("Request was sent", {
        position: "top-center",
        hideProgressBar: true,
      });
    })
    .catch((error) => {
      toast.error(error.message, {
        position: "top-center",
        hideProgressBar: true,
      });
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
