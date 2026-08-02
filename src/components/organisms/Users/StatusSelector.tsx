import LazyIcon from '#/components/atoms/Icons/LazyIcon'
import { getUserStatusIcon } from '#/components/atoms/UserStatus/UserStatusRow'
import { Statuses } from '#/types/users'
import { useId } from 'react'

interface StatusSelectorProps {
  selectedStatus: Statuses
  onStatusChange: (value: Statuses) => void
}

export function StatusSelector({
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
          icon={getUserStatusIcon(selectedStatus)}
          iconColor={
            selectedStatus === Statuses.ACTIVE
              ? 'lawngreen'
              : selectedStatus === Statuses.INACTIVE
                ? 'red'
                : selectedStatus === Statuses.ONLEAVE
                  ? 'palevioletred'
                  : 'cornflowerblue'
          }
          size={22}
        />
      </label>
      <select
        id={statusId}
        value={selectedStatus}
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
  )
}
