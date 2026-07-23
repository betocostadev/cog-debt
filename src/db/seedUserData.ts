import type { IUser } from '#/types/users'
import { db } from './db'

export async function seedUserTableData(users: IUser[]) {
  try {
    const count = await db.users.count()

    if (count === 0) {
      console.log('Users table empty, seeding data...')

      await db.users.bulkAdd(users)
      console.log('Company data seeded to DB.')
    } else {
      return
    }
  } catch (error) {
    console.log(`Error trying to feed users into db: ${error}`)
  }
}
