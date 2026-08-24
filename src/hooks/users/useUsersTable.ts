import type { Statuses, TUserSearch } from '#/types/users'
import type { PaginationState, SortingState } from '@tanstack/react-table'
import { useGetUsers } from './useUsers'
import { useNavigate } from '@tanstack/react-router'

export const useUsersTable = ({
  initialParams,
}: {
  initialParams: TUserSearch
}) => {
  const navigate = useNavigate()

  const limit = initialParams.limit ?? 10
  const offset = initialParams.offset ?? 0
  const orderBy = initialParams.orderBy ?? 'id'
  const reverse = initialParams.reverse ?? false
  const searchQuery = initialParams.where ?? ''
  const statusFilter = initialParams.status ?? 'All'

  const pagination: PaginationState = {
    pageIndex: Math.floor(offset / limit),
    pageSize: limit,
  }

  const sorting: SortingState = [
    {
      id: orderBy,
      desc: reverse,
    },
  ]

  const updateSearchParams = (updates: Record<string, any>) => {
    navigate({
      to: '/dashboard/users',
      search: (prev) => ({
        ...prev,
        ...updates,
      }),
      replace: true,
    })
  }

  const handleSearchChange = (val: string) => {
    updateSearchParams({
      where: val || undefined,
      offset: 0,
    })
  }

  const handleStatusChange = (val: Statuses | 'All') => {
    updateSearchParams({
      status: val,
      offset: 0,
    })
  }

  const handlePaginationChange = (updaterOrValue: any) => {
    const newPagination =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(pagination)
        : updaterOrValue

    updateSearchParams({
      limit: newPagination.pageSize,
      offset: newPagination.pageIndex * newPagination.pageSize,
    })
  }

  const handleSortingChange = (updaterOrValue: any) => {
    const newSorting =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(sorting)
        : updaterOrValue

    const currentSort = newSorting[0] || { id: 'id', desc: false }
    updateSearchParams({
      orderBy: currentSort.id,
      reverse: currentSort.desc,
      offset: 0,
    })
  }

  const { data, isLoading, isFetching, error } = useGetUsers({
    autoload: true,
    params: {
      limit,
      offset,
      where: searchQuery,
      status: statusFilter,
      orderBy,
      reverse,
    },
  })

  return {
    data,
    isLoading,
    isFetching,
    error,
    searchQuery,
    handleSearchChange,
    statusFilter,
    handleStatusChange,
    pagination,
    handlePaginationChange,
    sorting,
    handleSortingChange,
  }
}
