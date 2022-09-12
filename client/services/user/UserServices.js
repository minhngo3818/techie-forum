import axiosInstance from "../axios";
import jwtDecode from "jwt-decode";

const getUser = async (accessToken) => {
  let response = await axiosInstance.get(
    `user-view/${jwtDecode(accessToken)}/`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};

const getProfile = async (accessToken) => {
  let response = await axiosInstance.get(
    `profile-view/${jwtDecode(accessToken)}/`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};

const UserService = {
  getUser,
  getProfile,
};

export default UserService;
