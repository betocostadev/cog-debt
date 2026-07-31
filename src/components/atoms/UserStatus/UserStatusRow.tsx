import type { UserTableRow } from '#/types/users'
import { Statuses } from '#/types/users'
import { icons } from '#/utils/icons'
import LazyIcon from '../Icons/LazyIcon'

export const getUserStatusIcon = (status: Statuses) => {
  switch (status) {
    case Statuses.ACTIVE:
      return icons.CircleCheck
    case Statuses.INACTIVE:
      return icons.CircleX
    case Statuses.ONLEAVE:
      return icons.ShieldPlus
    case Statuses.VACATION:
      return icons.Earth

    default:
      return icons.CircleCheck
  }
}

export function UserStatusRow(status: Pick<UserTableRow, 'status'>) {
  const userStatus = status.status

  return (
    <span className="flex justify-center">
      <LazyIcon
        icon={getUserStatusIcon(userStatus)}
        iconColor={
          userStatus === Statuses.ACTIVE
            ? 'lawngreen'
            : userStatus === Statuses.INACTIVE
              ? 'red'
              : userStatus === Statuses.ONLEAVE
                ? 'palevioletred'
                : 'cornflowerblue'
        }
        size={22}
      />
    </span>
  )
}
