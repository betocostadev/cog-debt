export const accountQueryKeys = {
  all: ['account'],
  authUser: () => [...accountQueryKeys.all, 'authUser'] as const,
}
