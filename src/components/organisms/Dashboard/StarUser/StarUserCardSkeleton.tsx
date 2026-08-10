import { Card } from '#/components/atoms/Card/Card'

export function StarUserCardSkeleton() {
  return (
    <Card
      outerClass="mt-4 max-w-4xl"
      innerClass="flex flex-col gap-2 items-start content-start self-start rounded-2xl border border-white/10 bg-surface p-4 shadow-2xl shadow-black/30"
    >
      {/* User main card skeleton */}
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
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 pr-2">
          {/* Department skeleton */}
          <div className="h-4 w-30 rounded bg-slate-700/70" />
          {/* Role skeleton */}
          <div className="h-4 w-30 rounded bg-slate-700/70" />
        </div>
      </section>
    </Card>
  )
}
