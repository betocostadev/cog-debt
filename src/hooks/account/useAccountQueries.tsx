import { getAuthUser } from '#/services/accountService'

export const useAuthUserQueryFn = async () => {
  const authUser = await getAuthUser()

  if (!authUser) {
    throw new Error(`Unable to get current Authenticated user.`)
  }

  return authUser
}
