import type { LabelProps, BarShapeProps } from 'recharts'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  Label,
  Tooltip,
} from 'recharts'
import { UserByDepartmentSkeleton } from './UserByDepartmentChartSkeleton'
import { useGetCompanyDepartments } from '#/hooks/company/useCompany'
import { ErrorBoundary } from '#/components/molecules/ErrorBoundary'
import { useMemo } from 'react'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'

interface ChartTarget {
  activeCoordinate: { x: number; y: number }
  activeDataKey: string | undefined
  activeIndex: string
  activeLabel: string
  activeTooltipIndex: string
  isTooltipActive: boolean
}

const colors = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  'red',
  'pink',
  'white',
]

// Adjusted path to point horizontally to the right
const getPath = (x: number, y: number, width: number, height: number) => {
  return `M${x},${y} C${x},${y + height / 3} ${x + width / 3},${y + height / 2} ${x + width},${y + height / 2} C${x + width / 3},${y + height / 2} ${x},${y + (2 * height) / 3} ${x},${y + height} Z`
}

const TriangleBar = (props: BarShapeProps) => {
  const { x, y, width, height, index } = props
  const color = colors[index % colors.length]

  return (
    <path
      strokeWidth={props.isActive ? 5 : 0}
      d={getPath(Number(x), Number(y), Number(width), Number(height))}
      stroke={color}
      fill={color}
      style={{
        transition: 'stroke-width 0.3s ease-out',
      }}
    />
  )
}

const ColorLabel = (props: LabelProps) => {
  const fill = colors[(props.index ?? 0) % colors.length]
  return <Label {...props} fill={fill} />
}

export function UserByDepartmentChart() {
  const { data, isLoading, error } = useGetCompanyDepartments()
  const navigate = useNavigate()

  const chartData = useMemo(() => {
    if (!data?.departments) return []
    return data.departments.map((dept) => ({
      name: dept.title,
      employees: dept.numberOfEmployees,
      departmentKey: dept.departmentKey,
      id: dept.id,
    }))
  }, [data?.departments])

  const handleDeptClick = (e: ChartTarget) => {
    if (!e.activeLabel) return
    const dept = chartData.find((dt) => dt.name === e.activeLabel)
    if (dept) {
      navigate({
        to: '/dashboard/departments/$departmentId',
        params: { departmentId: String(dept.id) },
        viewTransition: { types: ['slide-left'] },
      })
    }
  }

  if (isLoading) {
    return <UserByDepartmentSkeleton />
  }

  if (error) {
    console.error(error)
    toast.error(error.message)
    return (
      <ErrorBoundary>
        <div>
          <p>Error when loading departments data</p>
          {error.message && <pre>Error: {error.message}</pre>}
        </div>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <div
        className="flex flex-col w-full p-2 md:p-4 rounded-xl border border-white/10 bg-surface shadow-lg gap-4"
        style={{ maxWidth: '700px' }}
      >
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-foreground">
            Employees by Department
          </h3>
          <p className="text-sm text-muted-foreground">
            Distribution of active team members across company units
          </p>
        </div>
        {chartData.length > 0 && (
          <>
            <BarChart
              layout="vertical" // 1. Switches the chart orientation to horizontal bars
              style={{
                width: '100%',
                maxWidth: '700px',
                maxHeight: '100vh',
                aspectRatio: 1,
              }}
              data={chartData}
              onClick={(e) => handleDeptClick(e as unknown as ChartTarget)}
              margin={{
                top: 2,
                right: 24,
                left: 28, // Expanded left margin to fit department names safely
                bottom: -10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip
                cursor={{ fillOpacity: 0.5 }}
                labelStyle={{ color: '#111827', fontWeight: 'bold' }}
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#e5e7eb',
                  borderRadius: '0.5rem',
                  color: '#374151',
                }}
                formatter={(value, name) => {
                  const formattedName =
                    typeof name === 'string'
                      ? name.charAt(0).toUpperCase() + name.slice(1)
                      : name
                  return [value, formattedName]
                }}
              />

              {/* 2. XAxis becomes the numerical axis for values */}
              <XAxis type="number" />

              {/* 3. YAxis becomes the category axis displaying department names */}
              <YAxis dataKey="name" type="category" width={90} />

              <Bar
                dataKey="employees"
                fill="#2f2d4f"
                shape={TriangleBar}
                activeBar
              >
                {/* 4. Position labels to the right side of the horizontal bars */}
                <LabelList content={ColorLabel} position="right" />
              </Bar>
            </BarChart>

            {data?.departments && (
              <p className="text-sm text-muted-foreground pt-4 text-center">
                Cog Debt Work force:{' '}
                {data.departments.reduce(
                  (acc, cur) => acc + cur.numberOfEmployees,
                  0,
                )}
              </p>
            )}
          </>
        )}
      </div>
    </ErrorBoundary>
  )
}
