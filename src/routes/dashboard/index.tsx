import { ErrorBoundary } from '#/components/molecules/ErrorBoundary'
import { StarUserCard } from '#/components/organisms/Dashboard/StarUser/StarUserCard'
import { UserByDepartmentChart } from '#/components/organisms/Dashboard/UserByDepartmentChart/UserByDepartmentChart'
import { UserStatusChart } from '#/components/organisms/Dashboard/UserStatusChart/UserStatusChart'

import { VideoFrame } from '#/components/organisms/VideoFrame'
import { dashboardVideos } from '#/utils/videoSources'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: Dashboard,
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Dashboard' },
    ],
  }),
})

function Dashboard() {
  return (
    <ErrorBoundary>
      <div className="w-full">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <div className="flex mt-4 gap-4 flex-col lg:flex-row">
          <UserByDepartmentChart />

          <div className="sm:w-full lg:w-2/4">
            <UserStatusChart />
            <StarUserCard employeeId={51} />
          </div>
        </div>
        <div className="sm:w-full lg:w-4/5 items-center mx-auto pt-6">
          <h3 className="text-lg sm:mt-6 font-bold">Cog Debt on the media</h3>

          <div className="mb-10">
            {dashboardVideos.map((vid) => (
              <VideoFrame
                key={vid.id}
                title={vid.title}
                subtitle={vid.subtitle}
                source={vid.source}
                videoTitle={vid.videoTitle}
              />
            ))}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}
