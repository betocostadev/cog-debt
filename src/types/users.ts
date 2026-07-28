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
