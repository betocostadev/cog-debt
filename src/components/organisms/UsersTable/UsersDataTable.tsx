import { DataTable } from '#/components/atoms/Table/DataTable'
import type { ColumnDef } from '@tanstack/react-table'

interface UsersDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function UsersDataTable<TData, TValue>({
  columns,
  data,
}: UsersDataTableProps<TData, TValue>) {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
