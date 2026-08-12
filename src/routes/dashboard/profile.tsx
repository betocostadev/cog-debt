import { useGetAuthUser } from '#/hooks/account/useAccount'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/profile')({
  component: RouteComponent,
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Profile' },
    ],
  }),
})

function RouteComponent() {
  const { authUser, isLoading } = useGetAuthUser()
  if (isLoading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  return (
    <div>
      <p>{authUser?.firstName}</p>
      <p>{authUser?.lastName}</p>
      <p>{authUser?.email}</p>
    </div>
  )
}
