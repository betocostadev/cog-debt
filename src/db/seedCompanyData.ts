import type { departments, ICompanyDepartment } from '#/types/company'
import { db } from './db'

export async function seedCompanyTableData(departmentsObj: typeof departments) {
  try {
    const count = await db.company_departments.count()

    if (count === 0) {
      console.log('Company table empty, seeding data...')

      // As db version 2, add numberOfEmployees when seeding data
      const users = await db.users.toArray()

      if (users.length < 1) {
        console.error('Failed to seed company data, no users found.')
        return false
      }

      const companyRecords = Object.entries(departmentsObj).map(
        ([key, value]) => {
          const employeeCount = users.filter(
            (user) => user.company.department === value.title,
          ).length

          return {
            departmentKey: key,
            title: value.title,
            description: value.description,
            functions: value.functions,
            numberOfEmployees: employeeCount,
          }
        },
      )

      await db.company_departments.bulkAdd(
        companyRecords as unknown as ICompanyDepartment[],
      )
      console.log('Company data seeded to DB.')
    } else {
      return true
    }
  } catch (error) {
    console.log('Error seeding company table: ', error)
  }
}
