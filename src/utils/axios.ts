import axios from "axios";

export const defaultAxios = axios.create({
    baseURL: "/api",
    withCredentials: true
})