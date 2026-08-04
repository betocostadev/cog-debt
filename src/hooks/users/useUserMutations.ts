import { usersService } from '#/services/usersService'
import type { TUserDataInput } from '#/types/users'

export const useUpdateUserMutationFn = async ({
  id,
  payload,
}: {
  id: string | number
  payload: TUserDataInput
}) => {
  return await usersService.updateUser({ id, payload })
}
