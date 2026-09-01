import { beforeEach, describe, expect, it, vi } from 'vitest'
import { accountService } from '../accountService'
import { NotFoundError, ServerError } from '#/types/errors'
import { mockStore } from '#/utils/testStore'

vi.mock('#/api', async () => {
  const actual = await vi.importActual('#/api')
  return {
    ...actual,
    ApiClient: class {
      protected post = vi.fn()
      protected get = vi.fn()
    },
  }
})

describe('Account Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockStore.jwt = null
  })

  describe('login', () => {
    it('should successfully login, save jwt, and return user data', async () => {
      const mockCreds = { username: 'testuser', password: 'testuserpass' }
      const mockResponse = {
        id: 1,
        username: 'testuser',
        accessToken: 'mock-jwt-token',
      }

      vi.spyOn(accountService as any, 'post').mockResolvedValueOnce(
        mockResponse,
      )

      const result = await accountService.login(mockCreds)

      expect((accountService as any).post).toHaveBeenCalledWith(
        '/auth/login',
        mockCreds,
      )
      expect(mockStore.jwt).toBe('mock-jwt-token')
      expect(result).toEqual(mockResponse)
    })

    it('should wrap errors into a ServerError on login failure', async () => {
      const mockCreds = { username: 'wrong', password: 'badpass' }

      vi.spyOn(accountService as any, 'post').mockRejectedValue(
        new Error('Invalid credentials'),
      )

      await expect(accountService.login(mockCreds)).rejects.toThrow(ServerError)
    })
  })

  describe('getAuthUser', () => {
    it('should fetch and return auth user', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'testuser@email.com',
      }

      vi.spyOn(accountService as any, 'get').mockResolvedValueOnce(mockUser)

      const result = await accountService.getAuthUser()

      expect((accountService as any).get).toHaveBeenCalledWith('/auth/me')
      expect(result).toEqual(mockUser)
    })

    it('should rethrow NotFoundError directly without wrapping', async () => {
      vi.spyOn(accountService as any, 'get').mockRejectedValueOnce(
        new NotFoundError('User not found'),
      )

      await expect(accountService.getAuthUser()).rejects.toThrow(NotFoundError)
    })

    it('should wrap general errors into a ServerError', async () => {
      vi.spyOn(accountService as any, 'get').mockRejectedValueOnce(
        new Error('Network failure'),
      )

      await expect(accountService.getAuthUser()).rejects.toThrow(ServerError)
    })
  })
})
