import { ErrorBoundary } from '#/components/molecules/ErrorBoundary'
import { useGetUsersByStatus } from '#/hooks/users/useUsers'
import { TEN_MINUTES } from '#/utils/constants'
import { userStatusIconColors } from '#/utils/userHelper'
import type { PieSectorShapeProps, LabelProps } from 'recharts'
import { PieChart, Pie, Sector, Label, LabelList, Tooltip } from 'recharts'
import { UserStatusChartSkeleton } from './UserStatusChartSkeleton'
import { useNavigate } from '@tanstack/react-router'
import type { Statuses } from '#/types/users'
import { toast } from 'sonner'

type TChartTargetPayload = {
  payload: {
    name: string
    value: number
  }
}

const colors = [
  userStatusIconColors.active, // lawngreen
  userStatusIconColors.inactive, // red
  userStatusIconColors.vacation, // cornflowerblue
  userStatusIconColors.onLeave, // palevioletred
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
    offset={15} // Distance from center
    angle={-2} // Angle the labels
  />
)

export function UserStatusChart({ isAnimationActive = true }) {
  const navigate = useNavigate()
  const { data, isLoading, error } = useGetUsersByStatus({
    options: { autoload: true, refetchInterval: TEN_MINUTES },
  })

  if (isLoading) {
    return <UserStatusChartSkeleton />
  }

  if (error) {
    console.error(error)
    toast.error(error.message)
    return (
      <ErrorBoundary>
        <div className="flex flex-col gap-2">
          <p className="text-red-400">Error fetching users by statuses</p>
          {error.message && <pre>{error.message}</pre>}
        </div>
      </ErrorBoundary>
    )
  }

  const handleStatusClick = (e: TChartTargetPayload) => {
    if (e.payload.name) {
      navigate({
        to: '/dashboard/users',
        search: { status: e.payload.name as Statuses },
        viewTransition: { types: ['slide-left'] },
      })
    }
  }

  return (
    <ErrorBoundary>
      <div
        className="flex flex-col w-full md:mx-auto p-4 rounded-xl border border-white/10 bg-surface shadow-lg gap-4"
        style={{ maxWidth: '550px' }}
      >
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-foreground">
            Employees by Status
          </h3>
          <p className="text-sm text-muted-foreground">
            Distribution of team members by status
          </p>
        </div>
        {data && (
          <PieChart
            style={{
              width: '100%',
              maxWidth: '550px',
              maxHeight: '80vh',
              aspectRatio: 1.8,
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

            <Tooltip
              labelStyle={{ color: '#111827', fontWeight: 'bold' }}
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#e5e7eb',
                borderRadius: '0.5rem',
                color: '#374151',
              }}
              formatter={(value, name) => [
                value,
                typeof name === 'string'
                  ? name.charAt(0).toUpperCase() + name.slice(1)
                  : name,
              ]}
            />
            <Pie
              data={data.usersByStatus}
              isAnimationActive={isAnimationActive}
              shape={UsersPie}
              onClick={(e) =>
                handleStatusClick(e as unknown as TChartTargetPayload)
              }
            >
              <LabelList dataKey="name" content={ChartLabel} />
            </Pie>
          </PieChart>
        )}
      </div>
    </ErrorBoundary>
  )
}
