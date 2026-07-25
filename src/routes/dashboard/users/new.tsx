import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/users/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/users/new"!</div>
}
