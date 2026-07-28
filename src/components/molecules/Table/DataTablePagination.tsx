import type { Table } from '@tanstack/react-table'
import { icons } from '#/utils/icons'
import { Suspense } from 'react'
import { BaseButton } from '../../atoms/Buttons/BaseButton'
import { TablePaginationSkeleton } from '../../atoms/Table/TablePaginationSkeleton'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export default function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <Suspense fallback={<TablePaginationSkeleton />}>
      <div className="w-full flex items-center justify-center px-2 pt-4 pb-6">
        <div className="w-full flex items-center justify-center space-x-2">
          <BaseButton
            label="First page"
            loading={false}
            className="hidden lg:flex font-light"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          />
          <span className="sr-only">Go to first page</span>

          <BaseButton
            label="Prev"
            loading={false}
            iconLeft={icons.ChevronLeft}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          />
          <span className="sr-only">Go to previous page</span>

          <div className="flex w-25 items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </div>

          <BaseButton
            label="Next"
            loading={false}
            iconRight={icons.ChevronRight}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          />
          <span className="sr-only">Go to next page</span>

          <BaseButton
            label="Last page"
            loading={false}
            className="hidden lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          />
          <span className="sr-only">Go to last page</span>
        </div>
      </div>
    </Suspense>
  )
}
