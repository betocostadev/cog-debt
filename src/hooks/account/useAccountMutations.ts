import { accountService } from '#/services/accountService'
import type { TCredentials } from '#/types/account'

export const useLoginMutationFn = async (credentials: TCredentials) => {
  return await accountService.login(credentials)
}
