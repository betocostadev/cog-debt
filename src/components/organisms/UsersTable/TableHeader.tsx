import { BaseButton } from '#/components/atoms/Buttons/BaseButton'
import { TableHeaderSkeleton } from '#/components/atoms/Table/TableHeaderSkeleton'
import { ErrorBoundary } from '#/components/molecules/ErrorBoundary'

import { InputText } from '#/components/molecules/Form/InputText'
import { Statuses } from '#/types/users'
import { debounce } from '#/utils/debounce'
import { icons } from '#/utils/icons'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'

interface UsersTableHeaderProps {
  isLoading: boolean
  searchQuery: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: Statuses | 'All') => void
}

export function UsersTableHeader({
  isLoading,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: UsersTableHeaderProps) {
  const navigate = useNavigate()
  const [hasFirstFetch, setHasFirstFetch] = useState<boolean>(false)

  const [localSearch, setLocalSearch] = useState<string>(searchQuery)

  useEffect(() => {
    setLocalSearch(searchQuery)
  }, [searchQuery])

  const handleRedirectNewUser = () => {
    navigate({
      to: '/dashboard/users/new',
      viewTransition: { types: ['slide-left'] },
    })
  }

  const statusOptions = ['All', ...Object.values(Statuses)]

  const debouncedSearchChange = useMemo(
    () => debounce((value: string) => onSearchChange(value), 800),
    [onSearchChange],
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocalSearch(value)
    debouncedSearchChange(value)
  }

  useEffect(() => {
    if (isLoading && !hasFirstFetch) {
      setHasFirstFetch(true)
    }
  }, [isLoading])

  if (isLoading && !hasFirstFetch) {
    return (
      <ErrorBoundary>
        <TableHeaderSkeleton />
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <div className="flex mb-2 items-center flex-col sm:flex-row pl-1 pr-2 pt-2">
        <div className="w-full sm:w-4/6 pr-4">
          <InputText
            id="search-field"
            placeholder="Search by name, department, or city"
            value={localSearch}
            error=""
            // disabled={isLoading && hasFirstFetch}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col sm:flex-row w-full sm:w-3/6 lg:w-2/6 ml-0 sm:ml-4 pr-4">
          <label
            htmlFor="status-select"
            className="text-secondary text-xs sm:text-md"
          >
            Filter by status
          </label>
          <select
            id="status-select"
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value as Statuses)}
            className={`h-full w-full rounded-md border border-input px-2 py-2 text-sm ${isLoading && hasFirstFetch ? 'bg-slate-600 cursor-not-allowed' : ''}`}
            disabled={isLoading && hasFirstFetch}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:self-end sm:mt-0 md:mt-0 md:self-center mt-4">
          <BaseButton
            title="Add User"
            label="Add"
            variant="primary"
            iconRight={icons.UserPlus}
            iconSize={20}
            loading={false}
            onClick={handleRedirectNewUser}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
}
