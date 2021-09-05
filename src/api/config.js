import axios from 'axios'
import authHeader from './authHeader'

const axiosGynInstance = axios.create({
    baseURL: process.env.API_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json', ...(authHeader() && { Authorization: authHeader() }) },
    withCredentials: true,
})

axiosGynInstance.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem('user')
        if (user)
            config.headers = {
                Authorization: authHeader(),
                'Content-Type': 'application/json',
            }
        return config
    },
    (error) => Promise.reject(error)
)

export default axiosGynInstance
