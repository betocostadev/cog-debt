import { Card } from '#/components/shared/Card'
import { useLogin } from '#/hooks/account/useAccount'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({ component: LoginPage })

function LoginPage() {
  const { login, isPending, isError } = useLogin()

  const loginTest = async () => {
    await login({
      username: 'emilys',
      password: 'emilyspass',
    })
    console.log(isError)
    console.log(isPending)
  }

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

            <p className="mt-4 max-w-2xl text-lg text-muted">
              Please, log in below to access your account
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                className="rounded-lg bg-primary px-4 py-2 font-medium text-white"
                onClick={loginTest}
              >
                Login
              </button>
            </div>

            <Link to="/test" className="mt-6 inline-flex text-white underline">
              Check Dummy API Health
            </Link>
          </Card>
        </div>
      </main>
    </div>
  )
}
