import axiosInstance from "../axios";
import jwtDecode from "jwt-decode";

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

const UserServices = {
  getUser: getUser,
  getProfile: getProfile,
};

export default UserServices;
