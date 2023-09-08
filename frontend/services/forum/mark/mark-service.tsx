import axiosInst from "@services/axios/axios-instance";
import { toastResponse } from "@utils/toast-helper";

export async function markThread(threadId: string) {
  return await axiosInst
    .post(
      "/forum/mark/",
      { thread: threadId },
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

export async function unmarkThread(threadId: string) {
  return await axiosInst
    .delete(`/forum/mark/unmark/?thread=${threadId}`)
    .catch((error) => {
      toastResponse("error", error.message);
    });
}
