import { IProfileForm } from "../../../interfaces/profile/profile";
import axiosInst from "../../axios/axios-instance";
import { toastResponse } from "../../../utils/toast-helper";

/**
 * Retrieve a user profile data by collect profile name in the url
 * @param name the profile name from frontend url
 * @returns axios instance
 */
export async function getProfile(name: string) {
  return await axiosInst.get(`profile-view/${name}`);
}

export async function createProfile(data: IProfileForm) {
  return await axiosInst
    .post("profile-view/", data)
    .then((res) => {
      toastResponse("success", "Your profile was created successfully!");
    })
    .catch((error) => {});
}

export async function updateProfile(
  profileName: string,
  data: Partial<IProfileForm>
) {
  return await axiosInst
    .patch(`/profile-view/${profileName}/`, data)
    .then((res) => {
      let userTraits = sessionStorage.getItem("techie:traits");
      if (userTraits) {
        let userTraitsObj = JSON.parse(userTraits);
        userTraitsObj.profile_name = !data.profile_name
          ? profileName
          : data.profile_name;
        sessionStorage.setItem("techie:traits", JSON.stringify(userTraitsObj));
      }
      toastResponse("success", "Your profile was updated successfully!");
    })
    .catch((error) => {
      toastResponse("error", error.message);
    });
}

export async function uploadAvatar(profileName: string, formData: FormData) {
  return await axiosInst
    .patch(`/profile-view/${profileName}/`, formData)
    .then((res) => {
      toastResponse("success", "Your avatar was updated successfully!");
    })
    .catch((error) => {
      toastResponse("error", error.message);
    });
}
