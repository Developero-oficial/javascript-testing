import axios from 'axios'

import {getItem} from '../utils/storage-utils'

const baseApiUrl = process.env.REACT_APP_API_BASE_URL

const axiosInstance = axios.create({
  baseURL: baseApiUrl,
})

axiosInstance.interceptors.request.use(
  config => {
    const token = getItem({key: '@token'})
    config.headers.authorization = `Bearer ${token}`
    return config
  },
  error => Promise.reject(error),
)

export const http = axiosInstance
