import { PageTitle } from '#/components/atoms/PageTitle/PageTitle'
import { ErrorBoundary } from '#/components/molecules/ErrorBoundary'
import { AppSettings } from '#/components/organisms/Admin/AppSettings'
import { CompanyManagement } from '#/components/organisms/Admin/CompanyManagement'
import { useGetSettings } from '#/hooks/settings/useSettings'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { toast } from 'sonner'

export const Route = createFileRoute('/admin/')({
  component: Admin,
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Dashboard' },
    ],
  }),
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAdmin) {
      throw redirect({
        to: '/dashboard',
        search: {
          redirect: location.href,
        },
        viewTransition: true,
      })
    } else {
      redirect({ to: location.href })
    }
  },
})

function Admin() {
  const {
    settings,
    isLoading: isLoadingSettings,
    error: settingsError,
  } = useGetSettings({ autoload: true })

  if (isLoadingSettings) {
    return (
      <>
        <PageTitle title="Admin" data-testid="admin-loading-title" />
        <section
          data-testid="admin-section"
          className="sm:w-full lg:w-4/5 items-center mx-auto pt-2 px-2"
        >
          <h3
            data-testid="adming-heading"
            className="text-lg sm:mt-6 mt-4 font-bold"
          >
            Application settings
          </h3>

          <div className="pt-2">Loading...</div>
        </section>
      </>
    )
  }

  if (settingsError) {
    console.error(settingsError)
    toast.message(settingsError.message)

    return (
      <ErrorBoundary>
        <PageTitle title="Admin" data-testid="admin-error-title" />
        <div>
          <p>Error when adding new user</p>
          {settingsError.message && <pre>Error: {settingsError.message}</pre>}
        </div>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <>
        <PageTitle title="Admin" data-testid="admin-error-title" />
        {settings && <AppSettings settings={settings} />}
        <div className="mt-4 border-b-2 mx-4 border-secondary" />
        <CompanyManagement />
      </>
    </ErrorBoundary>
  )
}
