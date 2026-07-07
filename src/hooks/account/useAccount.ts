import type { IAuthUser, TCredentials } from '#/types/account'
import type { BaseResult } from '#/types/queries'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useLoginMutationFn } from './useAccountMutations'
import { accountQueryKeys } from './useAccountQueryKeys'
import { useAuth } from '#/contexts/authContext'
import { useCallback, useMemo } from 'react'
import { useAuthUserQueryFn } from './useAccountQueries'

export interface UseAccountOptions {
  /**
   * Whether to automatically load auth user data when the hook is initialized
   * @default true
   */
  autoload?: boolean
  /**
   * Refetch interval (Tanstack query defaults)
   * @default undefined
   */
  refetchInterval?: number
}

interface UseAuthUserResult extends BaseResult {
  authUser: IAuthUser
}

export const useLogin = () => {
  const queryClient = useQueryClient()
  const { setAuthUser } = useAuth()

  const mutation = useMutation({
    mutationFn: (credentials: TCredentials) => useLoginMutationFn(credentials),
    onSuccess: async (authUserData) => {
      setAuthUser(authUserData)
      queryClient.invalidateQueries({ queryKey: accountQueryKeys.authUser() })
      console.log(`Login mutation, auth User received: `, authUserData)
    },
    onError: (error) => {
      console.log('Login failed: ', error)
    },
  })

  return {
    login: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error as Error | undefined,
    reset: mutation.reset,
  }
}

export const useGetAuthUser = (
  options: UseAccountOptions = {},
): UseAuthUserResult => {
  const { autoload, refetchInterval } = options
  const { authUser } = useAuth()

  const queryKey = useMemo(() => accountQueryKeys.authUser(), [])

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKey,
    queryFn: useAuthUserQueryFn,
    enabled: autoload && !!authUser,
    refetchInterval: refetchInterval,
    refetchOnReconnect: true,
    placeholderData: (previousData) => previousData,
  })

  const refresh = useCallback(async () => {
    await refetch()
  }, [refetch])

  const authUserError = useMemo<Error | undefined>(() => {
    if (!error) return undefined
    return error
  }, [error])

  return {
    authUser: data,
    isLoading: isLoading,
    error: authUserError,
    refresh,
  }
}
