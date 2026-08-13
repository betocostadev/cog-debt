import { UserAvatarImage } from '#/components/atoms/UserAvatarImage/UserAvatarImage'
import { UserStatusRow } from '#/components/atoms/UserStatus/UserStatusRow'
import { ErrorBoundary } from '#/components/molecules/ErrorBoundary'
import { DataTable } from '#/components/molecules/Table/DataTable'
import { useGetUsers } from '#/hooks/users/useUsers'
import type { UserTableRow } from '#/types/users'
import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { toast } from 'sonner'
import { DeptTableUserView } from './DeptTableUserView'

export const columns: ColumnDef<
  Pick<UserTableRow, 'id' | 'image' | 'name' | 'jobTitle' | 'status'>
>[] = [
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
    header: () => {
      return <span>Name</span>
    },
    enableSorting: true,
  },
  {
    accessorKey: 'jobTitle',
    header: () => {
      return <span>Job Title</span>
    },
  },
  {
    accessorKey: 'action',
    header: '',
    cell: ({ row }) => {
      const user = row.original
      return <DeptTableUserView userId={user.id} />
    },
  },
]
export function DeptUsersTable({
  departmentTitle,
}: {
  departmentTitle: string
}) {
  const { data, isLoading, error } = useGetUsers({
    autoload: true,
    params: {
      limit: 5,
      offset: 0,
      where: departmentTitle,
      status: 'All',
      orderBy: 'id',
      reverse: false,
    },
  })

  const formattedUsers: Pick<
    UserTableRow,
    'id' | 'image' | 'name' | 'jobTitle' | 'status'
  >[] = useMemo(() => {
    if (!data?.users) return []
    return data.users.map((user) => ({
      id: user.id ?? 0,
      image: user.image,
      name: `${user.firstName} ${user.lastName}`,
      jobTitle: user.company.jobTitle,
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
    <DataTable
      columns={columns}
      data={tableData.users}
      isLoading={isLoading}
      rowCount={tableData.total}
      caption="Department workforce"
    />
  )
}
