import { createFileRoute } from '@tanstack/react-router'
import { UsersTable } from '#/components/organisms/UsersTable/UsersTable'
import { Card } from '#/components/atoms/Card/Card'
import { ErrorBoundary } from '#/components/molecules/ErrorBoundary'
import { userSearchSchema } from '#/types/users'

export const Route = createFileRoute('/dashboard/users/')({
  validateSearch: userSearchSchema,
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Colaborators' },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const searchParams = Route.useSearch()

  return (
    <ErrorBoundary>
      <h2 className="text-xl font-bold mb-2">Colaborators</h2>
      <Card>
        <UsersTable initialParams={searchParams} />
      </Card>
    </ErrorBoundary>
  )
}
