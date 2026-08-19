import { Badge } from '#/components/atoms/Badge/Badge'
import { Card } from '#/components/atoms/Card/Card'

import { healthCheckService } from '#/services/apiHealthCheck'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/help')({
  component: Help,
})

function Help() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dummyData'],
    queryFn: () => healthCheckService.checkApiHealth(),
    gcTime: 10000,
    staleTime: 1000 * 60,
  })

  if (isLoading) {
    return (
      <div className="p-4 h-full">
        <p className="text-2xl mb-4">Loading data...</p>
      </div>
    )
  }

  if (error) {
    return <RouteError error={error} />
  }

  return (
    <Card innerClass="flex flex-col gap-2 rounded-2xl border border-white/10 bg-surface shadow-2xl shadow-black/30">
      <h1 className="text-2xl md:text-4xl font-semibold tracking-tight [view-transition-name:main-content]">
        Cognitive Debt
      </h1>

      <p>
        Cognitive Debt is a "fake" company website. It uses Dummy JSON service
        for login.
      </p>
      <p>
        You can get user credentials by using any of the provided Dummy JSON
        users here:
      </p>
      <a
        href="https://dummyjson.com/users"
        rel="noreferrer"
        target="_blank"
        className="text-blue-400 font-light cursor-pointer underline"
      >
        Dummy JSON users
      </a>

      <p className="text-lg font-bold">TLDR:</p>
      <p>Fine, use the credentials below:</p>
      <p>User: emilys</p>
      <p>Pass: emilyspass</p>

      <Link
        to="/"
        className="text-white cursor-pointer underline"
        viewTransition
      >
        Go to Login
      </Link>

      <p className="text-xl font-bold mt-4 mb-2">Health check Dummy JSON</p>
      {data && (
        <Badge className="text-lg md:text-xl mb-4">
          Dummy JSON API status:{' '}
          <span
            className={`mx-2 ${data.status === 'ok' ? 'text-green-500' : 'text-red-500'}`}
          >
            {data.status}
          </span>
        </Badge>
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
