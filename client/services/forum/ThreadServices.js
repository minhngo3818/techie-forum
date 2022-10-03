import axiosInstance from "../axios";
import { toast } from "react-toastify";

const getCursoredThreads = async (cursor, category, accessToken) => {
  let response = await axiosInstance.get(
    `forum/thread/?category=${category}&cursor=${cursor}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
};

const postThread = async (accessToken, threadInputs) => {
  try {
    let response = await axiosInstance.post(
      "forum/thread/",
      JSON.stringify(threadInputs),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response?.status === 201) {
      toast.success("You post a new thread!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const editThread = async (accessToken, pk, threadInputs) => {
  try {
    let response = await axiosInstance.patch(
      `forum/thread/${pk}/`,
      JSON.stringify(threadInputs),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 201) {
      toast.success("Your thread was updated", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const ThreadServices = {
  getCursoredThreads: getCursoredThreads,
  postThread: postThread,
};

export default ThreadServices;
