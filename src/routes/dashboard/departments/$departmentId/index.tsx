import LazyIcon from '#/components/atoms/Icons/LazyIcon'
import { ErrorBoundary } from '#/components/molecules/ErrorBoundary'
import { useGetDepartmentById } from '#/hooks/company/useCompany'
import { getDeptIcon } from '#/utils/departmentHelper'
import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'

export const Route = createFileRoute('/dashboard/departments/$departmentId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { departmentId } = Route.useParams()
  const { data, isLoading, error } = useGetDepartmentById({
    options: {},
    id: Number(departmentId),
  })

  console.log('[Department]')
  console.log(data)

  // TODO: Create skeleton loading component
  if (isLoading) {
    return (
      <div className="flex mx-auto">
        <p className="text-lg">Loading...</p>
      </div>
    )
  }

  if (error) {
    console.error(error)
    toast.error(error.message)
    return (
      <ErrorBoundary>
        <p>Error loading department information</p>
        {error.message && <pre>{error.message}</pre>}
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      {data && (
        <div>
          <div className="flex gap-4 mt-2 items-center">
            <LazyIcon
              icon={getDeptIcon(data.departmentKey).icon}
              iconColor={getDeptIcon(data.departmentKey).color}
              size={30}
            />
            <h2 className="text-2xl">{data.title}</h2>
          </div>
        </div>
      )}
    </ErrorBoundary>
  )
}
