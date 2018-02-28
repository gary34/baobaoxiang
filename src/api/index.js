import axios from 'axios'
import { Notification } from 'element-ui'

// 封装 ajax
const axiosInstance = axios.create({
  baseURL: '/api/',
  timeout: 8000
})

function notify (message, title = 'API错误') {
  Notification.error({ title: title, message: message })
}

// response拦截器的成功响应检查处理
function responseCheck (response) {
  if (response.data.Success == null) {
    notify(JSON.stringify(response.data), '未知响应结构')
    return Promise.reject(new Error('未知响应结'))
  }

  if (!response.data.Success) {
    notify(response.data.ErrorMsg)
    return Promise.reject(response.data.ErrorMsg)
  }

  return response.data.Info
}

// response拦截器的错误检查处理
function errorCheck (error) {
  console.log('errorCheck')
  if (error.response) {
    notify(error.response.data.ErrorMsg, error.response.statusText)
    return Promise.reject(new Error('响应错误'))
  }

  if (error.request) {
    notify(error.request, '请求错误')
    return Promise.reject(new Error('请求错误'))
  }

  notify(error.message)
}
// response 拦截器
axiosInstance.interceptors.response.use(responseCheck, errorCheck)
axiosInstance.interceptors.request.use(config => {
  let token = localStorage.token
  if (token && token !== '') {
    config.headers.Authorization = 'Bearer ' + token
  }

  return config
})
export default axiosInstance
