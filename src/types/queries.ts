import type { DummyUserListItem } from './dummyUsers'

export interface BaseResult {
  isLoading: boolean
  error: Error | undefined
  refresh: () => Promise<void>
}

export type ApiHealthResponse = {
  status: string
  method: string
}

export interface UsersQueryParams {
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
