import type { AuthContextValue } from '#/contexts/authContext'
import { QueryClient } from '@tanstack/react-query'

export function getContext(auth?: Partial<AuthContextValue>) {
  const queryClient = new QueryClient()

  const defaultAuth: AuthContextValue = {
    authUser: null,
    setAuthUser: () => undefined,
  }

  return {
    queryClient,
    auth: {
      ...defaultAuth,
      ...auth,
    },
  }
}
export default function TanstackQueryProvider() {}
