import IProject from "@interfaces/project/project";
import axiosInst from "@services/axios/axios-instance";
import { toastResponse } from "@utils/toast-helper";

export async function getProjectService(id: string) {
  const response = await axiosInst.get(`project-view/?owner=${id}`);

  return response;
}

export async function createProjectService(data: IProject) {
  const response = await axiosInst
    .post("project-view/", data)
    .then(() => {
      toastResponse("success", "A new project was added");
    })
    .catch((error) => {
      toastResponse("error", error.message);
    });

  return response;
}

export async function updateProjectService(data: IProject) {
  const response = await axiosInst
    .patch(`project-view/${data.id}/`, data)
    .then(() => {
      toastResponse("success", "Your project was updated!");
    })
    .catch((error) => {
      toastResponse("error", error.message);
    });

  return response;
}

export async function deleteProjectService(id: string) {
  const response = await axiosInst
    .delete(`project-view/${id}/`)
    .then(() => {
      toastResponse("success", "Your project was deleted!");
    })
    .catch((error) => {
      toastResponse("error", error.message);
    });

  return response;
}
