import type { DummyUsersQueryParams, UsersQueryParams } from '#/types/queries'

export const usersQueryKeys = {
  all: ['users'] as const,
  dummyUsers: (params: DummyUsersQueryParams, hasUsers: boolean) =>
    [...usersQueryKeys.all, params, hasUsers] as const,
  list: (params: UsersQueryParams) => [...usersQueryKeys.all, params] as const,
}
