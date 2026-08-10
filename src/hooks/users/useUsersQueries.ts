import { usersService } from '#/services/usersService'
import type {
  DummyUsersQueryParams,
  DummyUsersResponse,
  UsersByStatusResponse,
  UsersQueryParams,
  UsersResponse,
} from '#/types/queries'
import type { IUser } from '#/types/users'
import type { QueryFunctionContext } from '@tanstack/react-query'

export const useDummyUsersQueryFn = async ({
  queryKey,
}: QueryFunctionContext): Promise<DummyUsersResponse> => {
  const [, params] = queryKey as ['users', DummyUsersQueryParams]

  const users = usersService.getDummyUsers(params)
  return users
}

export const useUsersQueryFn = async ({
  queryKey,
}: QueryFunctionContext): Promise<UsersResponse> => {
  const [, params] = queryKey as ['users', UsersQueryParams]

  const users = usersService.getAllUsers(params)
  return users
}

export const useUserQueryFn = async (
  id: number,
): Promise<IUser | undefined> => {
  const user = usersService.getUser(id)
  return user
}

export const useUsersByStatusQueryFN = async (): Promise<
  UsersByStatusResponse | undefined
> => {
  const users = usersService.getAllUsersStatus()
  return users
}
