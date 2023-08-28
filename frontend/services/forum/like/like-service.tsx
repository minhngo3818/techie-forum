import { toastResponse } from "../../../utils/toast-helper";
import axiosInst from "../../axios/axios-instance";

export async function likePost(profileId: string, threadId: string) {
  return await axiosInst
    .post(`/forum/like/?profile=${profileId}&post=${threadId}/`)
    .catch((error) => {
      toastResponse("error", error.message);
    });
}

export async function unlikePost(profileId: string, threadId: string) {
  return await axiosInst
    .delete(`/forum/like/?profile=${profileId}&?post=${threadId}/`)
    .catch((error) => {
      toastResponse("error", error.message);
    });
}
