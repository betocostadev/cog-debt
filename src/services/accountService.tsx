import { getCurrentAuthUser, loginUser } from '#/api'
import store from '#/utils/store'

export const loginAndSaveToken = async ({
  username,
  password,
}: {
  username: string
  password: string
}) => {
  const userData = await loginUser({ username, password })

  if (userData?.accessToken) {
    store.jwt = userData.accessToken
  }

  return userData
}

export const getAuthUser = async () => {
  const authUser = await getCurrentAuthUser()
  return authUser
}
