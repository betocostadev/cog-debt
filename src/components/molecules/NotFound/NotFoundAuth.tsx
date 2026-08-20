import LazyIcon from '#/components/atoms/Icons/LazyIcon'
import { icons } from '#/utils/icons'
import { Link } from '@tanstack/react-router'

export function NotFoundAuth() {
  return (
    <>
      <div className="flex flex-col p-4 mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-2">404</h2>
        <div className="py-10">
          <p>Ooops...</p>
          <div className="w-full flex justify-center my-12">
            <LazyIcon icon={icons.Bug} size={64} />
          </div>
          <p>Looks like this page was not found.</p>
        </div>
      </div>
      <div className="mt-12 mx-auto text-center">
        <p className="font-light">Let's see something interesting</p>
        <Link
          to="/dashboard"
          className="text-white cursor-pointer underline"
          viewTransition
        >
          Go to Dashboard
        </Link>
      </div>
    </>
  )
}
