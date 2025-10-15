import axiosInstance from "../Interceptor/AxiosInterceptor"

const getDoctor = async(id: any) => {
    return axiosInstance.get(`/api/v1/profile/doctor/get/${id}`)
    .then((response:any) => response.data)
    .catch((error:any) => {
        console.error('Get Doctor Error:', error);
        throw error;
    })
}

const updateDoctor = async(doctor: any) => {
    return axiosInstance.put('/api/v1/profile/doctor/update/', doctor)
    .then((response:any) => response.data)
    .catch((error:any) => {
        console.error('Update Doctor Error:', error);
        throw error;
    })
}

export {getDoctor, updateDoctor};