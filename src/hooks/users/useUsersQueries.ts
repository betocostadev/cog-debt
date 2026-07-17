import { usersService } from '#/services/usersService'
import type { UsersQueryParams } from '#/types/queries'
import type { UsersResponse } from '#/types/users'
import type { QueryFunctionContext } from '@tanstack/react-query'

export const useUsersQueryFn = async ({
  queryKey,
}: QueryFunctionContext): Promise<UsersResponse> => {
  const [, params] = queryKey as ['users', UsersQueryParams]

  const users = usersService.getAllUsers(params)
  return users
}
