import type { AuthContextValue } from '#/contexts/authContext'
import { getAuthContextValue } from '#/contexts/authContext'
import { QueryClient } from '@tanstack/react-query'

let queryClient: QueryClient | undefined

export function getContext(auth?: Partial<AuthContextValue>) {
  if (!queryClient) {
    queryClient = new QueryClient()
  }

  return {
    queryClient,
    auth: getAuthContextValue(auth),
  }
}

export default function TanstackQueryProvider() {}
