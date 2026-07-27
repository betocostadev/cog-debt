import { DataTable } from '#/components/molecules/Table/DataTable'
import type { ColumnDef } from '@tanstack/react-table'

interface UsersDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function UsersDataTable<TData, TValue>({
  columns,
  data,
}: UsersDataTableProps<TData, TValue>) {
  return <DataTable columns={columns} data={data} caption="Employees" />
}
