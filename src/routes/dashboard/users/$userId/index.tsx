import { Card } from '#/components/atoms/Card/Card'
import LazyIcon from '#/components/atoms/Icons/LazyIcon'
import { UserAvatarImage } from '#/components/atoms/UserAvatarImage/UserAvatarImage'
import { getUserStatusIcon } from '#/components/atoms/UserStatus/UserStatusRow'
import { ErrorBoundary } from '#/components/molecules/ErrorBoundary'
import { UserViewEditHeader } from '#/components/organisms/Users/UserViewEditHeader'
import { UserViewProfileSkeleton } from '#/components/organisms/Users/UserViewProfileSkeleton'
import { useGetUser } from '#/hooks/users/useUsers'
import { Statuses } from '#/types/users'
import { icons } from '#/utils/icons'
import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'

export const Route = createFileRoute('/dashboard/users/$userId/')({
  component: UserPage,
})

function UserPage() {
  const { userId } = Route.useParams()
  const { data, isLoading, error } = useGetUser({
    options: {},
    id: Number(userId),
  })

  const getAdmissionDate = (adDate: Date) => {
    const date = new Date(adDate)
    return date.toLocaleDateString()
  }

  const getFormattedSalary = (salary: number | string) => {
    const amount = typeof salary === 'string' ? parseFloat(salary) : salary
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount)
  }

  if (error) {
    console.error(error)
    toast.error(error.message)
    return (
      <ErrorBoundary>
        <div>
          <p>Error when loading user with id: {userId}</p>
          {error.message && <pre>Error: {error.message}</pre>}
        </div>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <div className="w-full">
        <UserViewEditHeader
          isLoading={isLoading}
          hasData={!!data}
          userId={userId}
          userFullname={
            data?.firstName ? `${data.firstName} ${data.lastName}` : 'User'
          }
        />
        {isLoading && <UserViewProfileSkeleton />}
        {!isLoading && data && (
          <Card>
            {/* User main card */}
            <Card
              outerClass="bg-slate-900"
              innerClass="w-full flex flex-row content-between justify-between items-center rounded-2xl border border-white/10 bg-surface p-4 shadow-2xl shadow-black/20"
            >
              <div className="flex">
                <UserAvatarImage
                  src={data.image}
                  alt={data.firstName}
                  size="xl"
                />
                <div className="flex flex-col gap-2 pl-2 self-center">
                  <h3 className="text-lg font-bold">
                    {data.firstName} {data.lastName}
                  </h3>
                  <p>{data.email}</p>
                  <p>{data.phone}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 pr-2">
                <p className="flex gap-2 items-center">
                  <LazyIcon
                    icon={icons.Info}
                    size={16}
                    ariaLabel="User status"
                  />
                  <span className="sr-only">Status</span>
                  {data.status}
                  <LazyIcon
                    icon={getUserStatusIcon(data.status)}
                    iconColor={
                      data.status === Statuses.ACTIVE
                        ? 'lawngreen'
                        : data.status === Statuses.INACTIVE
                          ? 'red'
                          : data.status === Statuses.ONLEAVE
                            ? 'palevioletred'
                            : 'cornflowerblue'
                    }
                    size={22}
                  />
                </p>
                <p>ID: {data.id}</p>
                <p>{data.username}</p>
              </div>
            </Card>

            {/* Company Data */}
            <section className="px-2 py-2">
              <h3 className="text-xl py-2">Cognitive debt information</h3>
              <div className="flex justify-between pb-2">
                <p>Department: {data.company.department}</p>
                <p>Role: {data.company.jobTitle}</p>
              </div>
              <div className="flex justify-between pb-2">
                <p>Admission Date: {getAdmissionDate(data.admissionDate)}</p>
                <p>Salary: {getFormattedSalary(data.salary)}</p>
              </div>
            </section>

            {/* Address */}
            <section className="px-2">
              <h3 className="text-xl py-2">User address</h3>
              <p>
                City: {data.address.city} / {data.address.state}
              </p>
            </section>
          </Card>
        )}
      </div>
    </ErrorBoundary>
  )
}
