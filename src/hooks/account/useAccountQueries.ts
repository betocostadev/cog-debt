import { accountService } from '#/services/accountService'
import type { IAuthUser } from '#/types/account'

export const useAuthUserQueryFn = async (): Promise<IAuthUser> => {
  const authUser = await accountService.getAuthUser()

  return authUser
}
