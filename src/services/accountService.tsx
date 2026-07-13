import { ApiClient } from '#/api'
import type { IAuthUser, TCredentials } from '#/types/account'
import store from '#/utils/store'

class AccountService extends ApiClient {
  async login(credentials: TCredentials): Promise<IAuthUser> {
    const userData = await this.post<IAuthUser, TCredentials>(
      '/auth/login',
      credentials,
    )
    console.log(`Account Service, user data received: `, userData)
    console.log(typeof userData)
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
