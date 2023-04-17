import {
  ProfileCreationInterface,
  ProfileInterface,
} from "../../../interfaces/profile/profile";
import axiosInst from "../../axios/axios-instance";
import { getCsrfToken } from "../../auth/auth-services";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Retrieve a user profile data by collect profile name in the url
 * @param name the profile name from frontend url
 * @returns axios instance
 */
export async function getProfile(name: string) {
  return await axiosInst.get(`profile-view/${name}`);
}

export async function createProfile(data: ProfileCreationInterface) {
  return await getCsrfToken()
    .then((token) => {
      console.log(data);
      return axiosInst.post("profile-view/", data, {
        headers: {
          "x-csrftoken": token,
        },
      });
    })
    .then((res) => {
      toast.success("Your profile was created successfully!", {
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

export async function changeProfileService(data: ProfileInterface) {
  const response = await axiosInst.post("user/profile/", data, {
    withCredentials: true,
  });

  return response;
}

export async function removeAccountService() {}
