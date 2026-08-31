import { describe, beforeEach, afterEach, it, expect } from 'vitest'
import 'fake-indexeddb/auto'
import { db } from '../db'
import { transformDummyUsers } from '#/utils/transformUsers'
import { dummyUsers } from '#/utils/dummyUsers.mock'
import { seedUserTableData } from '../seedUserData'
import type { IUser } from '#/types/users'
import { seedCompanyTableData } from '../seedCompanyData'
import { departments } from '#/types/company'

describe('Dexie Database', () => {
  beforeEach(async () => {
    await db.delete()
    await db.open()
  })

  afterEach(() => {
    db.close()
  })

  describe('DB init and Schema', () => {
    it('should initialize tables correctly', () => {
      expect(db.isOpen()).toBe(true)
      expect(db.tables.map((t) => t.name)).toContain('users')
      expect(db.tables.map((t) => t.name)).toContain('company_departments')
    })
  })

  describe('DB Seeding', () => {
    it('should seed users table data when empty', async () => {
      const mockUsers = transformDummyUsers(dummyUsers)

      await seedUserTableData(mockUsers as IUser[])

      const count = await db.users.count()
      expect(count).toBe(2)

      const userOne = await db.users.get(1)
      expect(userOne?.firstName).toBe('Emily')
    })

    it('should seed company data and count number of employees correctly', async () => {
      const mockUsers = transformDummyUsers(dummyUsers)

      await db.users.bulkAdd(mockUsers as IUser[])

      await seedCompanyTableData(departments)

      const deptCount = await db.company_departments.count()
      expect(deptCount).toBeGreaterThan(0)

      const engineeringDept = await db.company_departments
        .where('departmentKey')
        .equals('engineering')
        .first()

      if (engineeringDept) {
        expect(engineeringDept.numberOfEmployees).toBe(1)
      }

      const mktDept = await db.company_departments
        .where('departmentKey')
        .equals('marketing')
        .first()

      if (mktDept) {
        expect(mktDept.numberOfEmployees).toBe(1)
      }
    })
  })

  describe('Migration - Ver upgrade', () => {
    it('should upgrade data correctly through version steps', async () => {
      db.close()

      expect(db.verno).toBe(3)
    })
  })
})
