import { ErrorBoundary } from '#/components/molecules/ErrorBoundary'
import { useGetUsersByStatus } from '#/hooks/users/useUsers'
import { TEN_MINUTES } from '#/utils/constants'
import type { PieSectorShapeProps, LabelProps } from 'recharts'
import { PieChart, Pie, Sector, Label, LabelList } from 'recharts'

const colors = [
  '#7cfc00', // lawngreen
  '#ff0000', // red
  '#6495ed', // cornflowerblue
  '#db7093', // palevioletred
  'url(#pattern-checkers)',
]

const UsersPie = (props: PieSectorShapeProps) => (
  <Sector {...props} fill={colors[props.index % colors.length]} />
)

const ChartLabel = (props: LabelProps) => (
  <Label
    {...props}
    fill={colors[(props.index ?? 0) % colors.length]}
    position="outside"
    offset={5} // Distance from center
    angle={-5} // Angle the labels
  />
)

export function UserStatusChart() {
  const isAnimationActive = true
  const { data, isLoading, error } = useGetUsersByStatus({
    options: { autoload: true, refetchInterval: TEN_MINUTES },
  })

  if (isLoading) {
    return (
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          maxHeight: '70vh',
          aspectRatio: 1,
        }}
        className="animate-pulse rounded-4xl bg-slate-700"
      />
    )
  }

  if (error) {
    return (
      <ErrorBoundary>
        <div className="flex flex-col gap-2">
          <p className="text-red-400">Error fetching users by statuses</p>
          {error.message && <pre>{error.message}</pre>}
        </div>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      {data && (
        <PieChart
          style={{
            width: '100%',
            maxWidth: '400px',
            maxHeight: '70vh',
            aspectRatio: 1.5,
          }}
          responsive
        >
          <defs>
            <pattern
              id="pattern-checkers"
              x="0"
              y="0"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <rect className="checker" x="0" width="5" height="5" y="0" />
              <rect className="checker" x="10" width="5" height="5" y="10" />
            </pattern>
          </defs>
          <Pie
            data={data.usersByStatus}
            isAnimationActive={isAnimationActive}
            shape={UsersPie}
          >
            <LabelList dataKey="name" content={ChartLabel} />
          </Pie>
        </PieChart>
      )}
    </ErrorBoundary>
  )
}
