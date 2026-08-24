import { NotFoundAuth } from '#/components/molecules/NotFound/NotFoundAuth'
import { Header } from '#/components/organisms/MainLayout/Header'
import { SideMenu } from '#/components/organisms/MainLayout/SideMenu'
import { useIsMobile } from '#/hooks/useIsMobile'
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
    } else {
      redirect({ to: location.href })
    }
  },
  notFoundComponent: () => <NotFoundAuth />,
})

function DashboardLayout() {
  const isMobile = useIsMobile()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="flex">
        {!isMobile && <SideMenu />}

        <main className="mx-auto w-full max-w-7xl py-4 p-2 [view-transition-name:main-content]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
