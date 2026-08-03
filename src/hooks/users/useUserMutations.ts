import { usersService } from '#/services/usersService'
import type { IUser } from '#/types/users'

export const useUpdateUserMutationFn = async (
  id: string | number,
  payload: IUser,
) => {
  return await usersService.updateUser(id, payload)
}
