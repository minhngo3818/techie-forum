import { IComment, ICommentPost } from "@interfaces/forum/post/post";
import axiosInst from "@services/axios/axios-instance";
import { toastResponse } from "@utils/toast-helper";
import commentMapper from "./comment-mapper";

export async function getPaginatedComments(
  threadId: string,
  parentId?: string,
  next_id?: string
) {
  let queryString = `?thread=${threadId}`;
  queryString += !parentId ? "" : `&?parent=${parentId}`;
  queryString += !next_id ? "" : `&?next=${next_id}`;

  return await axiosInst
    .get(`forum/comment/${queryString}`)
    .then((res) => {
      let rawComments = res.data.results;
      let comments: IComment[] = [];
      for (let i = 0; i < rawComments.length; i += 1) {
        comments.push(commentMapper(rawComments[i]));
      }
      return { comments: comments, nextId: res.data.next };
    })
    .catch((error) => {
      toastResponse("error", error.message);
    });
}

export async function postComment(data: ICommentPost) {
  return await axiosInst
    .post(`forum/comment/`, data)
    .then((res) => {
      toastResponse("success", "Your comment was posted successfully");
      return commentMapper(res.data);
    })
    .catch((error) => {
      toastResponse("error", error.message);
    });
}

export async function updateComment(cmtId: string, data: IComment) {
  return await axiosInst
    .patch(`forum/comment/${cmtId}`, data)
    .then((res) =>
      toastResponse("success", "Your comment was updated successfully!")
    )
    .catch((error) => toastResponse("error", error.message));
}

export async function removeComment(cmtId: string) {}

export async function recoverComment(cmtId: string) {}
