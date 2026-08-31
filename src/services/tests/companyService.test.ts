import { describe, beforeEach, it, expect, vi } from 'vitest'
import 'fake-indexeddb/auto'
import { db } from '#/db/db'
import { companyService } from '../companyService'
import { NotFoundError } from '#/types/errors'

describe('Company Service', () => {
  beforeEach(async () => {
    vi.clearAllMocks()

    await db.delete()
    await db.open()
  })

  describe('getCompanyDepartments', () => {
    it('should query and filter departments by search term', async () => {
      await db.company_departments.bulkAdd([
        {
          id: 1,
          departmentKey: 'engineering',
          title: 'Engineering',
          functions: [],
          numberOfEmployees: 5,
        },
        {
          id: 2,
          departmentKey: 'support',
          title: 'Support',
          functions: [],
          numberOfEmployees: 2,
        },
      ])

      const allDepts = await companyService.getCompanyDepartments({
        offset: 0,
        limit: 10,
      })

      expect(allDepts.total).toBe(2)
      expect(allDepts.departments.length).toBe(2)

      const result = await companyService.getCompanyDepartments({
        where: 'engin',
      })

      expect(result.total).toBe(1)
      expect(result.departments[0].title).toBe('Engineering')
    })
  })

  describe('get department by ID and by Title', () => {
    it('should return department by id', async () => {
      await db.company_departments.add({
        id: 10,
        departmentKey: 'sales',
        title: 'Sales',
        functions: [],
        numberOfEmployees: 3,
      })

      const dept = await companyService.getById(10)

      expect(dept).toBeDefined()
      expect(dept!.title).toBe('Sales')
    })

    it('should throw NotFoundError if id does not exist', async () => {
      await expect(companyService.getById(999)).rejects.toThrow(NotFoundError)
    })

    it('should return department by title', async () => {
      await db.company_departments.add({
        id: 1,
        departmentKey: 'engineering',
        title: 'Engineering',
        functions: [],
        numberOfEmployees: 4,
      })

      const dept = await companyService.getByTitle('Engineering')

      expect(dept).toBeDefined()
      expect(dept?.departmentKey).toBe('engineering')
    })

    it('should throw NotFoundError if title does not exist', async () => {
      await expect(
        companyService.getByTitle('NonexistentDept'),
      ).rejects.toThrow(NotFoundError)
    })
  })

  describe('updateDepartment', () => {
    it('should update department payload successfully', async () => {
      await db.company_departments.add({
        id: 1,
        departmentKey: 'marketing',
        title: 'Marketing',
        functions: [],
        numberOfEmployees: 1,
      })

      const updated = await companyService.updateDepartment({
        id: 1,
        payload: {
          departmentKey: 'global_marketing',
          title: 'Global Marketing',
          functions: ['Marketer'],
          numberOfEmployees: 2,
        },
      })

      expect(updated?.title).toBe('Global Marketing')
    })

    it('should throw NotFoundError if updating a non-existent department ID', async () => {
      await expect(
        companyService.updateDepartment({
          id: 999,
          payload: {
            departmentKey: 'unknown',
            title: 'Unknown',
            functions: [],
            numberOfEmployees: 0,
          },
        }),
      ).rejects.toThrow(NotFoundError)
    })
  })

  describe('Employee count increments/decrements and transitions', () => {
    it('should increment department employee count', async () => {
      await db.company_departments.add({
        id: 1,
        departmentKey: 'engineering',
        title: 'Engineering',
        functions: [],
        numberOfEmployees: 5,
      })

      await companyService.incrementDepartmentCount('Engineering')

      const updated = await db.company_departments.get(1)
      expect(updated?.numberOfEmployees).toBe(6)
    })

    it('should decrement department employee count safely without dropping below zero', async () => {
      await db.company_departments.add({
        id: 1,
        departmentKey: 'engineering',
        title: 'Engineering',
        functions: [],
        numberOfEmployees: 0,
      })

      await companyService.decrementDepartmentCount('Engineering')

      const updated = await db.company_departments.get(1)
      expect(updated?.numberOfEmployees).toBe(0)
    })

    it('should handle department employee transfer via transaction', async () => {
      await db.company_departments.bulkAdd([
        {
          id: 1,
          departmentKey: 'engineering',
          title: 'Engineering',
          functions: [],
          numberOfEmployees: 5,
        },
        {
          id: 2,
          departmentKey: 'support',
          title: 'Support',
          functions: [],
          numberOfEmployees: 2,
        },
      ])

      const oldDept = await db.company_departments.get(1)
      const newDept = await db.company_departments.get(2)

      await companyService.updateDepartmentEmployeeChange({
        oldDept: oldDept!,
        newDept: newDept!,
      })

      const updatedOld = await db.company_departments.get(1)
      const updatedNew = await db.company_departments.get(2)

      expect(updatedOld?.numberOfEmployees).toBe(4)
      expect(updatedNew?.numberOfEmployees).toBe(3)
    })
  })
})
