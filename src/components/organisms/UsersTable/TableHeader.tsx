import { BaseButton } from '#/components/atoms/Buttons/BaseButton'

import { InputText } from '#/components/molecules/Form/InputText'
import { Statuses } from '#/types/users'
import { icons } from '#/utils/icons'
import { useNavigate } from '@tanstack/react-router'

interface UsersTableHeaderProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: Statuses | 'All') => void
}

export function UsersTableHeader({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: UsersTableHeaderProps) {
  const navigate = useNavigate()

  const handleRedirectNewUser = () => {
    navigate({ to: '/dashboard/users/new' })
  }

  const statusOptions = ['All', ...Object.values(Statuses)]
  // TODO: Move Filter Select and Search to its own components
  return (
    <div className="flex mb-2">
      <div className="w-4/6 mr-4">
        <InputText
          id="search-field"
          placeholder="Search by name, department, or city"
          value={searchQuery}
          error=""
          disabled={false}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex flex-row h-11 w-2/6 ml-4 items-center">
        <label htmlFor="status-select" className="text-secondary text-sm">
          Filter by status:
        </label>
        <select
          id="status-select"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value as Statuses)}
          className="h-full w-full rounded-md border border-input px-2 py-2 text-sm"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <div className="flex w-1/6 justify-end">
        <BaseButton
          title="Add User"
          label="Add"
          variant="primary"
          className="h-12"
          iconRight={icons.UserPlus}
          iconSize={20}
          loading={false}
          onClick={handleRedirectNewUser}
        />
      </div>
    </div>
  )
}
