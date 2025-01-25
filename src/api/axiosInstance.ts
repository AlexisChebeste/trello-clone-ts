import axios from 'axios';

const API_BASE_RUL = "http://localhost:3000";

const axiosInstance = axios.create({
    baseURL: API_BASE_RUL,
    withCredentials: true,
})

export default axiosInstance;