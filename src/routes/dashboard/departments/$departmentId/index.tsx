import { Card } from '#/components/atoms/Card/Card'
import LazyIcon from '#/components/atoms/Icons/LazyIcon'
import { BackButton } from '#/components/molecules/Buttons/BackButton'
import { ErrorBoundary } from '#/components/molecules/ErrorBoundary'
import { DeptUsersTable } from '#/components/organisms/Company/DeptUsersTable'
import { useGetDepartmentById } from '#/hooks/company/useCompany'
import { getDeptIcon } from '#/utils/departmentHelper'
import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'

export const Route = createFileRoute('/dashboard/departments/$departmentId/')({
  component: RouteComponent,
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Department' },
    ],
  }),
})

function RouteComponent() {
  const { departmentId } = Route.useParams()
  const { data, isLoading, error } = useGetDepartmentById({
    options: {},
    id: Number(departmentId),
  })

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
      <div className="p-2">
        <BackButton />
        {data && (
          <div className="overflow-auto mx-auto p-2">
            <div className="flex gap-4 mt-2 items-center">
              <LazyIcon
                icon={getDeptIcon(data.departmentKey).icon}
                iconColor={getDeptIcon(data.departmentKey).color}
                size={30}
              />
              <h2 className="text-2xl">{data.title}</h2>
            </div>
            <div className="my-4">
              <p className="text-xl text-slate-300">
                Department of {data.title}
              </p>
              {data.description && (
                <p className="mt-2 text-slate-400 italic">{data.description}</p>
              )}
            </div>
            <div className="w-full pt-4">
              <Card>
                <p className="font-thin">
                  Some of our team at this department:
                </p>
                <DeptUsersTable departmentTitle={data.title} />
              </Card>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  )
}
