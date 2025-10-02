import axiosInstance from "../Interceptor/AxiosInterceptor"

const registerUser = async(user: any) => {
    return axiosInstance.post('/api/v1/user/register', user)
    .then((response:any) => response.data)
    .catch((error:any) => {throw error;})
}

const loginUser = async(user: any) => {
    return axiosInstance.post('/api/v1/user/login', user)
    .then((response:any) => response.data)
    .catch((error:any) => {throw error;})
}

export default {registerUser, loginUser};