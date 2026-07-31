import { Card } from '#/components/atoms/Card/Card'
import { ErrorBoundary } from '#/components/molecules/ErrorBoundary'
import { UserViewEditHeader } from '#/components/organisms/Users/UserViewEditHeader'
import { useGetUser } from '#/hooks/users/useUsers'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/users/$userId/edit')({
  component: EditUserPage,
})

function EditUserPage() {
  const { userId } = Route.useParams()
  const { data, isLoading, error } = useGetUser({
    options: {},
    id: Number(userId),
  })

  console.log(`[Edit user page]`)
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
        <UserViewEditHeader
          isLoading={isLoading}
          hasData={!!data}
          userId={userId}
          userFullname={
            data?.firstName ? `${data.firstName} ${data.lastName}` : 'User'
          }
        />
        <Card
          outerClass="bg-slate-900"
          innerClass="w-full flex flex-row content-between justify-between items-center rounded-2xl border border-white/10 bg-surface p-4 shadow-2xl shadow-black/20"
        >
          <p>Edit user id: {userId}</p>
        </Card>
      </div>
    </ErrorBoundary>
  )
}
