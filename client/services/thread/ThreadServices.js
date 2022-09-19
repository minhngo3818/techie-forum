import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axiosInstance from "../axios";
import { toast } from "react-toastify";

// TODO: paginate thread
const getPaginatedThreads = async () => {};

const postThread = async (accessToken, threadInputs) => {
  try {
    let response = await axiosInstance.post(
      "forum/thread/",
      JSON.stringify(threadInputs),
      {
        headers: {
          Bearer: `${accessToken}`,
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
          Bearer: `${accessToken}`,
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

const ThreadServices = () => {};

export default ThreadServices;
