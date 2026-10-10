import { Card } from '#/components/atoms/Card/Card'

export function StarUserCardSkeleton() {
  return (
    <Card
      outerClass="mt-4 p-2 bg-slate-800 rounded-2xl max-w-2xl"
      innerClass="w-full flex flex-col content-center justify-center rounded-2xl border border-white/10 bg-surface p-4 shadow-2xl shadow-black/20"
    >
      {/* User main card skeleton */}
      <div className="my-2 h-4 w-48 rounded bg-slate-700" />
      <section className="w-full flex flex-row content-between justify-between items-center rounded-2xl border border-white/10 bg-surface p-4 shadow-2xl shadow-black/20 animate-pulse">
        <div className="flex items-center gap-2">
          {/* Avatar Skeleton (size='xl' is h-28 w-28) */}
          <div className="h-28 w-28 rounded-full bg-slate-700" />

          <div className="flex flex-col gap-2 pl-2">
            {/* Name skeleton */}
            <div className="h-6 w-40 rounded bg-slate-700" />
            {/* Email skeleton */}
            <div className="h-4 w-52 rounded bg-slate-700/70" />
            {/* Status skeleton */}
            <div className="h-4 w-16 rounded bg-slate-700/70" />
            {/* Department skeleton */}
            <div className="pt-6 h-4 w-30 rounded bg-slate-700/70" />
            {/* Role skeleton */}
            <div className="h-4 w-30 rounded bg-slate-700/70" />
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 pr-2"></div>
      </section>
    </Card>
  )
}
