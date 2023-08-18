import { ThreadBodyInterface } from "../../../interfaces/forum/post/post";
import { toastResponse } from "../../../utils/toast-helper";
import axiosInst from "../../axios/axios-instance";

export async function getPaginatedThreads() {
  const response = await axiosInst.get("forum/thread");

  return response;
}

export async function getThread(id: string) {
  const response = await axiosInst.get(`forum/thread/${id}/`);

  return response;
}

export async function postThread(data: ThreadBodyInterface) {
  const formData = composeFormData(data);

  return await axiosInst
    .post("forum/thread/", formData)
    .then((res) => {
      toastResponse("success", "Your thread was posted successfully!");
    })
    .catch((error) => {
      toastResponse("error", error.message);
    });
}

export async function updateThread(id: string, data: ThreadBodyInterface) {
  const response = await axiosInst.patch(`forum/thread/${id}/`, data);

  return response;
}

export async function deleteThread(id: string) {
  const response = await axiosInst.delete(`forum/thread/${id}`);

  return response;
}

/**
 * HELPERS
 */
function composeFormData(data: ThreadBodyInterface) {
  let formData = new FormData();

  for (var key in data) {
    let value = data[key as keyof ThreadBodyInterface];

    if (key === "tags" && value instanceof Set) {
      let tags = Array.from(value);
      tags.forEach((tag, index) => {
        formData.append(`tags[${index}]`, tag);
      });
    }

    // TODO: check and add multiple images

    if (typeof value === "string") {
      formData.append(key, value);
    }
  }

  // For viewing sending pre-send data
  // formData.forEach((value, key) => {
  //   console.log(`Key: ${key}, Value: ${value}`);
  // });

  return formData;
}
