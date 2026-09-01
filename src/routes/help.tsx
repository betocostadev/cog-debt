import { Badge } from '#/components/atoms/Badge/Badge'
import { Card } from '#/components/atoms/Card/Card'
import { ExternalLink } from '#/components/atoms/ExternalLink'

import { healthCheckService } from '#/services/apiHealthCheck'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/help')({
  component: Help,
})

export function Help() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dummyData'],
    queryFn: () => healthCheckService.checkApiHealth(),
    gcTime: 10000,
    staleTime: 1000 * 60,
  })

  if (error) {
    return <RouteError error={error} />
  }

  return (
    <Card innerClass="flex flex-col gap-2 p-4 sm:p-6 m-2 rounded-2xl border border-white/10 bg-surface shadow-2xl shadow-black/30">
      <h1
        data-testid="help-page-header"
        className="text-2xl sm:text-3xl font-semibold tracking-tight [view-transition-name:main-content]"
      >
        Cognitive Debt
      </h1>

      <p data-testid="help-text">
        Cognitive Debt is a "fake" company website. It uses Dummy JSON service
        for login.
      </p>
      <p>
        You can get user credentials by using any of the provided Dummy JSON
        users here:
      </p>
      <ExternalLink
        testId="help-link-to-dummy"
        link="https://dummyjson.com/users"
        title="Dummy JSON users"
      />

      <p className="text-lg font-bold">TLDR:</p>
      <p>Fine, to login just use the credentials below</p>
      <p>
        <strong>User:</strong> emilys
      </p>
      <p>
        <strong>Pass:</strong> emilyspass
      </p>

      <Link
        data-testid="help-link-to-home"
        to="/"
        className="text-blue-400 font-light cursor-pointer underline"
        viewTransition
      >
        Go to Login
      </Link>

      <p className="text-xl mt-4 mb-2">Health check Dummy JSON</p>
      {isLoading ? (
        <p data-testid="help-loading-text">Loading...</p>
      ) : (
        data && (
          <Badge data-testid="bogus" className="text-lg md:text-xl mb-4">
            Dummy JSON API status:{' '}
            <span
              className={`mx-2 ${data.status === 'ok' ? 'text-green-500' : 'text-red-500'}`}
            >
              {data.status}
            </span>
          </Badge>
        )
      )}
    </Card>
  )
}

function RouteError({ error }: { error: Error }) {
  return (
    <div className="bg-gray-800 p-4 h-full">
      <p className="text-3xl font-bold text-red-500 mb-2">Error</p>
      <p className="text-white">{error.message}</p>
      <Link to="/" className="text-xl text-white cursor-pointer underline">
        Go to Login
      </Link>
    </div>
  )
}
