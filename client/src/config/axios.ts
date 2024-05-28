import axios, { AxiosInstance } from 'axios'

const instans: AxiosInstance = axios.create({ baseURL: 'http://localhost:8001/api' })

instans.interceptors.request.use((config) => {
   config.headers.Authorization = localStorage.getItem('token')

   return config
})

export default instans
