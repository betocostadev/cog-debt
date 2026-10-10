export const settingsQueryKeys = {
  all: ['settings'],
  starCollaborator: (id: number | null) =>
    [...settingsQueryKeys.all, id] as const,
}
