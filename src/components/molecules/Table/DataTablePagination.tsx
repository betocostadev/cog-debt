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
      <div
        className="w-full flex items-center justify-center px-2 pt-4 pb-6"
        data-testid="table-pagination"
      >
        <div className="w-full flex items-center justify-center space-x-2">
          <BaseButton
            label="First page"
            data-testid="pagination-first-page"
            loading={false}
            className="hidden lg:flex text-sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          />
          <span className="sr-only">Go to first page</span>

          <BaseButton
            label="Prev"
            data-testid="pagination-previous-page"
            loading={false}
            className="text-sm"
            iconLeft={icons.ChevronLeft}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          />
          <span className="sr-only">Go to previous page</span>

          <div
            className="flex w-25 items-center justify-center text-sm font-medium"
            data-testid="pagination-current-page"
          >
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </div>

          <BaseButton
            label="Next"
            data-testid="pagination-next-page"
            loading={false}
            className="text-sm"
            iconRight={icons.ChevronRight}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          />
          <span className="sr-only">Go to next page</span>

          <BaseButton
            label="Last page"
            data-testid="pagination-last-page"
            loading={false}
            className="hidden lg:flex text-sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          />
          <span className="sr-only">Go to last page</span>
        </div>
      </div>
    </Suspense>
  )
}
