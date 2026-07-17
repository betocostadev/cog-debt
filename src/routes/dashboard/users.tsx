import { BaseButton } from '#/components/atoms/Buttons/BaseButton'
import { useGetUsers } from '#/hooks/users/useUsers'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/dashboard/users')({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Employees' },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const [skip, setSkip] = useState(0)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const limit = 10

  const { data, isLoading, error } = useGetUsers({
    params: { limit, skip, sortBy: 'firstName', order: 'asc' },
  })

  console.log('[All users query]')
  console.log('[isLoading]: ', isLoading)
  console.log('[error]: ', error)
  console.log('[data]: ')
  console.log(data)

  const handleNext = () => {
    if (page === pages) return
    setPage(page + 1)
    setSkip(skip + limit)
  }

  const handlePrev = () => {
    if (page === 1) return
    setPage(page - 1)
    setSkip(skip - limit)
  }

  useEffect(() => {
    if (data?.total) {
      setPages(Math.floor(data.total / limit))
    }
  }, [pages, isLoading])

  return (
    <div className="flex content-evenly gap-4">
      <BaseButton label="Prev" loading={false} onClick={handlePrev} />
      {data && (
        <div>
          <p>
            Page: {page} / {pages}
          </p>
        </div>
      )}

      <BaseButton label="Next" loading={isLoading} onClick={handleNext} />
    </div>
  )
}
