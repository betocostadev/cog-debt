import { Card } from '#/components/atoms/Card/Card'
import { ErrorBoundary } from '#/components/molecules/ErrorBoundary'
import { UserForm } from '#/components/organisms/Users/UserForm'
import { UserViewEditHeader } from '#/components/organisms/Users/UserViewEditHeader'
import { useGetUser, useUpdateUser } from '#/hooks/users/useUsers'
import type { TUserDataInput } from '#/types/users'
import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'

export const Route = createFileRoute('/dashboard/users/$userId/edit')({
  component: EditUserPage,
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Edit Colaborator' },
    ],
  }),
})

function EditUserPage() {
  const { userId } = Route.useParams()
  const { data, isLoading, error } = useGetUser({
    options: {},
    id: Number(userId),
  })
  const { update, isPending, isError, error: mutationError } = useUpdateUser()

  const handleUpdateUser = async (updatedData: TUserDataInput) => {
    if (updatedData.id) {
      await update({
        id: updatedData.id,
        payload: updatedData,
      })
    }
    if (isError) {
      console.error(mutationError)
      toast.error(mutationError?.message)
    }
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
          isLoading={isLoading || isPending}
          hasData={!!data}
          userId={userId}
          userFullname={
            data?.firstName ? `${data.firstName} ${data.lastName}` : 'User'
          }
        />
        <Card outerClass="mt-2">
          <UserForm
            isEditing={true}
            isLoading={isLoading || isPending}
            userId={userId}
            userData={data}
            onSubmit={handleUpdateUser}
          />
        </Card>
      </div>
    </ErrorBoundary>
  )
}
