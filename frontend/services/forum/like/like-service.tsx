import { axiosInst } from "../../axios/axios-instance";

export async function updateLike(pid: string, tid: string) {
    const response = await axiosInst.patch(`/like-view/?pid=${pid}&?tid=${tid}/`)

    return response
}

export async function deleteLike(pid: string, tid: string) {
    const response = await axiosInst.delete(`/like-view/?pid=${pid}&?tid=${tid}/`)

    return response
}