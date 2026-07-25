import { TableHeaderSkeleton } from '#/components/atoms/Table/TableHeaderSkeleton'
import TablePagination from '#/components/molecules/TablePagination'
import { UsersTableHeader } from './TableHeader'

type UsersTableProps = {
  handlePrev: () => void
  handleNext: () => void
  isLoading: boolean
  page: number
  pages: number
}

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
      <div>
        Table
        <table>
          <thead>
            <th>Name</th>
            <th>Email</th>
          </thead>
          <tbody>
            <td>Someone</td>
            <td>Someone@something.com</td>
          </tbody>
        </table>
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
