import type { UserTableRow } from '#/types/users'
import { getUserStatusIcon } from '#/utils/userHelper'
import LazyIcon from '../Icons/LazyIcon'

export function UserStatusRow(status: Pick<UserTableRow, 'status'>) {
  const userStatus = status.status
  const { icon, color } = getUserStatusIcon(userStatus)

  return (
    <span className="flex justify-center">
      <LazyIcon icon={icon} iconColor={color} size={22} />
    </span>
  )
}
