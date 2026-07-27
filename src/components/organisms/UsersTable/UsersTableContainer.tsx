import { TableHeaderSkeleton } from '#/components/atoms/Table/TableHeaderSkeleton'
import { Statuses } from '#/types/users'
import type { ColumnDef } from '@tanstack/react-table'
import { UsersTableHeader } from './TableHeader'
import { UsersDataTable } from './UsersDataTable'

type UsersDataTable = {
  id: string
  status: Statuses
  email: string
}

export const users: UsersDataTable[] = [
  {
    id: '728ed52f',
    status: Statuses.ACTIVE,
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    status: Statuses.ONLEAVE,
    email: 'vacat@gmail.com',
  },
  {
    id: '432x1d42',
    status: Statuses.ONLEAVE,
    email: 'example@gmail.com',
  },
]

export const columns: ColumnDef<UsersDataTable>[] = [
  {
    accessorKey: 'id',
    header: '#',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
]

export function UsersTableContainer() {
  return (
    <>
      <TableHeaderSkeleton />
      <UsersTableHeader />

      <div className="container mx-auto py-10">
        <UsersDataTable columns={columns} data={users} />
      </div>
    </>
  )
}
