import { useState } from 'react'
import { NavbarItem } from '#/components/molecules/NavbarItem'

import LazyIcon from '#/components/atoms/Icons/LazyIcon'
import { icons } from '#/utils/icons'
import { ErrorBoundary } from '#/components/molecules/ErrorBoundary'

const items = [
  {
    label: 'Home',
    to: '/dashboard/',
    icon: icons.ChartColumn,
  },
  {
    label: 'Colaborators',
    to: '/dashboard/users',
    icon: icons.UsersRound,
  },
  {
    label: 'Departments',
    to: '/dashboard/departments',
    icon: icons.Grid2x2Check,
  },
  {
    label: 'About',
    to: '/dashboard/about',
    icon: icons.Newspaper,
  },
]

export function SideMenu() {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <ErrorBoundary>
      <aside
        className={`
        border-r border-default border-slate-600 bg-neutral-primary-soft
        transition-all duration-300 h-lvh
        ${collapsed ? 'w-16' : 'w-64'}
      `}
      >
        <div
          className={`flex items-center p-3 transition-all duration-300 ${collapsed ? '' : 'justify-end'}`}
        >
          <span className={`${collapsed ? 'hidden' : 'inline-flex pr-2'}`}>
            Menu
          </span>
          <button
            onClick={() => setCollapsed((value) => !value)}
            className="rounded-base p-2 hover:bg-neutral-tertiary"
          >
            <LazyIcon icon={icons.Hamburger} size={18} />
          </button>
        </div>

        <nav className="px-3">
          <ul className="space-y-2">
            {items.map((item) => (
              <NavbarItem
                key={`nav-${item.to}`}
                {...item}
                collapsed={collapsed}
              />
            ))}
          </ul>
        </nav>
      </aside>
    </ErrorBoundary>
  )
}
