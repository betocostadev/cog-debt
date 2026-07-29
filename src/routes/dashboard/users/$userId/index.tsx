import { UserAvatarImage } from '#/components/atoms/UserAvatarImage/UserAvatarImage'
import { ErrorBoundary } from '#/components/molecules/ErrorBoundary'
import { useGetUser } from '#/hooks/users/useUsers'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/users/$userId/')({
  component: UserPage,
})

function UserPage() {
  const { userId } = Route.useParams()
  const { data, isLoading, error } = useGetUser({
    options: {},
    id: Number(userId),
  })
  console.log(data)
  console.log(isLoading)
  console.log(error)

  if (error) {
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
        {/* // TODO: Extract to user header */}
        {data && (
          <>
            {' '}
            <div className="flex">
              <UserAvatarImage
                src={data.image}
                alt={data.firstName}
                size="large"
              />
            </div>
            <p>Hello "/dashboard/users/$userId"!</p>
            <p>User id: {userId}</p>
          </>
        )}
      </div>
    </ErrorBoundary>
  )
}
