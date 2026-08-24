import { Link } from '@tanstack/react-router'
import LazyIcon from '../atoms/Icons/LazyIcon'
import type { IconName } from '#/utils/icons'

type NavbarItemProps = {
  label: string
  to: string
  icon: IconName
  collapsed: boolean
  collapse?: () => void
  isMobile?: boolean
}

export function NavbarItem({
  label,
  to,
  icon,
  collapsed,
  collapse,
  isMobile,
}: NavbarItemProps) {
  // onClick for mobile only, to hide the menu when navigating
  return (
    <li>
      <Link
        title={label}
        to={to}
        onClick={collapse}
        className="flex items-center rounded-base px-2 py-2 transition-colors hover:bg-neutral-tertiary hover:text-fg-brand"
        activeProps={{
          className: 'bg-neutral-tertiary text-fg-brand font-medium',
        }}
        viewTransition
      >
        <LazyIcon icon={icon} size={18} />
        {!collapsed && !isMobile && (
          <span className="ms-3 whitespace-nowrap">{label}</span>
        )}
      </Link>
    </li>
  )
}
