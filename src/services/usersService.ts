import { ApiClient } from '#/api'
import { db } from '#/db/db'
import { NotFoundError } from '#/types/errors'
import type {
  DummyUsersQueryParams,
  DummyUsersResponse,
  UsersQueryParams,
} from '#/types/queries'
import type { IUser, TUserDataInput } from '#/types/users'
import { responseDelay } from '#/utils/throttle'
import { companyService } from './companyService'

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

    await responseDelay(1500)
    return { total, users }
  }

  async getUser(id: string | number): Promise<IUser | undefined> {
    const user = await db.users.get({ id })

    if (!user) {
      throw new Error(`Unable to fetch user with ID: ${id}`)
    }

    await responseDelay(1500)
    return user
  }

  async updateUser({
    id,
    payload,
  }: {
    id: string | number
    payload: TUserDataInput
  }): Promise<IUser | undefined> {
    const user = await this.getUser(id)
    if (!user) {
      throw new NotFoundError('User not found')
    }

    const previousDepartment = await companyService.getByTitle(
      user.company.department,
    )

    if (
      payload.department &&
      previousDepartment &&
      payload.department !== previousDepartment.title
    ) {
      const newDepartment = await companyService.getByTitle(payload.department)
      if (newDepartment?.id) {
        await companyService.updateDepartmentEmployeeChange({
          oldDept: previousDepartment,
          newDept: newDepartment,
        })
      }
    }

    const addedFields = Object.assign(
      {
        company: { department: payload.department, jobTitle: payload.jobTitle },
        address: { city: payload.city, state: payload.state },
      },
      payload,
    )
    const { city, department, ...updatedUser } = addedFields

    const updated = await db.users.update(Number(id), updatedUser)

    await responseDelay(1000)

    if (updated) {
      return updatedUser
    }
    return undefined
  }

  async createUser(
    payload: Omit<TUserDataInput, 'id'>,
  ): Promise<number | undefined> {
    const addedFields = Object.assign(
      {
        company: { department: payload.department, jobTitle: payload.jobTitle },
        address: { city: payload.city, state: payload.state },
      },
      payload,
    )

    const { city, department, ...newUser } = addedFields

    const newUserId = await db.users.add(newUser)

    await companyService.incrementDepartmentCount(newUser.company.department)

    await responseDelay(500)

    if (newUserId) {
      return newUserId
    }

    return undefined
  }

  async deleteUser(id: number): Promise<number | undefined> {
    const user = await db.users.get(Number(id))
    if (user) {
      await companyService.decrementDepartmentCount(user.company.department)
    }
    const deleteCount = await db.users.where('id').equals(id).delete()
    if (deleteCount === 0)
      throw new Error(`Failed to delete user with id: ${id}`)

    await responseDelay(500)

    return deleteCount
  }
}

export const usersService = new UsersService()
