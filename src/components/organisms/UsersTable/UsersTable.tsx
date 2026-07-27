import { TableHeaderSkeleton } from '#/components/atoms/Table/TableHeaderSkeleton'
import TablePagination from '#/components/molecules/TablePagination'
import { Statuses } from '#/types/users'
import type { ColumnDef } from '@tanstack/react-table'
import { UsersTableHeader } from './TableHeader'
import { UsersDataTable } from './UsersDataTable'

type UsersTableProps = {
  handlePrev: () => void
  handleNext: () => void
  isLoading: boolean
  page: number
  pages: number
}

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

export function UsersTable({
  handlePrev,
  handleNext,
  isLoading,
  page,
  pages,
}: UsersTableProps) {
  return (
    <>
      <TableHeaderSkeleton />
      <UsersTableHeader />

      <div className="container mx-auto py-10">
        <UsersDataTable columns={columns} data={users} />
      </div>

      <TablePagination
        handlePrev={handlePrev}
        handleNext={handleNext}
        isLoading={isLoading}
        page={page}
        pages={pages}
      />
    </>
  )
}
