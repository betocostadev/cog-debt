import { icons } from '#/utils/icons'
import { Suspense } from 'react'
import { BaseButton } from '../atoms/Buttons/BaseButton'
import { TablePaginationSkeleton } from '../atoms/Table/TablePaginationSkeleton'

type PaginationProps = {
  handlePrev: () => void
  handleNext: () => void
  isLoading: boolean
  page: number
  pages: number
}

export default function TablePagination({
  handlePrev,
  handleNext,
  isLoading,
  page,
  pages,
}: PaginationProps) {
  return (
    <Suspense fallback={<TablePaginationSkeleton />}>
      <div className="w-full flex items-center justify-center gap-12 py-6">
        <BaseButton
          label="Prev"
          loading={false}
          onClick={handlePrev}
          iconLeft={icons.ChevronLeft}
          disabled={page <= 1 || isLoading}
        />

        <div>
          <p>
            Page: {page} / {pages}
          </p>
        </div>

        <BaseButton
          label="Next"
          loading={isLoading}
          onClick={handleNext}
          iconRight={icons.ChevronRight}
          disabled={page >= pages || isLoading}
        />
      </div>
    </Suspense>
  )
}
