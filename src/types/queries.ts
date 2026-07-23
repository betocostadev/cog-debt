import type { DummyUserListItem } from './dummyUsers'
import type { IUser } from './users'

export interface BaseResult {
  isLoading: boolean
  error: Error | undefined
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
  offset?: number
  equalsIgnoreCase?: string
  orderBy?: string
  limit?: number
}

export interface UsersResponse {
  users: IUser[]
  total: number
}
