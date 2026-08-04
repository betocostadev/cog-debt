import { ApiClient } from '#/api'
import { db } from '#/db/db'
import type { ICompanyDepartmentsQueryParams } from '#/types/queries'
import { responseDelay } from '#/utils/throttle'

export class CompanyService extends ApiClient {
  async getCompanyDepartments(params: ICompanyDepartmentsQueryParams) {
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
  }
}

export const companyService = new CompanyService()
