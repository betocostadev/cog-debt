export const icons = {
  UsersRound: 'users-round',
  Grid2x2Check: 'grid-2x2-check',
  Hamburger: 'hamburger',
} as const

export type IconName = (typeof icons)[keyof typeof icons]
