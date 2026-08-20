import { Link } from '@tanstack/react-router'

export function NotFoundGeneral() {
  return (
    <>
      <div className="flex flex-col p-4 h-full mx-auto text-center">
        <div className="py-4">
          <p>Ooops...</p>
          <h2 className="text-4xl font-bold text-white mb-2">404</h2>
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
