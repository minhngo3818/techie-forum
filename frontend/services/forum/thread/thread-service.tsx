import { touchEndEvent } from "tsparticles-engine";
import { IThreadBody } from "../../../interfaces/forum/post/post";
import {
  toastResponse,
  toastDelayedSeqMessage,
} from "../../../utils/toast-helper";
import axiosInst from "../../axios/axios-instance";

export async function getPaginatedThreads(category: string, next_id?: string) {
  return await axiosInst
    .get(`forum/thread/?category=${category}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      toastResponse("error", error.message);
    });
}

// TODO: single thread
export async function getThread(id: string) {
  const response = await axiosInst.get(`forum/thread/${id}/`);

  return response;
}

export async function postThread(data: IThreadBody) {
  const formData = composeFormData(data);

  return await axiosInst
    .post("forum/thread/", formData)
    .then((res) => {
      toastResponse("success", "Your thread was posted successfully!");
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

/**
 * HELPERS
 */
function composeFormData(data: IThreadBody) {
  let formData = new FormData();

  for (var key in data) {
    let value = data[key as keyof IThreadBody];

    if (key === "tags" && value instanceof Set) {
      let tags = Array.from(value);
      tags.forEach((tag, index) => {
        formData.append(`tags[${index}]`, tag);
      });
    }

    if (key === "images" && value instanceof FileList) {
      for (let i = 0; i < value.length; i += 1) {
        formData.append(`images[${i}]`, value[i], value[i].name);
      }
    }

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
