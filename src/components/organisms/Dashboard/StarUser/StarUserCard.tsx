import { Card } from '#/components/atoms/Card/Card'
import { UserAvatarImage } from '#/components/atoms/UserAvatarImage/UserAvatarImage'
import { useGetUser } from '#/hooks/users/useUsers'
import { toast } from 'sonner'
import { StarUserCardSkeleton } from './StarUserCardSkeleton'
import { ErrorBoundary } from '#/components/molecules/ErrorBoundary'
import LazyIcon from '#/components/atoms/Icons/LazyIcon'
import { icons } from '#/utils/icons'
import { Statuses } from '#/types/users'
import { getUserStatusIcon } from '#/components/atoms/UserStatus/UserStatusRow'
import { getDeptIcon } from '#/utils/departmentHelper'

export function StarUserCard({ employeeId }: { employeeId: number }) {
  const { data, isLoading, error } = useGetUser({
    options: {},
    id: Number(employeeId),
  })

  if (isLoading) {
    return <StarUserCardSkeleton />
  }

  if (error) {
    console.error(error)
    toast.error(error.message)
    return (
      <ErrorBoundary>
        <div>
          <p>Error when loading employee of the quarter: {employeeId}</p>
          {error.message && <pre>Error: {error.message}</pre>}
        </div>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      {data && (
        <Card
          outerClass="mt-4 p-2 bg-slate-800 rounded-2xl max-w-4xl"
          innerClass="w-full flex flex-col md:flex-row content-between justify-between items-center rounded-2xl border border-white/10 bg-surface p-4 shadow-2xl shadow-black/20"
        >
          <div className="flex self-start md:self-center">
            <UserAvatarImage src={data.image} alt={data.firstName} size="xl" />
            <div className="flex flex-col gap-2 pl-4 self-center">
              <h3 className="text-lg font-bold">
                {data.firstName} {data.lastName}
              </h3>
              <p>{data.email}</p>
              <p className="flex gap-2 items-center">
                <LazyIcon icon={icons.Info} size={16} ariaLabel="User status" />
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
            </div>
          </div>
          <div className="flex flex-col gap-2 pr-2 self-start md:self-center mt-4 md:mt-0">
            <div className="flex gap-4 mt-2 items-center">
              <LazyIcon
                icon={getDeptIcon(data.company.department.toLowerCase()).icon}
                iconColor={
                  getDeptIcon(data.company.department.toLowerCase()).color
                }
                size={20}
              />
              <p>{data.company.department}</p>
            </div>
            <p>{data.company.jobTitle}</p>
          </div>
        </Card>
      )}
    </ErrorBoundary>
  )
}
