import { ApiClient } from '#/api'
import { db } from '#/db/db'
import type {
  DummyUsersQueryParams,
  DummyUsersResponse,
  UsersQueryParams,
} from '#/types/queries'
import type { IUser } from '#/types/users'

const USER_LIST_FIELDS = [
  'id',
  'firstName',
  'lastName',
  'email',
  'phone',
  'username',
  'birthDate',
  'image',
  'address',
  'company',
] as const

const USER_LIST_SELECT = USER_LIST_FIELDS.join(',')

// Utility for testing loading states
const responseDelayer = new Promise((res, _) => {
  setTimeout(() => {
    res(console.log('[Response is throttled in usersService]'))
  }, 1500)
})

export class UsersService extends ApiClient {
  // Uses online DummyJSON data for the first time
  // Feeds users to IndexedDB using Dexie
  // https://dummyjson.com/docs/users#users-limit_skip
  async getDummyUsers(
    params: DummyUsersQueryParams,
  ): Promise<DummyUsersResponse> {
    const { limit = 10, skip = 0, order, sortBy } = params

    return this.get<DummyUsersResponse>(
      this.buildUrl('users', {
        limit,
        skip,
        order,
        sortBy,
        select: USER_LIST_SELECT,
      }),
    )
  }

  /*
    Queries below use DB users
  */
  async getAllUsers(params: UsersQueryParams) {
    const {
      where = '',
      status = 'All',
      offset = 0,
      orderBy = 'id',
      limit = 10,
      reverse = false,
    } = params

    let dbOrderBy = orderBy

    if (orderBy === 'name') {
      dbOrderBy = 'firstName'
    } else if (orderBy === 'department') {
      dbOrderBy = 'company.department'
    } else if (orderBy === 'jobTitle') {
      dbOrderBy = 'company.jobTitle'
    } else if (orderBy === 'city') {
      dbOrderBy = 'address.city'
    }

    let collection = db.users.orderBy(dbOrderBy)
    if (reverse) {
      collection = collection.reverse()
    }

    const filteredCollection = collection.filter((user) => {
      const matchesStatus = status === 'All' || user.status === status
      const matchesSearch =
        !where ||
        user.firstName.toLowerCase().includes(where.toLowerCase()) ||
        user.lastName.toLowerCase().includes(where.toLowerCase()) ||
        user.company.department.toLowerCase().includes(where.toLowerCase()) ||
        user.address.city.toLowerCase().includes(where.toLowerCase())

      return matchesStatus && matchesSearch
    })

    const total = await filteredCollection.count()
    const users = await filteredCollection.offset(offset).limit(limit).toArray()

    await responseDelayer
    return { total, users }
  }

  async getUser(id: string | number) {
    const user = await db.users.get({ id })

    if (!user) {
      throw new Error(`Unable to fetch user with ID: ${id}`)
    }

    await responseDelayer
    return user
  }
}

export const usersService = new UsersService()
