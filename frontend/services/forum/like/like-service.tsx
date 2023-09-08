import { toastResponse } from "@utils/toast-helper";
import axiosInst from "@services/axios/axios-instance";

export async function likePost(threadId: string) {
  return await axiosInst
    .post(
      `forum/like/`,
      { post: threadId },
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    )
    .catch((error) => {
      toastResponse("error", error.message);
    });
}

export async function unlikePost(threadId: string) {
  return await axiosInst
    .delete(`forum/like/unlike/?post=${threadId}`)
    .catch((error) => {
      toastResponse("error", error.message);
    });
}
