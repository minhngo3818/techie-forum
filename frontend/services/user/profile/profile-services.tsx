import { ProfileInterface } from "../../../interfaces/profile/profile";
import { axiosInst } from "../../axios/axios-instance";

export async function getProfileService() {
  const response = await axiosInst.get("user/profile-view/", {
    withCredentials: true,
  });

  return response;
}

export async function createProfileService(data: ProfileInterface) {
  const response = await axiosInst.post("user/profile-view", data, {
    withCredentials: true,
  });

  return response;
}

export async function changeProfileService(data: ProfileInterface) {
  const response = await axiosInst.post("user/profile/", data, {
    withCredentials: true,
  });

  return response;
}

export async function removeAccountService() {}
