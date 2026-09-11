import { vi } from 'vitest'

export const useQueriesMocks = {
  useDummyUsersQueryFn: vi
    .fn()
    .mockResolvedValue({ total: 0, skip: 0, limit: 10, users: [] }),
  useUsersQueryFn: vi.fn().mockResolvedValue({ total: 0, users: [] }),
  useUserQueryFn: vi.fn().mockResolvedValue({}),
  useUsersByStatusQueryFn: vi
    .fn()
    .mockResolvedValue({ total: 0, usersByStatus: [] }),
}
