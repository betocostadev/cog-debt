import { Card } from '#/components/atoms/Card/Card'
import { ErrorBoundary } from '#/components/molecules/ErrorBoundary'
import { UserForm } from '#/components/organisms/Users/UserForm'
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
        <Card outerClass="mt-2">
          <UserForm
            isEditing={true}
            isLoading={isLoading}
            userId={userId}
            userData={data}
          />
        </Card>
      </div>
    </ErrorBoundary>
  )
}
