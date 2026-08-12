export const UserByDepartmentSkeleton = () => {
  return (
    <div
      className="flex flex-col gap-4 w-full p-4 rounded-xl border border-white/10 bg-surface shadow-lg animate-pulse"
      style={{ maxWidth: '700px', aspectRatio: '1.618' }}
    >
      {/* Title / Header skeleton */}
      <div className="h-6 w-1/3 rounded-md bg-slate-700" />
      <div className="t-4 h-4 w-2/4 rounded-md bg-slate-700" />
      <div className="t-4 h-4 w-3/4 rounded-md bg-slate-700" />

      {/* Chart area skeleton layout matching the vertical grid and bars */}
      <div className="flex flex-col justify-between flex-1 py-2">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 w-full">
            {/* Y-Axis Label Placeholder */}
            <div className="h-8 w-24 rounded-sm shrink-0 bg-slate-700" />

            {/* Horizontal Bar Placeholder (stretching dynamically) */}
            <div
              className="h-8 rounded-md flex-1 bg-slate-700"
              style={{ width: `${Math.max(30, 90 - i * 10)}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
