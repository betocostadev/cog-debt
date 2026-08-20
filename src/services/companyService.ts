import { ApiClient } from '#/api'
import { db } from '#/db/db'
import type { ICompanyDepartment } from '#/types/company'
import { NotFoundError, ServerError } from '#/types/errors'
import type { ICompanyDepartmentsQueryParams } from '#/types/queries'
import { responseDelay } from '#/utils/throttle'

export class CompanyService extends ApiClient {
  async getCompanyDepartments(params: ICompanyDepartmentsQueryParams) {
    try {
      const {
        where = '',
        offset = 0,
        limit = 50,
        orderBy = 'id',
        reverse = false,
      } = params

      let dbOrderBy = orderBy

      if (orderBy === 'departmentKey') {
        dbOrderBy = 'departmentKey'
      } else if (orderBy === 'title') {
        dbOrderBy = 'title'
      }

      let collection = db.company_departments.orderBy(dbOrderBy)

      if (reverse) {
        collection = collection.reverse()
      }

      const filteredCollection = collection.filter((department) => {
        const matchesSearch =
          !where || department.title.toLowerCase().includes(where.toLowerCase())

        return matchesSearch
      })

      const total = await filteredCollection.count()
      const departments = await filteredCollection
        .offset(offset)
        .limit(limit)
        .toArray()

      await responseDelay(1000)

      return {
        total,
        departments,
      }
    } catch (error) {
      throw new ServerError(
        error instanceof Error
          ? error.message
          : 'Unknown database error ocurred.',
      )
    }
  }

  async getById(id: number): Promise<ICompanyDepartment | undefined> {
    try {
      const department = await db.company_departments.get({ id })

      if (!department) {
        throw new NotFoundError(`Department with ID: ${id} not found`)
      }

      return department
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

  async getByTitle(title: string): Promise<ICompanyDepartment | undefined> {
    try {
      const department = await db.company_departments
        .where('title')
        .equals(title)
        .offset(0)
        .limit(1)
        .toArray()

      if (!department[0]) {
        throw new NotFoundError(`Department ${title} not found`)
      }

      return department[0]
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

  async updateDepartment({
    id,
    payload,
  }: {
    id: string | number
    payload: ICompanyDepartment
  }): Promise<ICompanyDepartment | undefined> {
    try {
      const updated = await db.company_departments.update(Number(id), {
        ...payload,
      })

      if (!updated) {
        throw new NotFoundError(
          `Unable to update department. Department ${id} not found.`,
        )
      }

      if (updated) {
        return { ...payload }
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

  async updateDepartmentEmployeeChange({
    oldDept,
    newDept,
  }: {
    oldDept: ICompanyDepartment
    newDept: ICompanyDepartment
  }) {
    if (!oldDept.id || !newDept.id || oldDept.id === newDept.id) {
      return undefined
    }

    const oldCurrentCount = oldDept.numberOfEmployees
    const newCurrentCount = newDept.numberOfEmployees

    const updatedOldCount = Math.max(0, oldCurrentCount - 1)
    const updatedNewCount = newCurrentCount + 1

    try {
      await db.transaction('rw', db.company_departments, async () => {
        await db.company_departments.update(oldDept.id, {
          numberOfEmployees: updatedOldCount,
        })

        await db.company_departments.update(newDept.id, {
          numberOfEmployees: updatedNewCount,
        })
      })
    } catch (error) {
      throw new ServerError(
        error instanceof Error
          ? error.message
          : 'Unknown database error ocurred.',
      )
    }
  }

  async incrementDepartmentCount(departmentTitle: string) {
    const dept = await this.getByTitle(departmentTitle)
    if (dept && dept.id) {
      try {
        const newCount = dept.numberOfEmployees + 1
        await db.company_departments.update(dept.id, {
          numberOfEmployees: newCount,
        })
      } catch (error) {
        throw new ServerError(
          error instanceof Error
            ? error.message
            : 'Unknown database error ocurred.',
        )
      }
    }
  }

  async decrementDepartmentCount(departmentTitle: string) {
    const dept = await this.getByTitle(departmentTitle)
    if (dept && dept.id) {
      try {
        const currentCount = dept.numberOfEmployees
        await db.company_departments.update(dept.id, {
          numberOfEmployees: Math.max(0, currentCount - 1),
        })
      } catch (error) {
        throw new ServerError(
          error instanceof Error
            ? error.message
            : 'Unknown database error ocurred.',
        )
      }
    }
  }
}

export const companyService = new CompanyService()
