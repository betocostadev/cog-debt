import { ErrorBoundary } from '#/components/molecules/ErrorBoundary'
import { UserStatusChart } from '#/components/organisms/Dashboard/UserStatusChart'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: Dashboard,
})

function Dashboard() {
  return (
    <ErrorBoundary>
      <div className="w-full">
        <h2 className="text-xl">Dashboard</h2>
        <div className="flex mt-2 gap-2 flex-col lg:flex-row">
          <div className="sm:w-full lg:w-2/4">
            <p className="py-2 text-md lg:text-lg">
              Colaborators by department
            </p>
            <div className="h-72 w-72 border-2 border-slate-500"></div>
          </div>
          <div className="sm:w-full lg:w-2/4">
            <p className="py-2 text-md lg:text-lg">Colaborators by status</p>
            <UserStatusChart />
          </div>
        </div>
        <div className="my-4">
          <p>Employee of the Quarter</p>
          <p>Gandalf</p>
        </div>
      </div>
    </ErrorBoundary>
  )
}
