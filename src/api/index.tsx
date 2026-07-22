import axios from 'axios'
import type { AxiosInstance } from 'axios'
import store from '#/utils/store'
import {
  AuthError,
  NotFoundError,
  ServerError,
  TokenExpiredError,
} from '#/types/errors'
import { TEN_SECONDS_IN_MILLI } from '#/utils/constants'

export class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: 'https://dummyjson.com/',
      timeout: TEN_SECONDS_IN_MILLI,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.client.interceptors.request.use((config) => {
      if (store.jwt) {
        config.headers.Authorization = `Bearer ${store.jwt}`
      }
      return config
    })

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          throw new TokenExpiredError()
        } else if (error.response.status === 404) {
          throw new NotFoundError(
            `Resource not found. Error: ${error.response?.data?.message}`,
          )
        } else if (error.response?.status === 500) {
          throw new ServerError(
            `Server error: ${error.response?.data?.message}`,
          )
        }

        const message =
          error?.response?.data?.message || 'An unexpected error occurred.'
        throw new AuthError(message)
      },
    )
  }

  protected buildUrl(path: string, params?: Record<string, unknown>) {
    if (!params) return path

    const searchParams = new URLSearchParams()

    Object.entries(params).forEach(([key, value]) => {
      const valid = value !== undefined && value !== null && value !== ''.length
      if (valid) {
        console.log('Object entries received for request, key: ', key)
        console.log('Object entries received for request, value: ', value)
        searchParams.set(key, String(value))
      }
    })

    return `${path}?${searchParams.toString()}`
  }

  protected async get<T>(path: string): Promise<T> {
    const { data } = await this.client.get(path)
    return data
  }

  protected async post<TResponse, TBody>(
    path: string,
    body: TBody,
  ): Promise<TResponse> {
    const { data } = await this.client.post(path, body)
    return data
  }
}

export const apiClient = new ApiClient()
