import { z } from 'zod'

interface IAuthUserAddress {
  address: string
  city: string
  state: string
  stateCode: string
}

interface IAuthUserCompany {
  department: string
  title: string
}

export interface IAuthUser {
  id: string
  username: string
  email: string
  phone?: string
  role?: string
  firstName: string
  lastName: string
  gender: 'female' | 'male' | ({} & string)
  image: string
  address: IAuthUserAddress
  company: IAuthUserCompany
  accessToken: string
  refreshToken: string
}

export type TCredentials = {
  username: string
  password: string
  expiresInMins?: number
}

export const credentialsSchema = z.object({
  username: z.string().min(5, 'Username is required'),
  password: z.string().min(5, 'Password is required'),
  expiresInMins: z.number().optional(),
})

export type TCredentialsOutput = z.infer<typeof credentialsSchema>
