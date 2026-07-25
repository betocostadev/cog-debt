export const icons = {
  User: 'user',
  UserPlus: 'user-plus',
  UsersRound: 'users-round',
  Grid2x2Check: 'grid-2x2-check',
  Hamburger: 'hamburger',
  ChevronLeft: 'chevron-left',
  ChevronRight: 'chevron-right',
} as const

export type IconName = (typeof icons)[keyof typeof icons]
