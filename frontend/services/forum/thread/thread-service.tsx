import { IncomingMessage } from "http";
import { IThread, IThreadBody } from "@interfaces/forum/post/post";
import { toastResponse, toastDelayedSeqMessage } from "@utils/toast-helper";
import threadFormData from "./thread-fd";
import threadMapper from "./thread-mapper";
import axiosInst from "@services/axios/axios-instance";

export async function getPaginatedThreads(
  req: IncomingMessage,
  category: string,
  next_id?: string
) {
  /**
   * Notes: Must add credentials from request context manually
   * if using getServersideProps, otherwise, credentials are excluded
   */
  let queryString = `?category=${category}`;
  queryString += !next_id ? "" : `&?next=${next_id}`;

  return await axiosInst
    .get(`/forum/thread/${queryString}`, {
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie,
      },
    })
    .then((res) => {
      let rawThreads = res.data.results;
      let threads: IThread[] = [];
      for (let i = 0; i < rawThreads.length; i += 1) {
        threads.push(threadMapper(rawThreads[i]));
      }
      return { threads: threads, nextId: res.data.next_id };
    })
    .catch((error) => {
      toastResponse("error", error.message);
    });
}

export async function getThread(id: string) {
  return await axiosInst
    .get(`forum/thread/${id}/`)
    .then((res) => {
      return { threads: threadMapper(res.data) };
    })
    .catch((error) => {
      toastResponse("error", error.message);
    });
}

export async function postThread(data: IThreadBody) {
  const formData = threadFormData(data);

  return await axiosInst
    .post("forum/thread/", formData)
    .then((res) => {
      toastResponse("success", "Your thread was posted successfully!");
      return threadMapper(res.data);
    })
    .catch((error) => {
      toastResponse("error", error.message);
      let errors = error.response.data.errors;
      toastDelayedSeqMessage("error", errors);
    });
}

export async function updateThread(id: string, data: IThreadBody) {
  const response = await axiosInst.patch(`forum/thread/${id}/`, data);

  return response;
}

export async function deleteThread(id: string) {
  const response = await axiosInst.delete(`forum/thread/${id}`);

  return response;
}
