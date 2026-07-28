import { TableHeaderSkeleton } from '#/components/atoms/Table/TableHeaderSkeleton'
import type { UserTableRow } from '#/types/users'
import type { ColumnDef, PaginationState } from '@tanstack/react-table'
import { UsersTableHeader } from './TableHeader'
import { UsersDataTable } from './UsersDataTable'
import { useGetUsers } from '#/hooks/users/useUsers'
import { useMemo, useState } from 'react'
import { UserAvatarImage } from '#/components/atoms/UserAvatarImage/UserAvatarImage'
import { UserStatusRow } from '#/components/atoms/UserStatus/UserStatusRow'
import { UserTableActions } from './UserTableActions'
import { ErrorBoundary } from '#/components/molecules/ErrorBoundary'

export const columns: ColumnDef<UserTableRow>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const user = row.original
      return <UserStatusRow status={user.status} />
    },
  },
  {
    accessorKey: 'image',
    header: 'Avatar',
    cell: ({ row }) => {
      const user = row.original
      return <UserAvatarImage src={user.image} alt={user.name} />
    },
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'jobTitle',
    header: 'Job Title',
  },
  {
    accessorKey: 'department',
    header: 'Department',
  },
  {
    accessorKey: 'city',
    header: 'City',
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

export function UsersTableContainer() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const limit = pagination.pageSize
  const offset = pagination.pageIndex * pagination.pageSize

  const { data, isLoading, error } = useGetUsers({
    params: { limit, offset, orderBy: 'firstName', reverse: false },
  })

  console.log('Users Table - isLoading ?', isLoading)

  if (error) {
    console.log(error)
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
    if (!data) return undefined
    return {
      total: data.total,
      users: formattedUsers,
    }
  }, [data, formattedUsers])

  return (
    <>
      <TableHeaderSkeleton />
      <UsersTableHeader />

      <div className="container mx-auto py-10">
        <ErrorBoundary>
          <UsersDataTable
            columns={columns}
            data={tableData}
            isLoading={isLoading}
            pagination={pagination}
            onPaginationChange={setPagination}
          />
        </ErrorBoundary>
      </div>
    </>
  )
}
