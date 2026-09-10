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
        data-testid="side-menu-container"
        className={`
        sticky top-16 border-r border-default border-slate-600 bg-neutral-primary-soft
        transition-all duration-300 h-lvh z-30
        ${collapsed ? 'w-16' : 'w-56'}
      `}
      >
        <div
          className={`flex items-center p-3 transition-all duration-300 z-30 ${collapsed ? 'justify-center' : 'justify-end'}`}
        >
          <span
            className={`transition-opacity duration-300 whitespace-nowrap ${
              collapsed
                ? 'opacity-0 pointer-events-none w-0 overflow-hidden'
                : 'opacity-100 inline-flex pr-2'
            }`}
          >
            Menu
          </span>
          <button
            data-testid="toggle-side-menu-btn"
            onClick={() => setCollapsed((value) => !value)}
            className="rounded-base p-2 pl-1 hover:bg-neutral-tertiary cursor-pointer"
            aria-label="Toggle Menu"
          >
            <LazyIcon icon={icons.Hamburger} size={18} />
          </button>
        </div>

        <nav data-testid="side-menu-nav" className="px-3">
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
