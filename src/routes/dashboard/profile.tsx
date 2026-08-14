import { Badge } from '#/components/atoms/Badge/Badge'
import { BaseButton } from '#/components/atoms/Buttons/BaseButton'
import { Card } from '#/components/atoms/Card/Card'
import { UserAvatarImage } from '#/components/atoms/UserAvatarImage/UserAvatarImage'
import { useGetAuthUser } from '#/hooks/account/useAccount'
import { useLogout } from '#/hooks/account/useLogout'
import { icons } from '#/utils/icons'
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
  const { logout } = useLogout()

  if (isLoading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    )

  return (
    <Card>
      {authUser && (
        <Card
          outerClass="bg-slate-900"
          innerClass="w-full flex flex-row content-between justify-between items-center rounded-2xl border border-white/10 bg-surface p-4 shadow-2xl shadow-black/20"
        >
          <div className="flex">
            <UserAvatarImage
              src={authUser.image}
              alt={authUser.firstName}
              size="xl"
            />
            <div className="flex flex-col gap-2 pl-2 self-center">
              <h3 className="text-lg font-bold">
                {authUser.firstName} {authUser.lastName}
                <Badge className="ml-2 items-center">{authUser.role}</Badge>
              </h3>
              <p>{authUser.email}</p>
              <p>{authUser.phone}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 pr-2">
            <p>ID: {authUser.id}</p>
            <p>{authUser.username}</p>
          </div>
        </Card>
      )}
      {authUser?.company && (
        <div>
          <section className="px-2 py-2">
            <h3 className="text-xl py-2">Cognitive debt information</h3>
            <div className="flex justify-between pb-2">
              <p className="py-2">Department: {authUser.company.department}</p>
              <p>Role: {authUser.company.title}</p>
            </div>
          </section>

          <section className="px-2">
            <h3 className="text-xl py-2">Address</h3>
            <p className="py-2">{authUser.address.address}</p>
            <p>
              City: {authUser.address.city} - {authUser.address.state} /{' '}
              {authUser.address.stateCode}
            </p>
          </section>
          <div className="flex items-end justify-end mt-2">
            <BaseButton
              variant="secondary"
              label="Logout"
              iconLeft={icons.LogOut}
              iconSize={18}
              onClick={logout}
            />
          </div>
        </div>
      )}
    </Card>
  )
}
