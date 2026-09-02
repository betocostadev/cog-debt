import { Card } from '#/components/atoms/Card/Card'
import { UserAvatarImage } from '#/components/atoms/UserAvatarImage/UserAvatarImage'
import { useGetUser } from '#/hooks/users/useUsers'
import { toast } from 'sonner'
import { StarUserCardSkeleton } from './StarUserCardSkeleton'
import { ErrorBoundary } from '#/components/molecules/ErrorBoundary'
import LazyIcon from '#/components/atoms/Icons/LazyIcon'
import { icons } from '#/utils/icons'
import { getDeptIcon } from '#/utils/departmentHelper'
import { sanitizeString } from '#/utils/strings'
import { useNavigate } from '@tanstack/react-router'
import { getUserStatusIcon } from '#/utils/userHelper'

export function StarUserCard({ employeeId }: { employeeId: number }) {
  const navigate = useNavigate()

  const { data, isLoading, error } = useGetUser({
    options: {},
    id: Number(employeeId),
  })

  const viewEmployeeOfTheQuarter = () => {
    navigate({
      to: '/dashboard/users/$userId',
      params: { userId: String(employeeId) },
      viewTransition: { types: ['slide-left'] },
    })
  }

  if (isLoading) {
    return <StarUserCardSkeleton />
  }

  if (error) {
    console.error(error)
    toast.error(error.message)
    return (
      <ErrorBoundary>
        <div className="flex flex-col self-center my-2 px-2 overflow-auto">
          <p className="text-red-400 font-light text-lg py-2">
            Error loading colaborator: {employeeId}
          </p>
          {error.message && <pre>Error: {error.message}</pre>}
        </div>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      {data && (
        <Card
          onClick={viewEmployeeOfTheQuarter}
          outerClass="mt-4 p-2 bg-slate-800 rounded-2xl mx-auto sm:mx-auto sm:max-w-lg md:max-w-lg md:mx-auto"
          innerClass="w-full flex flex-col content-center justify-center rounded-2xl border border-white/10 bg-surface p-4 shadow-2xl shadow-black/20 cursor-pointer"
          testId="star-user-container"
        >
          <div className="flex">
            <LazyIcon
              icon={icons.SquareStar}
              size={24}
              iconColor="palegoldenrod"
            />
            <p className="sm:text-md mb-4 md:text-lg pl-2">
              Meet one of our Star Colaborators
            </p>
          </div>
          <div className="flex self-start truncate">
            <UserAvatarImage src={data.image} alt={data.firstName} size="lg" />
            <div className="flex flex-col gap-2 pl-4 self-center">
              <h3 className="text-md md:text-lg font-bold truncate">
                {data.firstName} {data.lastName}
              </h3>
              <p>{data.email}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 self-start mt-6 md:mt-2 md:self-center">
            <div className="flex gap-4 mt-2 items-center">
              <p className="flex gap-2 items-center">
                <LazyIcon icon={icons.Info} size={16} ariaLabel="User status" />
                <span className="sr-only">Status</span>
                {data.status}
                <LazyIcon
                  icon={getUserStatusIcon(data.status).icon}
                  iconColor={getUserStatusIcon(data.status).color}
                  size={22}
                />
              </p>
              <LazyIcon
                icon={getDeptIcon(sanitizeString(data.company.department)).icon}
                iconColor={
                  getDeptIcon(sanitizeString(data.company.department)).color
                }
                size={22}
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
