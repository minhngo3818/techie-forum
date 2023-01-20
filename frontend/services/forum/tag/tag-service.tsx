import { axiosInst } from "../../axios/axios-instance";

export async function getTags(tid: string) {
    const response = await axiosInst.get(`forum/like-view/?thread=${tid}`)

    return response 
}

export async function createTag(data: {tid: string, name: string}) {
    const response =await axiosInst.post(`forum/like-view/?thread=${data.tid}`, data, {
        withCredentials: true
    })

    return response
}