import { Card } from '#/components/atoms/Card/Card'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
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

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-white/10 bg-background/90 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center">
          <h1 className="text-xl font-semibold tracking-tight">Cog Debt</h1>
        </div>
      </header>

      <main className="px-6 py-8">
        <div className="mx-auto max-w-4xl">
          <Card>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              Welcome to Cog Debt
            </h2>

            <Link
              to="/dashboard"
              className="mt-6 inline-flex text-white underline"
            >
              Dashboard
            </Link>

            <Link to="/test" className="mt-6 inline-flex text-white underline">
              Dummy API test
            </Link>
          </Card>
        </div>
      </main>
    </div>
  )
}
