import { IProfile, IProfileForm } from "../../../interfaces/profile/profile";
import axiosInst from "../../axios/axios-instance";
import { toastResponse } from "../../../utils/toast-helper";

/**
 * Retrieve a user profile data by collect profile name in the url
 * @param name the profile name from frontend url
 * @returns axios request instance
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

/**
 * Update partially user profile
 * Send request data as a FormData object
 * @param profileName
 * @param data
 * @returns axios request instance
 */
export async function updateProfile(
  profileName: string,
  data: Partial<IProfileForm>
) {
  const formData = new FormData();
  for (var key in data) {
    let value = data[key as keyof IProfileForm];

    if (typeof value === "string" && value !== "") {
      formData.append(key, value);
    }

    if (value instanceof Blob) {
      formData.append(key, value, value.name);
    }
  }

  return await axiosInst
    .patch(`/profile-view/${profileName}/`, formData)
    .then((res) => {
      if (data.profile_name !== profileName) {
        let userTraits = sessionStorage.getItem("techie:traits");
        if (userTraits) {
          let userTraitsObj = JSON.parse(userTraits);
          userTraitsObj.profile_name = !data.profile_name
            ? profileName
            : data.profile_name;
          sessionStorage.setItem(
            "techie:traits",
            JSON.stringify(userTraitsObj)
          );
        }
      }

      toastResponse("success", "Your profile was updated successfully!");
    })
    .catch((error) => {
      toastResponse("error", error.message);
    });
}
