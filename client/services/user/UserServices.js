import axiosInstance from "../axios";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

const getUser = async (accessToken) => {
  let response = await axiosInstance.get(
    `user-view/${jwtDecode(accessToken).id}/`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response;
};

const getProfile = async (pk, accessToken) => {
  let response = await axiosInstance.get(`profile-view/${pk}/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};

const createProfile = async (input, accessToken) => {
  let response = await axiosInstance.post(
    `profile-view/`,
    JSON.stringify(input),
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response?.status === 201) {
    toast.success("Your profile was created successfully!", {
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
    });
  } else {
    toast.error(response?.status, {
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
    });
  }

  return response.data;
};

const UserServices = {
  getUser: getUser,
  getProfile: getProfile,
  createProfile: createProfile,
};

export default UserServices;
