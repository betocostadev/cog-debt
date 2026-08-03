import { Card } from '#/components/atoms/Card/Card'
import { BackButton } from '#/components/molecules/Buttons/BackButton'
import { UserForm } from '#/components/organisms/Users/UserForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/users/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="w-full">
      <BackButton />
      <Card outerClass="mt-2">
        <UserForm isEditing={true} isLoading={false} />
      </Card>
    </div>
  )
}
