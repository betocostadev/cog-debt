import { AppDiagSvg } from '#/components/atoms/AppDiagSvg'
import { Card } from '#/components/atoms/Card/Card'
import { ExternalLink } from '#/components/atoms/ExternalLink'
import { Logo } from '#/components/atoms/Icons/Logo'
import { PageTitle } from '#/components/atoms/PageTitle/PageTitle'
import { ToTopButton } from '#/components/molecules/Buttons/ToTopButton'
import { ErrorBoundary } from '#/components/molecules/ErrorBoundary'
import { VideoFrame } from '#/components/organisms/VideoFrame'
import { aboutVideos } from '#/utils/videoSources'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/about')({
  component: RouteComponent,
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'About' },
    ],
  }),
})

function RouteComponent() {
  return (
    <ErrorBoundary>
      <div className="flex items-center mb-4">
        <Logo size={64} />
        <PageTitle title='The Cognitive Debt "Company"' />
      </div>
      <Card outerClass="min-h-xl mb-6 font-light">
        <p>
          Cognitive Debt is an <em>Open Source project</em> based on a fictional
          company. It was created as a mentorship project provided by{' '}
          <ExternalLink link="https://www.aubay.pt/en" title="Aubay Portugal" />{' '}
          to help me{' '}
          <ExternalLink
            link="https://github.com/betocostadev/betocostadev"
            title="(Roberto Costa)"
          />
          recover my skills in development after a long and extensive project
          using too much AI and without any idea back then, generating a
          personal "Cognitive Debt" by forgetting lots of programming
          techniques, coding, and even losing track of the actual codebase with
          many other developers.
        </p>
        <p>
          The over usage of AI with Claude, Copilot and Devin proved that a
          cognitive debt was created on every developer participating on the
          project, thus, creating a need to study and create new projects
          without the use of AI.
        </p>
        <p>
          Developer Burnout is being studyed by Psychologists and Neurologists
          showing that it increases pressure for delivery. While the Developer
          works like using a Slot Machine. We are always trying to give the best
          prompt to the AI, then we review the code, and we discover that is not
          good yet. Then we repeat the process always hopping for a better
          output. This repeating process, leads to a lack of enjoyment and
          extreme stress levels.
        </p>
        <p>
          More information about this below, covered in some of the many videos
          about this topic.
        </p>
        <p>
          For this project, the AI usage was kept to a minimum, only to ask some
          questions and help solve problems after a long time debugging and not
          founding the solution easily after searching for it.
        </p>
        <p>
          Mentorship was kindly provided by{' '}
          <ExternalLink
            link="https://github.com/flaviodamaiajr"
            title="Flávio da Maia Jr"
          />
          who followed my development closely during the entire project to
          understand and give me advice on my decisions. And to give me tips
          about many things such as using libraries like Dexie.js to handle
          offline storage with IndexedDB.
        </p>
        <p>
          The source code of the project can be found{' '}
          <ExternalLink
            link="https://github.com/betocostadev/cog-debt"
            title="here"
          />
        </p>
      </Card>
      <div className="w-full">
        <h3 className="text-lg font-bold my-4">How Cognitive Debt Works?</h3>
        <p>
          Cognitive Debt uses{' '}
          <ExternalLink
            link="https://dummyjson.com/docs/users#users-limit_skip"
            title="DummyJson"
          />
          service for a simulation of an "Authentication method". Then it
          fetches the first 50 Users using Axios, and finally it starts using
          Dexie.js.
        </p>
        <p>
          After this process Departments and Users are feed into the Browser
          Database (IndexedDB) and the app works fully offline.
        </p>
        <p className="my-4 font-bold">Possible actions:</p>
        <ul className="list-disc pl-6">
          <li className="list-item">
            Navigate to Dashboard, users, departments, profile, etc.
          </li>
          <li className="list-item">
            View the table of users, view a single user, edit user, add, and
            delete users
          </li>
          <li className="list-item">
            View Departments page with each department
          </li>
          <li className="list-item">
            View Department page with department information and a small list of
            employees in it
          </li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold text-lg my-8">
          Here is an overall sketch of the architecture
        </h3>
        <div className="w-full">
          <AppDiagSvg />
        </div>
      </div>
      <div className="border border-slate-400 mt-6 pl-4">
        <ul>
          <li>
            <details className="text-bold text-white">
              <summary className="text-lg my-1 cursor-pointer">
                Tech Stack
              </summary>
              <section className="font-thin">
                For anyone interested, the tack stack of the project is as
                follows:
                <ul className="list-disc pl-8 font-light">
                  <li>TypeScript 6.0</li>
                  <li>Vite 8.0</li>
                  <li>Vitest 4.1</li>
                  <li className="list-item">React 19.2 with TanStack Start</li>
                  <li>Tailwind</li>
                  <li>TanStack Query</li>
                  <li>TanStack Router</li>
                  <li>Axios (Fetches initial data from Dummy Json)</li>
                  <li>Lucide React (Icons)</li>
                  <li>Dexie.js</li>
                  <li>React Hook Form (with Zod)</li>
                  <li>Recharts</li>
                  <li>Sonner</li>
                </ul>
              </section>
            </details>
          </li>
        </ul>
      </div>

      <h3 className="text-xl text-bold mt-8 italic">
        Problems with too much AI usage covered by many people on the internet
      </h3>
      <div className="mb-10 text-ellipsis">
        {aboutVideos.map((vid) => (
          <VideoFrame
            key={vid.id}
            title={vid.title}
            subtitle={vid.subtitle}
            source={vid.source}
            videoTitle={vid.videoTitle}
          />
        ))}
      </div>
      <div className="flex justify-center pb-4">
        <ToTopButton />
      </div>
    </ErrorBoundary>
  )
}
