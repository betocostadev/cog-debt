import type { Statuses, UserTableRow } from '#/types/users'
import type {
  ColumnDef,
  PaginationState,
  SortingState,
} from '@tanstack/react-table'
import { UsersTableHeader } from './TableHeader'
import { useGetUsers } from '#/hooks/users/useUsers'
import { useMemo, useState } from 'react'
import { UserAvatarImage } from '#/components/atoms/UserAvatarImage/UserAvatarImage'
import { UserStatusRow } from '#/components/atoms/UserStatus/UserStatusRow'
import { UserTableActions } from './UserTableActions'
import { ErrorBoundary } from '#/components/molecules/ErrorBoundary'
import { DataTable } from '#/components/molecules/Table/DataTable'
import { SortableColumnHeader } from '#/components/molecules/Table/SortableColumnHeader'

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
        currency: 'USD',
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

export function UsersTable() {
  // TODO: Extract table logic to useUsersTable hook
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<Statuses | 'All'>('All')
  const limit = pagination.pageSize
  const offset = pagination.pageIndex * pagination.pageSize
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'id', desc: false },
  ])

  const currentSort = sorting[0]
  const orderBy = currentSort.id
  const reverse = currentSort.desc

  const { data, isLoading, error } = useGetUsers({
    params: {
      limit,
      offset,
      where: searchQuery,
      status: statusFilter,
      orderBy,
      reverse,
    },
  })

  const handleSearchChange = (val: string) => {
    setSearchQuery(val)
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }

  const handleStatusChange = (val: Statuses | 'All') => {
    setStatusFilter(val)
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }

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
    console.log(error)
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

      <div className="container mx-auto pb-10">
        <DataTable
          columns={columns}
          data={tableData.users}
          isLoading={isLoading}
          rowCount={tableData.total}
          pagination={pagination}
          onPaginationChange={setPagination}
          sorting={sorting}
          onSortingChange={setSorting}
          caption="Cognitive Debt Colaborators"
        />
      </div>
    </ErrorBoundary>
  )
}
