import { usersService } from '#/services/usersService'
import type { DummyUsersResponse, UsersQueryParams } from '#/types/queries'
import type { QueryFunctionContext } from '@tanstack/react-query'

export const useUsersQueryFn = async ({
  queryKey,
}: QueryFunctionContext): Promise<DummyUsersResponse> => {
  const [, params] = queryKey as ['users', UsersQueryParams]

  const users = usersService.getAllUsers(params)
  return users
}
