import { z } from 'zod'

// Real App Users - Writing and read from Dexie
export type Company = {
  department: string
  jobTitle: string
}

export type Address = {
  city: string
  state: string
}

export enum Statuses {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  ONLEAVE = 'On Leave',
  VACATION = 'Vacation',
}

export interface IUser {
  id?: number
  username: string
  firstName: string
  lastName: string
  email: string
  phone: string
  company: Company
  address: Address
  admissionDate: Date
  salary: number
  status: Statuses
  image: string
}

export type UserTableRow = {
  id: number
  image: string
  name: string
  department: string
  jobTitle: string
  city: string
  admissionDate: Date | string
  salary: number
  status: Statuses
}

export const userSchema = z.object({
  id: z.number().optional(),
  image: z.string().min(1, 'User image for avatar is required'),
  status: z.enum([
    Statuses.ACTIVE,
    Statuses.INACTIVE,
    Statuses.ONLEAVE,
    Statuses.VACATION,
  ]),
  firstName: z.string().min(3, 'First name is required'),
  lastName: z.string().min(3, 'Last name is required'),
  username: z.string().min(5, 'Username is required'),
  email: z.email('Please provide a valid email').min(5, 'Email is required'),
  phone: z.string().min(9, 'Phone is required'),
  city: z.string().min(3, 'City is required'),
  state: z
    .string()
    .min(2, 'State is required')
    .max(2, 'Please provide only two letters for state'),
  department: z.string().min(5, 'Department is required'),
  jobTitle: z.string().min(5, 'Job title is required'),
  admissionDate: z.coerce.date({ message: 'Admission date is required' }),
  salary: z.coerce.number().min(1, 'Salary is required'),
})

export type TUserDataInput = z.infer<typeof userSchema>

// Added to help create url params for users table page
export const userSearchSchema = z.object({
  where: z.string().catch('').optional(),
  status: z
    .enum([
      'All',
      Statuses.ACTIVE,
      Statuses.INACTIVE,
      Statuses.ONLEAVE,
      Statuses.VACATION,
    ])
    .catch('All')
    .optional(),
  offset: z.number().catch(0).optional(),
  limit: z.number().catch(10).optional(),
  orderBy: z.string().catch('id').optional(),
  reverse: z.boolean().catch(false).optional(),
})

export type TUserSearch = z.infer<typeof userSearchSchema>
