import ThreadInterface from "../../../interfaces/forum/post/post";
import { axiosInst } from "../../axios/axios-instance";

export async function getThreads() {
  const response = await axiosInst.get("forum/thread");

  return response;
}

export async function getThread(tid: string) {
  const response = await axiosInst.get(`forum/thread/?id=${tid}/`);

  return response;
}

export async function createThread(data: ThreadInterface) {
  const response = await axiosInst.post("forum/thread", data, {
    withCredentials: true,
  });

  return response;
}

export async function changeThread(data: ThreadInterface) {
  const response = await axiosInst.patch("forum/thread/", data, {
    withCredentials: true,
  });

  return response;
}
