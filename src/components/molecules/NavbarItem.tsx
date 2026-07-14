import { Link } from '@tanstack/react-router'
import LazyIcon from '../atoms/Icons/LazyIcon'
import type { IconName } from '#/utils/icons'

type NavbarItemProps = {
  label: string
  to: string
  icon: IconName
  collapsed: boolean
}

export function NavbarItem({ label, to, icon, collapsed }: NavbarItemProps) {
  return (
    <li>
      <Link
        title={label}
        to={to}
        className="flex items-center rounded-base px-2 py-2 transition-colors hover:bg-neutral-tertiary hover:text-fg-brand"
        activeProps={{
          className: 'bg-neutral-tertiary text-fg-brand font-medium',
        }}
      >
        <LazyIcon icon={icon} size={18} />
        {!collapsed && <span className="ms-3 whitespace-nowrap">{label}</span>}
      </Link>
    </li>
  )
}
