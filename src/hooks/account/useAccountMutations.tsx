import { loginAndSaveToken } from '#/services/accountService'
import type { TCredentials } from '#/types/account'

export const useLoginMutationFn = async (credentials: TCredentials) => {
  return loginAndSaveToken(credentials)
}
