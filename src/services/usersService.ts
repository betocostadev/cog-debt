import { ApiClient } from '#/api'
import { db } from '#/db/db'
import { NotFoundError, ServerError } from '#/types/errors'
import type {
  DummyUsersQueryParams,
  DummyUsersResponse,
  UsersByStatusResponse,
  UsersQueryParams,
} from '#/types/queries'
import type { IUser, TUserDataInput } from '#/types/users'
import { Statuses } from '#/types/users'
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
  private isDevelopment: boolean

  constructor() {
    super()

    this.isDevelopment = import.meta.env.DEV
  }
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
    try {
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
      const users = await filteredCollection
        .offset(offset)
        .limit(limit)
        .toArray()

      console.log('isDevelopment?', this.isDevelopment)

      if (this.isDevelopment) await responseDelay(500)

      return { total, users }
    } catch (error) {
      throw new ServerError(
        error instanceof Error
          ? error.message
          : 'Unknown database error ocurred.',
      )
    }
  }

  async getUser(id: string | number): Promise<IUser | undefined> {
    try {
      const user = await db.users.get({ id })

      if (!user) {
        throw new NotFoundError(`Unable to fetch user with ID: ${id}.`)
      }

      if (this.isDevelopment) await responseDelay(500)

      return user
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error
      }

      throw new ServerError(
        error instanceof Error
          ? error.message
          : 'Unknown database error ocurred.',
      )
    }
  }

  async updateUser({
    id,
    payload,
  }: {
    id: string | number
    payload: TUserDataInput
  }): Promise<IUser | undefined> {
    try {
      const user = await this.getUser(id)
      if (!user) {
        throw new NotFoundError(`Unable to fetch user with ID: ${id}.`)
      }

      const previousDepartment = await companyService.getByTitle(
        user.company.department,
      )

      if (
        payload.department &&
        previousDepartment &&
        payload.department !== previousDepartment.title
      ) {
        const newDepartment = await companyService.getByTitle(
          payload.department,
        )
        if (newDepartment?.id) {
          await companyService.updateDepartmentEmployeeChange({
            oldDept: previousDepartment,
            newDept: newDepartment,
          })
        }
      }

      const addedFields = Object.assign(
        {
          company: {
            department: payload.department,
            jobTitle: payload.jobTitle,
          },
          address: { city: payload.city, state: payload.state },
        },
        payload,
      )
      const { city, department, ...updatedUser } = addedFields

      const updated = await db.users.update(Number(id), updatedUser)

      if (this.isDevelopment) await responseDelay(500)

      if (updated) {
        return updatedUser
      }

      return undefined
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error
      }

      throw new ServerError(
        error instanceof Error
          ? error.message
          : 'Unknown database error ocurred.',
      )
    }
  }

  async createUser(
    payload: Omit<TUserDataInput, 'id'>,
  ): Promise<number | undefined> {
    try {
      const addedFields = Object.assign(
        {
          company: {
            department: payload.department,
            jobTitle: payload.jobTitle,
          },
          address: { city: payload.city, state: payload.state },
        },
        payload,
      )

      const { city, department, ...newUser } = addedFields

      const newUserId = await db.users.add(newUser)

      await companyService.incrementDepartmentCount(newUser.company.department)

      if (this.isDevelopment) await responseDelay(500)

      if (newUserId) {
        return newUserId
      }

      return undefined
    } catch (error) {
      throw new ServerError(
        error instanceof Error
          ? error.message
          : 'Unknown database error ocurred.',
      )
    }
  }

  async deleteUser(id: number): Promise<number | undefined> {
    try {
      const user = await db.users.get(Number(id))
      if (user) {
        await companyService.decrementDepartmentCount(user.company.department)
      }

      if (!user) {
        throw new NotFoundError(`User with ID: ${id} not found.`)
      }

      const deleteCount = await db.users.where('id').equals(id).delete()

      if (deleteCount === 0)
        throw new Error(`Failed to delete user with id: ${id}`)

      if (this.isDevelopment) await responseDelay(500)

      return deleteCount
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error
      }

      throw new ServerError(
        error instanceof Error
          ? error.message
          : 'Unknown database error ocurred.',
      )
    }
  }

  async getAllUsersStatus(): Promise<UsersByStatusResponse> {
    try {
      const allUsers = await db.users.toArray()

      if (!allUsers.length) {
        throw new NotFoundError(`Unable to fetch users by status.`)
      }

      const active = allUsers.filter((user) => user.status === Statuses.ACTIVE)
      const inactive = allUsers.filter(
        (user) => user.status === Statuses.INACTIVE,
      )
      const vacation = allUsers.filter(
        (user) => user.status === Statuses.VACATION,
      )
      const onLeave = allUsers.filter(
        (user) => user.status === Statuses.ONLEAVE,
      )

      if (this.isDevelopment) await responseDelay(500)

      return {
        total: allUsers.length,
        usersByStatus: [
          { name: Statuses.ACTIVE, value: active.length },
          { name: Statuses.INACTIVE, value: inactive.length },
          { name: Statuses.VACATION, value: vacation.length },
          { name: Statuses.ONLEAVE, value: onLeave.length },
        ],
      }
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error
      }

      throw new ServerError(
        error instanceof Error
          ? error.message
          : 'Unknown database error ocurred.',
      )
    }
  }
}

export const usersService = new UsersService()
