import { departments } from '#/types/company'
import type { IUser } from '#/types/users'
import { db } from './db'
import { seedCompanyTableData } from './seedCompanyData'

export async function seedUserTableData(users: IUser[]) {
  try {
    const count = await db.users.count()

    if (count === 0) {
      console.log('Users table empty, seeding data...')

      await db.users.bulkAdd(users)
      // After migration to db version 2, check company table for employee count
      // Since users are just fetched after logging, company data might be missing employee count
      const company1 = await db.company_departments.get({ id: 1 })
      if (!company1) {
        seedCompanyTableData(departments)
      }

      console.log('Users data seeded to DB.')
    } else {
      return
    }
  } catch (error) {
    console.log(`Error trying to feed users into db: ${error}`)
  }
}
