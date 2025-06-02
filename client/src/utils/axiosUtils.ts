import axios from 'axios'

import * as configData from '../configData'

const axiosInstance = axios.create({
  baseURL: configData.SERVER_URL, // Your backend URL
  withCredentials: true, // Ensures cookies are sent with requests
});

export const httpGet = async (path: string) => {
  const response = await axiosInstance.get(path, configData.getAxiosConfig())
  return response.data
}

export const httpPost = async (path: string, body: any) => {
  const response = await axiosInstance.post(path, body, configData.getAxiosConfig())
  return response.data
}

export const httpPatch = async (path: string, body: any) => {
  const response = await axiosInstance.patch(path, body, configData.getAxiosConfig())
  return response.data
}

export const httpDelete = async (path: string) => {
  const response = await axiosInstance.delete(path, configData.getAxiosConfig())
  return response.data
}

axiosInstance.interceptors.response.use(
  response => response, // Pass through successful responses
  error => {
      if (error.response && error.response.status === 401) {
          // Handle unauthorized errors (e.g., redirect to login)
          console.error('Unauthorized. Redirecting to login...')
      }
      return Promise.reject(error)
  }
);