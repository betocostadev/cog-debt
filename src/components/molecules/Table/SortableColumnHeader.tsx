import LazyIcon from '#/components/atoms/Icons/LazyIcon'
import { icons } from '#/utils/icons'
import type { Column } from '@tanstack/react-table'

interface SortableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>
  title: string
}
export function SortableColumnHeader<TData, TValue>({
  column,
  title,
}: SortableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <span>{title}</span>
  }

  const sorted = column.getIsSorted()

  return (
    <button
      className="w-full flex items-center justify-between gap-2 hover:text-foreground transition-colors pr-2"
      onClick={() => column.toggleSorting(sorted === 'asc')}
    >
      <span>{title}</span>
      {sorted === 'desc' ? (
        <LazyIcon icon={icons.ArrowDown} size={16} iconColor="lawngreen" />
      ) : sorted === 'asc' ? (
        <LazyIcon icon={icons.ArrowUp} size={16} iconColor="palevioletred" />
      ) : (
        <LazyIcon
          icon={icons.ArrowUpDown}
          size={16}
          iconClassName="opacity-50"
        />
      )}
    </button>
  )
}
