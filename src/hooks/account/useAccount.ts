import type { IAuthUser, TCredentials } from '#/types/account'
import type { BaseResult } from '#/types/queries'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useLoginMutationFn } from './useAccountMutations'
import { accountQueryKeys } from './useAccountQueryKeys'
import { useAuth } from '#/contexts/authContext'
import { useCallback, useMemo } from 'react'
import { useAuthUserQueryFn } from './useAccountQueries'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

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
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: (credentials: TCredentials) => useLoginMutationFn(credentials),
    onSuccess: async (authUserData) => {
      setAuthUser(authUserData)

      queryClient.invalidateQueries({ queryKey: accountQueryKeys.authUser() })
      toast.success(`Welcome back, ${authUserData.firstName}!`)
      navigate({ to: '/dashboard' })
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        'Invalid credentials, please try again.'

      console.log('Login mutation failed: ', error)
      toast.error(errorMessage)
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
