import { axiosInst } from "../../axios/axios-instance";

export async function likeService(pid: string, tid: string) {
  const response = await axiosInst.patch(`/like-view/?pid=${pid}&?tid=${tid}/`);

  return response;
}

export async function unlikeService(pid: string, tid: string) {
  const response = await axiosInst.delete(
    `/like-view/?pid=${pid}&?tid=${tid}/`
  );

  return response;
}
