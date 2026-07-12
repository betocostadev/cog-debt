import { useState } from 'react'
import { NavbarItem } from '#/components/molecules/NavBarItem'
import { Hamburger, Grid2x2Check, UsersRound } from 'lucide-react'

const items = [
  {
    label: 'Employees',
    to: '/dashboard/users',
    icon: UsersRound,
  },
  {
    label: 'Departments',
    to: '/dashboard/departments',
    icon: Grid2x2Check,
  },
]

export function SideMenu() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`
        border-r border-default border-slate-600 bg-neutral-primary-soft
        transition-all duration-300 h-lvh
        ${collapsed ? 'w-16' : 'w-64'}
      `}
    >
      <div
        className={`flex items-center p-3 ${collapsed ? '' : 'justify-end'}`}
      >
        <button
          onClick={() => setCollapsed((value) => !value)}
          className="rounded-base p-2 hover:bg-neutral-tertiary"
        >
          <Hamburger size={18} />
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
  )
}
