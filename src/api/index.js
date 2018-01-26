import axios from 'axios'

// 封装 ajax
const axiosInstance = axios.create({
  baseURL: '/api/',
  timeout: 8000
})

export default axiosInstance
