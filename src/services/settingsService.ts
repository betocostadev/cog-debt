import { ApiClient } from '#/api'
import { db } from '#/db/db'
import { NotFoundError, ServerError } from '#/types/errors'
import type { IAppSettings, Ttheme } from '#/types/settings'
import { DEFAULT_THEME, SETTINGS_KEY } from '#/utils/constants'

class SettingsService extends ApiClient {
  async getAppSettings(): Promise<IAppSettings> {
    try {
      const settings = await db.settings.get('App-settings')

      if (!settings) {
        throw new NotFoundError(`Unable to fetch Application settings.`)
      }

      return settings
    } catch (error) {
      throw new ServerError(
        error instanceof Error
          ? error.message
          : 'Unknown database error ocurred.',
      )
    }
  }

  async updateAppTheme(
    theme = DEFAULT_THEME,
  ): Promise<IAppSettings | undefined> {
    try {
      const settings = await db.settings.get(SETTINGS_KEY)

      await db.settings.update(SETTINGS_KEY, { theme: theme as Ttheme })

      return settings
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundError(`Unable to fetch Application settings.`)
      }

      throw new ServerError(
        error instanceof Error
          ? error.message
          : 'Unknown database error ocurred.',
      )
    }
  }

  async updateStarColaboratorId(
    id: number | null,
  ): Promise<IAppSettings | undefined> {
    try {
      const settings = await db.settings.get(SETTINGS_KEY)

      await db.settings.update(SETTINGS_KEY, { starColaboratorId: id })

      return settings
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundError(`Unable to fetch Application settings.`)
      }

      throw new ServerError(
        error instanceof Error
          ? error.message
          : 'Unknown database error ocurred.',
      )
    }
  }
}

export const settingsService = new SettingsService()
