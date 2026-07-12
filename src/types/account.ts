import { z } from 'zod'

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

export const credentialsSchema = z.object({
  username: z.string().min(5, 'Username is required'),
  password: z.string().min(5, 'Password is required'),
  expiresInMins: z.number().optional(),
})

export type TCredentialsOutput = z.infer<typeof credentialsSchema>
