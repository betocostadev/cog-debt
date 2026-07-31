import { Card } from '#/components/atoms/Card/Card'

export function UserViewProfileSkeleton() {
  return (
    <Card outerClass="bg-slate-900">
      {/* User main card skeleton */}
      <div className="w-full flex flex-row content-between justify-between items-center rounded-2xl border border-white/10 bg-surface p-4 shadow-2xl shadow-black/20 animate-pulse">
        <div className="flex items-center gap-2">
          {/* Avatar Skeleton (size='xl' is h-28 w-28) */}
          <div className="h-28 w-28 rounded-full bg-slate-700" />

          <div className="flex flex-col gap-2 pl-2">
            {/* Name skeleton */}
            <div className="h-6 w-40 rounded bg-slate-700" />
            {/* Email skeleton */}
            <div className="h-4 w-52 rounded bg-slate-700/70" />
            {/* Phone skeleton */}
            <div className="h-4 w-32 rounded bg-slate-700/70" />
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 pr-2">
          {/* Status skeleton */}
          <div className="h-4 w-16 rounded bg-slate-700/70" />
          {/* ID skeleton */}
          <div className="h-4 w-20 rounded bg-slate-700/70" />
          {/* Username skeleton */}
          <div className="h-4 w-24 rounded bg-slate-700/70" />
        </div>
      </div>

      {/* Company Data Skeleton */}
      <section className="px-2 py-2 animate-pulse">
        <div className="h-6 w-56 rounded bg-slate-700 my-2" />
        <div className="flex justify-between pb-2">
          <div className="h-4 w-44 rounded bg-slate-700/70" />
          <div className="h-4 w-48 rounded bg-slate-700/70" />
        </div>
        <div className="flex justify-between pb-2">
          <div className="h-4 w-40 rounded bg-slate-700/70" />
          <div className="h-4 w-36 rounded bg-slate-700/70" />
        </div>
      </section>

      {/* Address Skeleton */}
      <section className="px-2 animate-pulse">
        <div className="h-6 w-36 rounded bg-slate-700 my-2" />
        <div className="h-4 w-56 rounded bg-slate-700/70 pb-2" />
      </section>
    </Card>
  )
}
