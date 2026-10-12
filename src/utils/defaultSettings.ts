import type { IAppSettings } from '#/types/settings'
import { DEFAULT_LANGUAGE, DEFAULT_THEME, SETTINGS_KEY } from './constants'

export const defaultSettings: IAppSettings = {
  key: SETTINGS_KEY,
  language: DEFAULT_LANGUAGE,
  theme: DEFAULT_THEME,
  starColaboratorId: null,
}
