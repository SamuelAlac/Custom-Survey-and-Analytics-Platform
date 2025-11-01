import axios from "axios";

const apiKey = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
    baseURL: apiKey,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true // to include cookies in requests
})

api.interceptors.response.use((res) => res, (err) =>{
    if(err.response?.status === 401){
        console.warn('Session expired or not authenticated');
    }
    return Promise.reject(err)
})

export default api;