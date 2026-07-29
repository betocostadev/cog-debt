import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/users/$userId/edit')({
  component: EditUserPage,
})

function EditUserPage() {
  const { userId } = Route.useParams()
  return (
    <div>
      <p>Hello "/dashboard/users/$userId/edit"!</p>
      <p>Edit user id: {userId}</p>
    </div>
  )
}
