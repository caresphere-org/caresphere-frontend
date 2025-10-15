import axiosInstance from "../Interceptor/AxiosInterceptor"


const getPatient = async(id: any) => {
    return axiosInstance.get(`/api/v1/profile/patient/get/${id}`)
    .then((response:any) => response.data)
    .catch((error:any) => {throw error;})
}

const updatePatient = async(patient: any) => {
    return axiosInstance.put('/api/v1/profile/patient/update/', patient)
    .then((response:any) => response.data)
    .catch((error:any) => {throw error;})
}

export {getPatient, updatePatient};