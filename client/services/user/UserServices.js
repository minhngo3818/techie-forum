import { useRouter } from "next/router";
import axiosInstance from "../axios";

const getUser = async (url, accessToken) => {
  const response = await axiosInstance.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

const UserService = {
  getUser,
};

export default UserService;
