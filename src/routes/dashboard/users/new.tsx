import { Card } from '#/components/atoms/Card/Card'
import { BackButton } from '#/components/molecules/Buttons/BackButton'
import { ErrorBoundary } from '#/components/molecules/ErrorBoundary'
import { UserForm } from '#/components/organisms/Users/UserForm'
import { useAddUser } from '#/hooks/users/useUsers'
import type { TUserDataInput } from '#/types/users'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/users/new')({
  component: RouteComponent,
})

function RouteComponent() {
  const { add, isPending, isError, error } = useAddUser()

  const handleAddUser = async (newData: Omit<TUserDataInput, 'id'>) => {
    add(newData)
    if (isError) {
      console.log(error)
    }
  }

  if (error) {
    return (
      <ErrorBoundary>
        <div>
          <p>Error when adding new user</p>
          {error.message && <pre>Error: {error.message}</pre>}
        </div>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <div className="w-full">
        <BackButton />
        <Card outerClass="mt-2">
          <UserForm
            isEditing={false}
            isLoading={isPending}
            onSubmit={handleAddUser}
          />
        </Card>
      </div>
    </ErrorBoundary>
  )
}
