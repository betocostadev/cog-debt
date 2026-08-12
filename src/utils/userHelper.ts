import { Statuses } from '#/types/users'
import { icons } from './icons'

export const getUserStatusIcon = (status: Statuses) => {
  switch (status) {
    case Statuses.ACTIVE:
      return { icon: icons.CircleCheck, color: userStatusIconColors['active'] }
    case Statuses.INACTIVE:
      return { icon: icons.CircleX, color: userStatusIconColors['inactive'] }
    case Statuses.ONLEAVE:
      return { icon: icons.ShieldPlus, color: userStatusIconColors['onLeave'] }
    case Statuses.VACATION:
      return { icon: icons.Earth, color: userStatusIconColors['vacation'] }

    default:
      return { icon: icons.CircleCheck, color: 'white' }
  }
}

export const userStatusIconColors = {
  active: 'lawngreen',
  inactive: 'red',
  onLeave: 'palevioletred',
  vacation: 'cornflowerblue',
}
