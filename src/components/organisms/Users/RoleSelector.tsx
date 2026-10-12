import type { TUserRoles } from '#/types/users'
import { useId } from 'react'

interface RoleSelectorProps {
  isLoading: boolean
  selectedRole: TUserRoles
  onRoleChange: (value: TUserRoles) => void
}

export function RoleSelector({
  isLoading,
  selectedRole = 'user',
  onRoleChange,
}: RoleSelectorProps) {
  const roleId = useId()
  const roleOptions = ['admin', 'moderator', 'user']

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={roleId} className="text-secondary text-md flex">
        Role{' '}
      </label>
      <select
        id={roleId}
        value={selectedRole}
        disabled={isLoading}
        onChange={(e) => onRoleChange(e.target.value as TUserRoles)}
        className={`h-full w-full rounded-md border border-input px-2 py-2 text-sm ${isLoading ? 'bg-slate-600 cursor-not-allowed' : ''}`}
      >
        {roleOptions.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
    </div>
  )
}
