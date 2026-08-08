import { icons } from '#/utils/icons'

export const getDeptIcon = (key: string) => {
  switch (key) {
    case 'engineering':
      return { icon: icons.BrainCog, color: 'darkgray' }
    case 'support':
      return { icon: icons.HeartHandshake, color: 'firebrick' }
    case 'sales':
      return { icon: icons.BadgePercent, color: 'firebrick' }
    case 'research_and_development':
      return { icon: icons.Microscope, color: 'darkgray' }
    case 'human_resources':
      return { icon: icons.UserCog, color: 'bisque' }
    case 'product_management':
      return { icon: icons.Boxes, color: 'cornsilk' }
    case 'marketing':
      return { icon: icons.Newspaper, color: 'bisque' }
    case 'services':
      return { icon: icons.ToolCase, color: 'firebrick' }
    case 'accounting':
      return { icon: icons.Calculator, color: 'gainsboro' }
    case 'training':
      return { icon: icons.GraduationCap, color: 'darkgray' }
    case 'legal':
      return { icon: icons.Scale, color: 'cornsilk' }

    default:
      return { icon: icons.Info, color: 'white' }
  }
}
