import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { ApiClient } from '..'
import {
  AuthError,
  NotFoundError,
  ServerError,
  TokenExpiredError,
} from '#/types/errors'
import { TEN_SECONDS_IN_MILLI } from '#/utils/constants'
import { mockStore } from '#/utils/testStore'

const { mockInterceptors } = vi.hoisted(() => {
  return {
    mockInterceptors: {
      requestHandler: null as any,
      responseErrorHandler: null as any,
    },
  }
})

vi.mock('axios', () => {
  const mInstance = {
    get: vi.fn(),
    post: vi.fn(),
    interceptors: {
      request: { use: vi.fn((fn) => (mockInterceptors.requestHandler = fn)) },
      response: {
        use: vi.fn((_, fn) => (mockInterceptors.responseErrorHandler = fn)),
      },
    },
  }

  return {
    default: {
      create: vi.fn(() => mInstance),
    },
  }
})

class TestableApiClient extends ApiClient {
  public testBuildUrl(path: string, params?: Record<string, unknown>) {
    return this.buildUrl(path, params)
  }

  public async testGet<T>(path: string) {
    return this.get<T>(path)
  }

  public async testPost<TResponse, TBody>(path: string, body: TBody) {
    return this.post<TResponse, TBody>(path, body)
  }
}

describe('ApiClient', () => {
  let client: TestableApiClient
  let mockedAxiosInstance: any

  beforeEach(() => {
    vi.clearAllMocks()
    client = new TestableApiClient()
    mockedAxiosInstance = (axios.create as any)()
  })

  describe('Configuration and Interceptors', () => {
    it('should initialize axios with base config', () => {
      expect(axios.create).toHaveBeenCalledWith(
        expect.objectContaining({
          baseURL: 'https://dummyjson.com/',
          timeout: TEN_SECONDS_IN_MILLI,
          withCredentials: true,
        }),
      )
    })

    it('should attach Auth header if store.jwt exists', () => {
      mockStore.jwt = 'mock-jwt-token'
      const config = { headers: {} as Record<string, string> }

      const modConfig = mockInterceptors.requestHandler(config)
      expect(modConfig.headers.Authorization).toBe('Bearer mock-jwt-token')

      mockStore.jwt = ''
    })
  })

  describe('Error handling interceptors', () => {
    it('should throw TokenExpiredError on 401 response', () => {
      const error = { response: { status: 401 } }
      expect(() =>
        mockInterceptors.responseErrorHandler(error).toThrow(TokenExpiredError),
      )
    })

    it('should throw NotFoundError on 404 response', () => {
      const error = {
        response: { status: 404, data: { message: 'User missing' } },
      }
      expect(() => mockInterceptors.responseErrorHandler(error)).toThrow(
        NotFoundError,
      )
    })

    it('should throw ServerError on 500 response', () => {
      const error = {
        response: { status: 500, data: { message: 'Database down' } },
      }
      expect(() => mockInterceptors.responseErrorHandler(error)).toThrow(
        ServerError,
      )
    })

    it('should throw AuthError on unhandled error statuses', () => {
      const error = {
        response: { status: 400, data: { message: 'Bad request' } },
      }
      expect(() => mockInterceptors.responseErrorHandler(error)).toThrow(
        AuthError,
      )
    })
  })

  describe('URL Builder', () => {
    it('should return plain path if no param is provided', () => {
      expect(client.testBuildUrl('/users')).toBe('/users')
    })

    it('should append valid query parameters and filter out null/undefined/empty string lengths', () => {
      const url = client.testBuildUrl('/users', {
        search: 'john',
        page: 1,
        active: true,
        emptyVal: '',
        nullVal: null,
        undefVal: undefined,
      })

      expect(url).toBe('/users?search=john&page=1&active=true')
    })
  })

  describe('HTTP Methods', () => {
    it('should perform a GET request and return data', async () => {
      mockedAxiosInstance.get.mockResolvedValueOnce({
        data: { id: 1, name: 'John' },
      })

      const result = await client.testGet('/users/1')
      expect(mockedAxiosInstance.get).toHaveBeenCalledWith('/users/1')
      expect(result).toEqual({ id: 1, name: 'John' })
    })

    it('should perform a POST request and return response data', async () => {
      const payload = { username: 'test' }
      mockedAxiosInstance.post.mockResolvedValueOnce({
        data: { success: true },
      })

      const result = await client.testPost('/login', payload)
      expect(mockedAxiosInstance.post).toHaveBeenCalledWith('/login', payload)
      expect(result).toEqual({ success: true })
    })
  })
})
