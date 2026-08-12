import { ErrorBoundary } from '#/components/molecules/ErrorBoundary'
import { StarUserCard } from '#/components/organisms/Dashboard/StarUser/StarUserCard'
import { UserByDepartmentChart } from '#/components/organisms/Dashboard/UserByDepartmentChart/UserByDepartmentChart'
import { UserStatusChart } from '#/components/organisms/Dashboard/UserStatusChart/UserStatusChart'

import { VideoFrame } from '#/components/organisms/VideoFrame'
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
        <div className="sm:w-full lg:w-4/5 items-center mx-auto pt-10">
          <h3 className="text-lg sm:mt-6 font-bold">Cog Debt on the media</h3>

          <VideoFrame
            title="Check it out about our recent studies done with Stanford about AI
            productivity."
            subtitle="TLDR: The results will shock you. Not only the benefits are very
            small, in many ways they can DECREASE developer productivity!"
            source="https://www.youtube.com/embed/tbDDYKRFjhk?si=RqVplwHJjnq3HNVF"
            videoTitle="Does AI Actually Boost Developer Productivity"
          />

          <div className="mt-12">
            <VideoFrame
              title="Cognitive Debt and burnout? The aspect that companies don't want
              you to know."
              subtitle="TLDR: Software Developers, from Juniors to Seniors are start to
              notice that the more they use AI for coding, the worst is their
              understanding of the code base."
              source="https://www.youtube.com/embed/Tk0hIOAwf6M?si=7mROThsYEpUBJVhV"
              videoTitle="AI Cognitive Debt"
            />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}
