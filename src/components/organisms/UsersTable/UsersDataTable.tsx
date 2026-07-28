import type {
  ColumnDef,
  PaginationState,
  OnChangeFn,
} from '@tanstack/react-table'
import { DataTable } from '#/components/molecules/Table/DataTable'
import type { UserTableRow } from '#/types/users'

interface UsersDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data?: {
    total: number
    users: UserTableRow[]
  }
  isLoading: boolean
  pagination: PaginationState
  onPaginationChange: OnChangeFn<PaginationState>
}

export function UsersDataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  pagination,
  onPaginationChange,
}: UsersDataTableProps<TData, TValue>) {
  return (
    <DataTable
      columns={columns}
      data={data?.users as TData[]}
      isLoading={isLoading}
      rowCount={data?.total ?? 0}
      pagination={pagination}
      onPaginationChange={onPaginationChange}
      caption="Cognitive Debt Employees"
    />
  )
}
