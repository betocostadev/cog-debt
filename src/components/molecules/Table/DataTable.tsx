import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/atoms/Table/Table'
import type {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  SortingState,
} from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import DataTablePagination from './DataTablePagination'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading: boolean
  rowCount: number
  pagination: PaginationState
  onPaginationChange: OnChangeFn<PaginationState>
  sorting: SortingState
  onSortingChange: OnChangeFn<SortingState>
  caption?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  rowCount,
  pagination,
  onPaginationChange,
  sorting,
  onSortingChange,
  caption,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    rowCount,
    state: {
      pagination,
      sorting,
    },
    onPaginationChange,
    onSortingChange,
  })

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        {caption && <TableCaption>{caption}</TableCaption>}
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: columns.length }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((__, colIndex) => (
                  <TableCell key={colIndex}>
                    <div className="h-8 w-full animate-pulse rounded-full bg-slate-600 my-2"></div>
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {/* <TableFooter>Table Footer</TableFooter> */}
      </Table>
      <DataTablePagination table={table} />
    </div>
  )
}
