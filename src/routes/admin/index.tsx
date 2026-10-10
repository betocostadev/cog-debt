import { BaseButton } from '#/components/atoms/Buttons/BaseButton'
import { PageTitle } from '#/components/atoms/PageTitle/PageTitle'
import { ErrorBoundary } from '#/components/molecules/ErrorBoundary'
import {
  useChangeTheme,
  useGetSettings,
  useSetStarCollaborator,
} from '#/hooks/settings/useSettings'
import { createFileRoute } from '@tanstack/react-router'
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
})

function Admin() {
  const {
    settings,
    isLoading: isLoadingSettings,
    error: settingsError,
  } = useGetSettings({ autoload: true })

  console.log('Admin - App settings: ')
  console.log(settings)

  const { changeTheme, isPending, isError, error } = useChangeTheme()
  const {
    setStarCollaborator,
    isPending: isPendingCollab,
    isError: isErrorCollab,
    error: errorCollab,
  } = useSetStarCollaborator()

  const setTheme = async () => {
    changeTheme('System')

    if (isError) {
      console.error(error)
      toast.error(error?.message)
    }
  }

  const resetStarCollaborator = () => {
    setStarCollaborator(null)

    if (isErrorCollab) {
      console.error(errorCollab?.message)
      toast.error(errorCollab?.message)
    }
  }

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

  if (isError || isErrorCollab) {
    if (isError) {
      console.error(error)
      toast.error(
        error || errorCollab
          ? error
            ? error.message
            : errorCollab?.message
          : '',
      )
    }

    return (
      <ErrorBoundary>
        <div className="flex flex-col self-center my-2 px-2 overflow-auto">
          {error && (
            <p className="text-red-400 font-light text-lg py-2">
              Error loading changing settings
            </p>
          )}
          {error && error.message ? (
            <pre>Error: {error.message}</pre>
          ) : settingsError && settingsError.message ? (
            <pre>Error: {settingsError.message}</pre>
          ) : null}
        </div>
      </ErrorBoundary>
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
        <section
          data-testid="admin-settings-error-section"
          className="sm:w-full lg:w-4/5 items-center mx-auto pt-2 px-2"
        >
          <h3
            data-testid="admin-settings-error-heading"
            className="text-lg sm:mt-6 mt-4 font-bold"
          >
            Application settings
          </h3>

          <div className="pt-2">
            <BaseButton
              label="Change theme"
              onClick={setTheme}
              disabled={isPending}
            />
            <BaseButton
              label="Reset star collaborator"
              onClick={resetStarCollaborator}
              disabled={isPendingCollab}
            />
          </div>
        </section>
      </>
    </ErrorBoundary>
  )
}
