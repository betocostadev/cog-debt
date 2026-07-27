import { BaseButton } from '#/components/atoms/Buttons/BaseButton'
import { useGetUsers } from '#/hooks/users/useUsers'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { UsersTableContainer } from '#/components/organisms/UsersTable/UsersTableContainer'

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
  const navigate = useNavigate()
  const [offset, setOffset] = useState(0)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const limit = 10

  const { data, isLoading, error } = useGetUsers({
    params: { limit, offset, orderBy: 'firstName', reverse: false },
  })

  console.log('[All users query]')
  console.log('[isLoading]: ', isLoading)
  console.log('[error]: ', error)
  console.log('[data]: ', data)

  const handleNext = () => {
    if (page === pages) return
    setPage(page + 1)
    setOffset(offset + limit)
  }

  const handlePrev = () => {
    if (page === 1) return
    setPage(page - 1)
    setOffset(offset - limit)
  }

  const editUser = () => {
    navigate({ to: '/dashboard/users/$userId', params: { userId: '1' } })
  }

  const goToUser = () => {
    navigate({ to: '/dashboard/users/$userId/edit', params: { userId: '2' } })
  }

  useEffect(() => {
    if (data?.total) {
      setPages(Math.floor(data.total / limit))
    }
  }, [pages, isLoading])

  // TODO: For some buttons, consider to throttle the function
  return (
    <div>
      <div>
        <p>Route testing</p>
        <BaseButton label="Edit User" loading={isLoading} onClick={editUser} />
        <BaseButton label="Check User" loading={isLoading} onClick={goToUser} />
      </div>

      {/* TODO: Consider a compound component table and a hook instead of props */}
      <UsersTableContainer />
    </div>
  )
}
