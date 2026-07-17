import type { BaseResult, UsersQueryParams } from '#/types/queries'
import type { UsersResponse } from '#/types/users'
import { useCallback, useMemo } from 'react'
import { usersQueryKeys } from './useUsersQueryKeys'
import { useQuery } from '@tanstack/react-query'
import { useUsersQueryFn } from './useUsersQueries'
import { TEN_MINUTES } from '#/utils/constants'

export interface UseUsersOptions {
  params?: UsersQueryParams
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

interface UseUsersResult extends BaseResult {
  data?: UsersResponse
}

export const useGetUsers = ({
  params = {},
  autoload = true,
  refetchInterval,
}: UseUsersOptions = {}): UseUsersResult => {
  const queryKey = useMemo(() => usersQueryKeys.list(params), [params])

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: useUsersQueryFn,
    enabled: autoload,
    refetchInterval,
    refetchOnReconnect: true,
    placeholderData: (prevData) => prevData,
    staleTime: 1000 * 60 * 10,
    gcTime: TEN_MINUTES,
  })

  const refresh = useCallback(async () => {
    await refetch()
  }, [refetch])

  const usersError = useMemo<Error | undefined>(() => {
    if (!error) return undefined
    return error
  }, [error])

  return {
    data,
    isLoading,
    error: usersError,
    refresh,
  }
}
