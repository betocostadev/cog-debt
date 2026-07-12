import axios from 'axios'
import store from '#/utils/store'
import { AuthError, TokenExpiredError } from '#/types/errors'

// TODO: Implementar como classe

const BASE_URL = 'https://dummyjson.com/'
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  if (store.jwt) {
    config.headers.Authorization = `Bearer ${store.jwt}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      throw new TokenExpiredError()
    }

    const message =
      error?.response?.data?.message || 'An unexpected error occurred.'
    throw new AuthError(message)
  },
)

export const testDummyJson = async () => {
  const { data } = await apiClient.get('/test')
  return data
}

export const loginUser = async ({
  username,
  password,
  expiresInMins = 60,
}: {
  username: string
  password: string
  expiresInMins?: number
}) => {
  const { data } = await apiClient.post('/auth/login', {
    username,
    password,
    expiresInMins,
  })

  return data
}

export const getCurrentAuthUser = async () => {
  const { data } = await apiClient.get(`/auth/me`)
  console.log('[API - getCurrentAuthUser - data: ', data)
  return data
}
