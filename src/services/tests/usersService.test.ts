import { describe, beforeEach, it, expect, vi } from 'vitest'
import 'fake-indexeddb/auto'
import { db } from '#/db/db'
import { companyService } from '../companyService'
import { usersService } from '../usersService'
import { Statuses } from '#/types/users'
import { NotFoundError } from '#/types/errors'

// Mocked to isolate company service logic
vi.mock('../companyService', () => ({
  companyService: {
    getByTitle: vi.fn().mockResolvedValue({ title: 'Engineering' }),
    updateDepartmentEmployeeChange: vi.fn(),
    incrementDepartmentCount: vi.fn(),
    decrementDepartmentCount: vi.fn(),
  },
}))

describe('Users Service', () => {
  beforeEach(async () => {
    vi.clearAllMocks()

    await db.delete()
    await db.open()
  })

  describe('getDummyUsers', () => {
    it('should call api get with properly built query params', async () => {
      const getSpy = vi
        .spyOn(usersService as any, 'get')
        .mockResolvedValueOnce({ users: [], total: 0 })

      await usersService.getDummyUsers({
        limit: 5,
        skip: 10,
        sortBy: 'firstName',
        order: 'asc',
      })

      expect(getSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          'users?limit=5&skip=10&order=asc&sortBy=firstName',
        ),
      )
    })
  })

  describe('getAllUsers - DB queries', () => {
    it('should filter users by status and search keyword', async () => {
      await db.users.bulkAdd([
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          status: Statuses.ACTIVE,
          company: { department: 'Engineering', jobTitle: 'Web Developer' },
          address: { city: 'Maia', state: 'PT' },
        } as any,
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          status: Statuses.INACTIVE,
          company: {
            department: 'Engineering',
            jobTitle: 'Full Stacj developer',
          },
          address: { city: 'Gaia', state: 'PT' },
        } as any,
      ])

      const result = await usersService.getAllUsers({
        status: Statuses.ACTIVE,
        where: 'john',
      })

      expect(result.total).toBe(1)
      expect(result.users[0].firstName).toBe('John')
    })
  })

  describe('getUser', () => {
    it('should return a user if they exist in DB', async () => {
      await db.users.add({
        id: 1,
        firstName: 'Alice',
        status: Statuses.ACTIVE,
        company: {
          department: 'Engineering',
          jobTitle: 'Full Stacj developer',
        },
        address: { state: 'LB', city: 'Lisbon' },
      } as any)

      const user = await usersService.getUser(1)
      expect(user?.firstName).toBe('Alice')
    })

    it('should throw NotFoundError if user does not exist', async () => {
      await expect(usersService.getUser(999)).rejects.toThrow(NotFoundError)
    })
  })

  describe('createUser', () => {
    it('should add user to DB and increment department count', async () => {
      const newUserData = {
        firstName: 'Emily',
        lastName: 'Johnson',
        email: 'emily@cogdebt.com',
        status: Statuses.ACTIVE,
        company: {
          department: 'Engineering',
          jobTitle: 'Software Developer',
        },
        address: {
          state: 'PR',
          city: 'Porto',
        },
      }

      const newId = await usersService.createUser(newUserData as any)

      expect(newId).toBeDefined()
      const dbUser = await db.users.get(newId)

      expect(dbUser?.firstName).toBe('Emily')
      expect(companyService.incrementDepartmentCount).toHaveBeenCalledWith(
        'Engineering',
      )
    })
  })

  describe('deleteUser', () => {
    it('should delete user from DB and decrement department count', async () => {
      await db.users.add({
        id: 5,
        firstName: 'Charlie',
        status: Statuses.ACTIVE,
        company: { department: 'Engineering' },
        address: { city: 'SP' },
      } as any)

      const deleteCount = await usersService.deleteUser(5)

      expect(deleteCount).toBe(1)
      const userCheck = await db.users.get(5)
      expect(userCheck).toBeUndefined()
      expect(companyService.decrementDepartmentCount).toHaveBeenCalledWith(
        'Engineering',
      )
    })

    it('should throw NotFoundError if user to delete is missing', async () => {
      await expect(usersService.deleteUser(999)).rejects.toThrow(NotFoundError)
    })
  })
})
