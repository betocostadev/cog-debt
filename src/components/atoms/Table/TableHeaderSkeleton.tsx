export function TableHeaderSkeleton() {
  return (
    <div className="flex content-evenly items-center w-full h-18 p-2 mt-2 mb-6 border-2 border-slate-400 rounded-xl">
      <div className="h-10 w-3/4 mr-2 animate-pulse rounded-full bg-slate-700" />
      <div className="h-10 w-1/4 mr-2 animate-pulse rounded-full bg-slate-700" />
      <div className="h-10 w-1/4 animate-pulse rounded-full bg-slate-700" />
    </div>
  )
}
