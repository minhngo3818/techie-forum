import IProject from "../../../interfaces/project/project";
import axiosInst from "../../axios/axios-instance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export async function getProjectService(id: string) {
  const response = await axiosInst.get(`project-view/?owner=${id}`);

  return response;
}

export async function createProjectService(data: IProject) {
  const response = await axiosInst
    .post("project-view/", data)
    .then(() => {
      toast.success("A new project was added", {
        position: "top-center",
        hideProgressBar: true,
      });
    })
    .catch((error) => {
      toast.error(error.message, {
        position: "top-center",
        hideProgressBar: true,
      });
    });

  return response;
}

export async function updateProjectService(data: IProject) {
  const response = await axiosInst
    .patch(`project-view/${data.id}/`, data)
    .then(() => {
      toast.success("Your project was updated!", {
        position: "top-center",
        hideProgressBar: true,
      });
    })
    .catch((error) => {
      toast.error(error.message, {
        position: "top-center",
        hideProgressBar: true,
      });
    });

  return response;
}

export async function deleteProjectService(id: string) {
  const response = await axiosInst
    .delete(`project-view/${id}/`)
    .then(() => {
      toast.success("Your project was deleted!", {
        position: "top-center",
        hideProgressBar: true,
      });
    })
    .catch((error) => {
      toast.error(error.message, {
        position: "top-center",
        hideProgressBar: true,
      });
    });

  return response;
}
