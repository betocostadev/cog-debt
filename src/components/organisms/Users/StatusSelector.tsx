import LazyIcon from '#/components/atoms/Icons/LazyIcon'
import { Statuses } from '#/types/users'
import { getUserStatusIcon } from '#/utils/userHelper'
import { useId } from 'react'

interface StatusSelectorProps {
  isLoading: boolean
  selectedStatus: Statuses
  onStatusChange: (value: Statuses) => void
}

export function StatusSelector({
  isLoading,
  selectedStatus = Statuses.ACTIVE,
  onStatusChange,
}: StatusSelectorProps) {
  const statusId = useId()
  const statusOptions = [...Object.values(Statuses)]

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={statusId} className="text-secondary text-md flex">
        Status{' '}
        <LazyIcon
          iconClassName="ml-2"
          icon={getUserStatusIcon(selectedStatus).icon}
          iconColor={getUserStatusIcon(selectedStatus).color}
          size={22}
        />
      </label>
      <select
        id={statusId}
        value={selectedStatus}
        disabled={isLoading}
        onChange={(e) => onStatusChange(e.target.value as Statuses)}
        className={`h-full w-full rounded-md border border-input px-2 py-2 text-sm ${isLoading ? 'bg-slate-600 cursor-not-allowed' : ''}`}
      >
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  )
}
