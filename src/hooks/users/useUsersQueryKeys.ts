import type { DummyUsersQueryParams, UsersQueryParams } from '#/types/queries'

export const usersQueryKeys = {
  all: ['users'] as const,
  dummyUsers: (params: DummyUsersQueryParams, hasUsers: boolean) =>
    [...usersQueryKeys.all, params, hasUsers] as const,
  list: (params: UsersQueryParams) => [...usersQueryKeys.all, params] as const,
  detail: (id: number) => [...usersQueryKeys.all, id] as const,
}

export const isUserListQueryKey = (queryKey: readonly unknown[]) => {
  return (
    queryKey.length === 2 &&
    queryKey[0] === 'users' &&
    typeof queryKey[1] === 'object'
  )
}
