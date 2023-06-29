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

export async function updateProfile(
  profileName: string,
  data: Partial<ProfileCreationInterface>
) {
  return await getCsrfToken()
    .then((token) => {
      axiosInst.patch(`/profile-view/${profileName}/`, data, {
        headers: {
          "x-csrftoken": token,
        },
      });
    })
    .then((res) => {
      let userTraits = sessionStorage.getItem("techie:traits");
      if (userTraits) {
        let userTraitsObj = JSON.parse(userTraits);
        userTraitsObj.profile_name = !data.profile_name
          ? profileName
          : data.profile_name;
        sessionStorage.setItem("techie:traits", JSON.stringify(userTraitsObj));
      }
      toast.success("Your profile was updated successfully!", {
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

export async function uploadAvatar(profileName: string, formData: FormData) {
  return await getCsrfToken()
    .then((token) => {
      axiosInst.patch(`/profile-view/${profileName}/`, formData, {
        headers: {
          "x-csrftoken": token,
          "content-type": "multipart/form-data",
        },
      });
    })
    .then((res) => {
      toast.success("Your avatar was updated successfully!", {
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
