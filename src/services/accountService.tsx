import { getCurrentAuthUser, loginUser } from '#/api'
import store from '#/utils/store'

export const loginAndSaveToken = async ({
  username,
  password,
}: {
  username: string
  password: string
}) => {
  try {
    const userData = await loginUser({ username, password })

    if (userData?.accessToken) {
      store.jwt = userData.accessToken
    }

    return userData
  } catch (error) {
    console.log(`Auth service error: ${error}`)
  }
}

export const getAuthUser = async () => {
  try {
    const authUser = await getCurrentAuthUser()
    return authUser
  } catch (error) {
    console.log(`Auth service error: ${error}`)
  }
}
