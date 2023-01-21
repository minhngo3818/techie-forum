import CommentInterface from "../../../interfaces/forum/comment/comment";
import { axiosInst } from "../../axios/axios-instance";

export async function getComments(tid: string, parent?: string) {
  const response = await axiosInst.get(
    `forum/comment-view/?thread=${tid}&?parent=${parent}`
  );

  return response;
}

export async function createComment(tid: string, parent?: string) {
  const response = await axiosInst.post(
    `forum/comment-view/?thread=${tid}&?parent=${parent}`
  );

  return response;
}

export async function getComment(cid: string) {
  const response = await axiosInst.get(`forum/comment-view/?id=${cid}/`);

  return response;
}

export async function changeComment(data: CommentInterface) {
  const response = await axiosInst.patch("forum/comment-view/", data, {
    withCredentials: true,
  });

  return response;
}
