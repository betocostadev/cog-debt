import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/notfound')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="bg-gray-800 p-4 h-full">
      <p className="text-3xl font-bold text-white mb-2">Page not found</p>
    </div>
  )
}
