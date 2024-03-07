import axios from "axios";
const url = import.meta.env.VITE_SERVER_BASE_URL;
const axiosInstance = axios.create({
    baseURL: url,
    timeout: 3000,
})

export default axiosInstance;