export interface IAuthUser {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  gender: 'female' | 'male' | ({} & string)
  image: string
  accessToken: string
  refreshToken: string
}

export type TCredentials = {
  username: string
  password: string
  expiresInMins?: number
}
