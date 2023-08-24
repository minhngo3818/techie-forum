import { IComment } from "../../../interfaces/forum/post/post";
import axiosInst from "../../axios/axios-instance";

export async function getAllCommentsService(tid: string, parent?: string) {
  const response = await axiosInst.get(
    `forum/comment-view/?thread=${tid}&?parent=${parent}`
  );

  return response;
}

export async function getPaginatedCommentsService() {}

export async function getComment(cid: string) {
  const response = await axiosInst.get(`forum/comment-view/?id=${cid}/`);

  return response;
}

export async function createCommentService(tid: string, parent?: string) {
  const response = await axiosInst.post(
    `forum/comment-view/?thread=${tid}&?parent=${parent}`
  );

  return response;
}

export async function changeCommentService(data: IComment) {
  const response = await axiosInst.patch("forum/comment-view/", data, {
    withCredentials: true,
  });

  return response;
}

export async function removeComment() {}

export async function recoverComment() {}
