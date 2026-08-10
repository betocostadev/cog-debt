import { Card } from '#/components/atoms/Card/Card'
import LazyIcon from '#/components/atoms/Icons/LazyIcon'
import { ErrorBoundary } from '#/components/molecules/ErrorBoundary'
import { useGetCompanyDepartments } from '#/hooks/company/useCompany'
import { getDeptIcon } from '#/utils/departmentHelper'

import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

export const Route = createFileRoute('/dashboard/departments/')({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Departments' },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { data: deptsData, isLoading, error } = useGetCompanyDepartments()

  console.log('[Departments]')
  console.log('error?', error)
  console.log('loading?', isLoading)
  console.log('Data:')
  console.log(deptsData)

  const goToDepartment = (departmentId: number) => {
    navigate({
      to: '/dashboard/departments/$departmentId',
      params: { departmentId: departmentId.toString() },
    })
  }

  // TODO: Add skeleton component array for loading
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full p-4">
        {Array.from({ length: 10 }).map((_, idx) => (
          // Create component
          <Card
            key={`loading-card-dept-${idx}`}
            outerClass="bg-background text-foreground"
            innerClass="flex gap-6 items-center rounded-2xl border border-white/10 bg-surface p-5 shadow-2xl shadow-black/30 hover:shadow-slate-200 hover:shadow-sm hover:cursor-pointer"
          >
            <div className="h-8 w-full animate-pulse rounded-full bg-slate-600 my-2"></div>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    console.error(error)
    toast.error(error.message)
    return (
      <ErrorBoundary>
        <div>
          <p>Error loading company departments</p>
          {error.message && <pre>Error: {error.message}</pre>}
        </div>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full p-4">
        {deptsData?.departments &&
          deptsData.departments.map((dept) => {
            const { icon, color } = getDeptIcon(dept.departmentKey)
            return (
              <Card
                key={dept.id}
                outerClass="bg-background text-foreground"
                innerClass="flex gap-6 items-center rounded-2xl border border-white/10 bg-surface p-5 shadow-2xl shadow-black/30 hover:shadow-slate-200 hover:shadow-sm hover:cursor-pointer"
                onClick={() => goToDepartment(dept.id!)}
              >
                <LazyIcon icon={icon} iconColor={color} size={40} />
                <div className="flex flex-col gap-4">
                  <div>
                    <h4 className="text-lg">{dept.title}</h4>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-secondary font-light">
                      Department roles: {dept.functions.length}
                    </p>
                    <p className="text-secondary font-light">
                      Open positions: {Math.floor(Math.random() * 5)}
                    </p>
                    <p className="text-secondary font-light">
                      Employees: {dept.numberOfEmployees}
                    </p>
                  </div>
                </div>
              </Card>
            )
          })}
      </div>
    </ErrorBoundary>
  )
}
