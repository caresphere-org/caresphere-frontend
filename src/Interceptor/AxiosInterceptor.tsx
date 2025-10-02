import axios, { InternalAxiosRequestConfig, AxiosError } from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9000'
})

axiosInstance.interceptors.request.use(
    (config:InternalAxiosRequestConfig) => {
        console.log("interceptor ", config)
        return config;
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },

    (error: AxiosError) => {
        console.error("Interceptor Response Error: ", error.response || error.message);
        return Promise.reject(error);
    }
);

export default axiosInstance;