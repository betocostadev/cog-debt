import { Header } from '#/components/organisms/MainLayout/Header'
import { SideMenu } from '#/components/organisms/MainLayout/SideMenu'
import { useFeedDb } from '#/hooks/useFeedDb'
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Dashboard' },
    ],
  }),
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
  useFeedDb()

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
