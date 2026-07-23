import type { departments, ICompanyDepartment } from '#/types/company'
import { db } from './db'

export async function seedCompanyTableData(departmentsObj: typeof departments) {
  try {
    const count = await db.company_departments.count()

    if (count === 0) {
      console.log('Company table empty, seeding data...')

      const companyRecords = Object.entries(departmentsObj).map(
        ([key, value]) => ({
          departmentKey: key,
          title: value.title,
          functions: value.functions,
        }),
      )

      await db.company_departments.bulkAdd(
        companyRecords as unknown as ICompanyDepartment[],
      )
      console.log('Company data seeded to DB.')
    } else {
      return
    }
  } catch (error) {
    console.log('Error seeding company table: ', error)
  }
}
