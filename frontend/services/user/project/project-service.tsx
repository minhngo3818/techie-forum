import ProjectInterface from "../../../interfaces/project/project";
import { axiosInst } from "../../axios/axios-instance";

// Return project list by searching user id
export async function getProjectService(pid: string) {
    const response = await axiosInst.get(`project-view/?owner=${pid}`,)

    return response
}

// Create a project 
export async function createProjectService(data: ProjectInterface) {
    const response = await axiosInst.post("project-view/", data, {
        withCredentials: true
    })

    return response
}


// Hanle change project 
export async function changeProjectService(data: ProjectInterface) {
    const response = await axiosInst.patch("project-view/", data, {
        withCredentials: true,
    })

    return response
}

export async function deleteProjectService(pjid: string) {
    const response = await axiosInst.delete(`project-view/?id=${pjid}`)

    return response
}