import type { IAppSettings } from '#/types/settings'
import { db } from './db'

export async function seedSettingsTableData(appSettings: IAppSettings) {
  try {
    const count = await db.settings.count()

    if (count === 0) {
      console.log('Settings table empty, seeding defaults...')
      await db.settings.put(appSettings)
      console.log('Default settings seeded to DB.')
    }
  } catch (error) {
    console.error('Error seeding settings table: ', error)
  }
}
