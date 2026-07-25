export function TablePaginationSkeleton() {
  return (
    <div className="w-full flex items-center justify-center gap-12 py-6 animate-pulse">
      <div className="h-10 w-24 bg-gray-200 rounded-md" />

      <div className="h-5 w-28 bg-gray-200 rounded-md" />

      <div className="h-10 w-24 bg-gray-200 rounded-md" />
    </div>
  )
}
