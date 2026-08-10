import type { ICompanyDepartment } from './company'
import type { DummyUserListItem } from './dummyUsers'
import type { AppError } from './errors'
import type { IUser, Statuses } from './users'

export interface BaseResult {
  isLoading: boolean
  error: AppError | undefined
  refresh: () => Promise<void>
}

export type ApiHealthResponse = {
  status: string
  method: string
}

export interface DummyUsersQueryParams {
  limit?: number // 0 for all
  skip?: number
  order?: 'asc' | 'desc'
  sortBy?: 'firstName' | 'company.department' | 'address.city'
  search?: string
}

export interface DummyUsersResponse {
  users: DummyUserListItem[]
  total: number
  skip: number
  limit: number
}

// https://dexie.org/docs/API-Reference#query-items
export interface UsersQueryParams {
  where?: string
  status?: Statuses | 'All'
  offset?: number
  equalsIgnoreCase?: string
  orderBy?: string
  limit?: number
  reverse?: boolean
}

export interface UsersResponse {
  users: IUser[]
  total: number
}

export type UserStatusChartItem = {
  name: Statuses
  value: number
}

export interface UsersByStatusResponse {
  total: number
  usersByStatus: UserStatusChartItem[]
}

export interface ICompanyDepartmentsQueryParams {
  where?: string
  offset?: number
  orderBy?: string
  limit?: number
  reverse?: boolean
}

export interface ICompanyDepartmentsResponse {
  departments: ICompanyDepartment[]
  total: number
}
