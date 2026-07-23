// Real App Users - Writing and read from Dexie
export type Company = {
  department: string
  title: string
}

export type Address = {
  city: string
  state: string
}

enum Statuses {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  ONLEAVE = 'On Leave',
  VACATION = 'Vacation',
}

export interface IUser {
  id?: number
  name: string
  lastName: string
  email: string
  phone: string
  company: Company
  address: Address
  admissionDate: Date
  salary: number // Random Range (2.500 - 20.000) ou by company.title
  status: Statuses
  image: string
}

// In component return status with Icon
