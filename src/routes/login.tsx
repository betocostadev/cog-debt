import { Card } from '#/components/atoms/Card/Card'
import { createFileRoute, Link } from '@tanstack/react-router'
import { LoginForm } from '#/components/organisms/Login/LoginForm'

export const Route = createFileRoute('/login')({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Cog Debt - Login' },
    ],
  }),
  component: LoginPage,
})

function LoginPage() {
  return (
    <div
      data-testid="login-page-container"
      className="min-h-screen bg-background text-foreground"
    >
      <header className="border-b border-white/10 bg-background/90 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center">
          <h1 className="text-xl font-semibold tracking-tight">Cog Debt</h1>
        </div>
      </header>

      <main className="flex items-center px-4 py-6 sm:m-0">
        <div className="mx-auto max-w-4xl">
          <Card innerClass="flex max-w-6xl flex-col gap-4 p-4 md:p-6 rounded-2xl border border-white/10 bg-surface shadow-2xl shadow-black/30">
            <h2
              data-testid="login-title"
              className="mt-4 text-2xl md:text-4xl font-semibold tracking-tight"
            >
              Welcome to Cog Debt
            </h2>

            <p
              data-testid="login-subtitle"
              className="mt-4 max-w-2xl text-md md:text-lg text-muted"
            >
              Please, log in below to access your account
            </p>

            <LoginForm />

            <Link
              data-testid="help-link"
              to="/help"
              viewTransition={{ types: ['slide-left'] }}
              className="self-end mt-6 pb-2 inline-flex text-white underline"
            >
              Help
            </Link>
          </Card>
        </div>
      </main>
    </div>
  )
}
