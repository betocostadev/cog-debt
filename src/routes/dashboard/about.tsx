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
  return <div>Hello "/dashboard/about"!</div>
}
