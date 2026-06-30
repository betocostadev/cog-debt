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
  console.log(data)

  if (isLoading) {
    return (
      <div className="bg-gray-800 p-4 h-full">
        <p className="text-2xl text-white mb-4">Loading data...</p>
      </div>
    )
  }

  if (error) {
    return <RouteError error={error} />
  }

  return (
    <div className="bg-gray-800 p-4 h-full">
      <p className="text-3xl font-bold text-white mb-2">
        Test Axios fetching Dummy JSON
      </p>
      {data && (
        <p className="text-2xl text-white mb-4">
          Dummy JSON API status:{' '}
          <span
            className={`${data.status === 200 ? 'text-green-500' : 'text-red-500'}`}
          >
            {data.status}
          </span>
        </p>
      )}
      <Link to="/" className="text-xl text-white cursor-pointer underline">
        Back to Home
      </Link>
    </div>
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
