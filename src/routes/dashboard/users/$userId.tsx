import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/users/$userId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { userId } = Route.useParams()
  return (
    <div>
      <p>Hello "/dashboard/users/$userId"!</p>
      <p>User id: {userId}</p>
    </div>
  )
}
