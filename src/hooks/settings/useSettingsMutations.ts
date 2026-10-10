import { settingsService } from '#/services/settingsService'

export const useUpdateThemeMutationFn = async (theme: string) => {
  return await settingsService.updateAppTheme(theme)
}

export const useSetStarCollaboratorMutationFn = async (id: number | null) => {
  return await settingsService.updateStarColaboratorId(id)
}
