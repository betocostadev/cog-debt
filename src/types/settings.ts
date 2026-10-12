export type Ttheme = 'system' | 'light' | 'dark'

export interface IAppSettings {
  key: string
  language: string
  theme: Ttheme
  starColaboratorId: number | null
}
