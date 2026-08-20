import { ApiClient } from '#/api'
import type { IAuthUser, TCredentials } from '#/types/account'
import { NotFoundError, ServerError } from '#/types/errors'
import store from '#/utils/store'

/*
User Dummy JSON for login and getting logged in user
*/
class AccountService extends ApiClient {
  async login(credentials: TCredentials): Promise<IAuthUser> {
    try {
      const userData = await this.post<IAuthUser, TCredentials>(
        '/auth/login',
        credentials,
      )

      store.jwt = userData.accessToken

      return userData
    } catch (error) {
      throw new ServerError(
        error instanceof Error
          ? error.message
          : 'Unknown database error ocurred.',
      )
    }
  }

  async getAuthUser(): Promise<IAuthUser> {
    try {
      const user = await this.get<IAuthUser>('/auth/me')

      return user
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error
      }

      throw new ServerError(
        error instanceof Error
          ? error.message
          : 'Unknown database error ocurred.',
      )
    }
  }
}

export const accountService = new AccountService()
