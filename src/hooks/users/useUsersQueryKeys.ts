import type { UsersQueryParams } from '#/types/queries'

export const usersQueryKeys = {
  all: ['users'] as const,
  list: (params: UsersQueryParams) => [...usersQueryKeys.all, params] as const,
}
