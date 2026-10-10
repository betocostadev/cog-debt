import { settingsService } from '#/services/settingsService'
import type { IAppSettings } from '#/types/settings'

export const useSettingsQueryFn = async (): Promise<IAppSettings> => {
  const settings = await settingsService.getAppSettings()

  return settings
}
