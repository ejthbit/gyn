import axios from 'axios'
export const axiosGynInstance = axios.create({
    baseURL: process.env.API_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
})
