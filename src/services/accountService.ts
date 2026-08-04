import { ApiClient } from '#/api'
import type { IAuthUser, TCredentials } from '#/types/account'
import store from '#/utils/store'

/*
User Dummy JSON for login and getting logged in user
*/
class AccountService extends ApiClient {
  async login(credentials: TCredentials): Promise<IAuthUser> {
    const userData = await this.post<IAuthUser, TCredentials>(
      '/auth/login',
      credentials,
    )

    if (userData.accessToken) {
      store.jwt = userData.accessToken
    }

    return userData
  }

  async getAuthUser(): Promise<IAuthUser> {
    const user = await this.get<IAuthUser>('/auth/me')
    return user
  }
}

export const accountService = new AccountService()
