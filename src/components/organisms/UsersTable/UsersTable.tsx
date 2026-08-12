import type { Statuses, TUserSearch, UserTableRow } from '#/types/users'
import type {
  ColumnDef,
  PaginationState,
  SortingState,
} from '@tanstack/react-table'
import { UsersTableHeader } from './TableHeader'
import { useGetUsers } from '#/hooks/users/useUsers'
import { useMemo } from 'react'
import { UserAvatarImage } from '#/components/atoms/UserAvatarImage/UserAvatarImage'
import { UserStatusRow } from '#/components/atoms/UserStatus/UserStatusRow'
import { UserTableActions } from './UserTableActions'
import { ErrorBoundary } from '#/components/molecules/ErrorBoundary'
import { DataTable } from '#/components/molecules/Table/DataTable'
import { SortableColumnHeader } from '#/components/molecules/Table/SortableColumnHeader'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'

export const columns: ColumnDef<UserTableRow>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
    enableSorting: false,
    cell: ({ row }) => {
      const user = row.original
      return <UserStatusRow status={user.status} />
    },
  },
  {
    accessorKey: 'image',
    header: 'Avatar',
    enableSorting: false,
    cell: ({ row }) => {
      const user = row.original
      return <UserAvatarImage src={user.image} alt={user.name} />
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return <SortableColumnHeader column={column} title="Name" />
    },
    enableSorting: true,
  },
  {
    accessorKey: 'jobTitle',
    header: ({ column }) => {
      return <SortableColumnHeader column={column} title="Job Title" />
    },
  },
  {
    accessorKey: 'department',
    header: ({ column }) => {
      return <SortableColumnHeader column={column} title="Department" />
    },
    enableSorting: true,
  },
  {
    accessorKey: 'city',
    header: ({ column }) => {
      return <SortableColumnHeader column={column} title="City" />
    },
    enableSorting: true,
  },
  {
    accessorKey: 'admissionDate',
    header: 'Admission',
    cell: ({ row }) => {
      const date = new Date(row.getValue('admissionDate'))
      return <span>{date.toLocaleDateString()}</span>
    },
  },
  {
    accessorKey: 'salary',
    header: 'Salary (Annual)',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('salary'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
      }).format(amount)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => {
      const user = row.original
      return <UserTableActions userId={user.id} name={user.name} />
    },
  },
]

export function UsersTable({ initialParams }: { initialParams: TUserSearch }) {
  const navigate = useNavigate()

  // TODO: Extract table logic to useUsersTable hook
  const pagination: PaginationState = {
    pageIndex: (initialParams.offset ?? 0) / (initialParams.limit ?? 10),
    pageSize: initialParams.limit ?? 10,
  }

  const sorting: SortingState = [
    {
      id: initialParams.orderBy ?? 'id',
      desc: initialParams.reverse ?? false,
    },
  ]

  const searchQuery = initialParams.where ?? ''
  const statusFilter = initialParams.status ?? 'All'

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
      where: val || undefined, // clear param if empty string
      offset: 0, // reset to page 1 on search change
    })
  }

  const handleStatusChange = (val: Statuses | 'All') => {
    updateSearchParams({
      status: val,
      offset: 0, // reset to page 1 on filter change
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

  const { data, isLoading, error } = useGetUsers({
    autoload: true,
    params: {
      limit: initialParams.limit ?? 10,
      offset: initialParams.offset ?? 0,
      where: initialParams.where ?? '',
      status: initialParams.status ?? 'All',
      orderBy: initialParams.orderBy ?? 'id',
      reverse: initialParams.reverse ?? false,
    },
  })

  const formattedUsers: UserTableRow[] = useMemo(() => {
    if (!data?.users) return []
    return data.users.map((user) => ({
      id: user.id ?? 0,
      image: user.image,
      name: `${user.firstName} ${user.lastName}`,
      jobTitle: user.company.jobTitle,
      department: user.company.department,
      city: user.address.city,
      admissionDate: user.admissionDate,
      salary: user.salary,
      status: user.status,
    }))
  }, [data])

  const tableData = useMemo(() => {
    if (!data) return { total: 0, users: [] }
    return {
      total: data.total,
      users: formattedUsers,
    }
  }, [data, formattedUsers])

  if (error) {
    console.error(error)
    toast.error(error.message)
    return (
      <ErrorBoundary>
        <div className="container mx-auto pb-10">
          <p>Error: {error.message}</p>
        </div>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <UsersTableHeader
        isLoading={isLoading}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        statusFilter={statusFilter}
        onStatusChange={handleStatusChange}
      />

      <div className="container mx-auto pb-6">
        <DataTable
          columns={columns}
          data={tableData.users}
          isLoading={isLoading}
          rowCount={tableData.total}
          pagination={pagination}
          onPaginationChange={handlePaginationChange}
          sorting={sorting}
          onSortingChange={handleSortingChange}
          caption="Cognitive Debt Colaborators"
        />
      </div>
    </ErrorBoundary>
  )
}
