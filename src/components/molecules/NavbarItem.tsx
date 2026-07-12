import { Link } from '@tanstack/react-router'

import type { LucideIcon } from 'lucide-react'

type NavbarItemProps = {
  label: string
  to: string
  icon: LucideIcon
  collapsed: boolean
}

export function NavbarItem({
  label,
  to,
  icon: Icon,
  collapsed,
}: NavbarItemProps) {
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
        <Icon size={18} />
        {!collapsed && <span className="ms-3 whitespace-nowrap">{label}</span>}
      </Link>
    </li>
  )
}
