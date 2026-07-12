import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/departments')({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Departments' },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/departments"!</div>
}
