import { createFileRoute } from '@tanstack/react-router'
import { UsersTable } from '#/components/organisms/UsersTable/UsersTable'
import { Card } from '#/components/atoms/Card/Card'

export const Route = createFileRoute('/dashboard/users/')({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Colaborators' },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Card>
      <UsersTable />
    </Card>
  )
}
