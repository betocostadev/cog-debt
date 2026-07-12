import { Header } from '#/components/organisms/MainLayout/Header'
import { SideMenu } from '#/components/organisms/MainLayout/SideMenu'
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
  beforeLoad: ({ context, location }) => {
    if (!context.auth.authUser) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
})

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="flex">
        <SideMenu />

        {/* <main className="flex-1 p-6"> */}
        <main className="ml-64 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
