export function UserStatusChartSkeleton() {
  return (
    <>
      <div className="h-6 w-1/3 rounded-md bg-slate-700" />
      <div className="my-4 h-4 w-2/4 rounded-md bg-slate-700" />
      <div
        style={{
          width: '100%',
          maxWidth: '250px',
          maxHeight: '60vh',
          aspectRatio: 1,
        }}
        className="mx-auto animate-pulse rounded-full bg-slate-700"
      />
    </>
  )
}
