import { Card } from '#/components/atoms/Card/Card'
import { checkAPI } from '#/services/apiTest'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/test')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dummyData'],
    queryFn: () => checkAPI(),
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
    <Card>
      <p className="text-3xl font-bold mb-2">Test Axios fetching Dummy JSON</p>
      {data && (
        <p className="text-2xl mb-4">
          Dummy JSON API status:{' '}
          <span
            className={`${data.status === 'ok' ? 'text-green-500' : 'text-red-500'}`}
          >
            {data.status}
          </span>
        </p>
      )}

      <p className="inline-flex w-fit rounded-full bg-primary/15 px-3 py-1 text-sm font-medium text-primary">
        Layout test
      </p>

      <p className="inline-flex w-fit rounded-full bg-secondary/15 px-3 py-1 text-sm font-medium">
        Badge
      </p>

      <h1 className="text-4xl font-semibold tracking-tight">Cognitive Debt</h1>

      <p className="max-w-2xl text-lg text-muted">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>

      <div className="flex flex-wrap gap-3 pt-2">
        <button className="rounded-lg bg-primary px-4 py-2 font-medium text-white">
          Primary action
        </button>
        <button className="rounded-lg bg-secondary px-4 py-2 font-medium text-slate-900">
          Secondary action
        </button>
      </div>
      <Link
        to="/"
        className="text-xl text-white cursor-pointer underline line-"
      >
        Back to Cognitive Debt
      </Link>
    </Card>
  )
}

function RouteError({ error }: { error: Error }) {
  return (
    <div className="bg-gray-800 p-4 h-full">
      <p className="text-3xl font-bold text-red-500 mb-2">Error</p>
      <p className="text-white">{error.message}</p>
      <Link to="/" className="text-xl text-white cursor-pointer underline">
        Back to Home
      </Link>
    </div>
  )
}
