// import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '#/db/db'
import { toast } from 'sonner'
import { useFetchInitialUsers } from './users/useUsers'
import { useEffect, useState } from 'react'
import { transformDummyUsers } from '#/utils/transformUsers'
import { seedUserTableData } from '#/db/seedUserData'

export const useFeedDb = () => {
  // Not good here as It is live: https://dexie.org/docs/dexie-react-hooks/useLiveQuery()
  // const dbUsers = useLiveQuery(() => db.users.toArray())

  const [hasUsers, setHasUsers] = useState(false)
  let status = false

  const fetchDbUsers = async () => {
    const dbUsers = await db.users.toArray()
    if (dbUsers.length < 1) setHasUsers(true)
  }

  const { data, isLoading, error } = useFetchInitialUsers({
    params: { limit: 50, skip: 0 },
    hasUsers: hasUsers,
  })

  const addUsersToDb = async () => {
    if (data) {
      const newUsers = transformDummyUsers(data.users)
      await seedUserTableData(newUsers!)
      status = true
    }
  }

  if (error) {
    toast.success(`Failed to fetch users from Dummy JSON.`)
  }

  useEffect(() => {
    fetchDbUsers()
    if (hasUsers && data) {
      addUsersToDb()
    }
  }, [isLoading, hasUsers])

  return { status }
}
