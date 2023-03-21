import ThreadInterface from "../../../interfaces/forum/post/post";
import axiosInst from "../../axios/axios-instance";

export async function getPaginatedThreadsService() {
  const response = await axiosInst.get("forum/thread");

  return response;
}

export async function getThreadService(tid: string) {
  const response = await axiosInst.get(`forum/thread/?id=${tid}/`);

  return response;
}

export async function createThreadService(data: ThreadInterface) {
  const response = await axiosInst.post("forum/thread", data, {
    withCredentials: true,
  });

  return response;
}

export async function changeThreadService(data: ThreadInterface) {
  const response = await axiosInst.patch("forum/thread/", data, {
    withCredentials: true,
  });

  return response;
}
