import LazyIcon from '#/components/atoms/Icons/LazyIcon'
import { ErrorBoundary } from '#/components/molecules/ErrorBoundary'
import { NavbarItem } from '#/components/molecules/NavbarItem'
import { icons } from '#/utils/icons'
import { useState } from 'react'

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

export function HeaderNav() {
  const [collapsed, setCollapsed] = useState(true)

  const handleBlur: React.FocusEventHandler<HTMLDivElement> = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setCollapsed(true)
    }
  }

  return (
    <ErrorBoundary>
      <div
        className={`
          absolute right-0 top-full bg-background/90 shadow-xl border border-slate-600 rounded-l-md
          transition-all duration-300 ease-in-out z-40 overflow-hidden
          ${collapsed ? 'w-14 h-14' : 'w-48 h-auto pb-4'}
        `}
        onBlur={handleBlur}
      >
        <div
          className={`flex p-3 items-center transition-all duration-300 ${
            collapsed ? 'justify-center' : 'justify-end'
          }`}
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
            onClick={() => setCollapsed((value) => !value)}
            className="rounded-base p-2 hover:bg-neutral-tertiary cursor-pointer"
            aria-label="Toggle Menu"
          >
            <LazyIcon icon={icons.Hamburger} size={18} />
          </button>
        </div>

        <nav className="px-2">
          <ul
            className={`space-y-2 transition-opacity duration-300 ${
              collapsed
                ? 'opacity-0 pointer-events-none invisible'
                : 'opacity-150 visible'
            }`}
          >
            {items.map((item) => (
              <NavbarItem
                key={`nav-${item.to}`}
                {...item}
                collapsed={collapsed}
                collapse={() => setCollapsed(true)}
              />
            ))}
          </ul>
        </nav>
      </div>
    </ErrorBoundary>
  )
}
