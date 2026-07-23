import type {
  BaseResult,
  DummyUsersQueryParams,
  DummyUsersResponse,
  UsersQueryParams,
  UsersResponse,
} from '#/types/queries'

import { useCallback, useMemo } from 'react'
import { usersQueryKeys } from './useUsersQueryKeys'
import { useQuery } from '@tanstack/react-query'
import { useDummyUsersQueryFn, useUsersQueryFn } from './useUsersQueries'
import { TEN_MINUTES } from '#/utils/constants'

interface UseFeedUsersOptions {
  params?: DummyUsersQueryParams
  /**
   * Whether to automatically load auth user data when the hook is initialized
   * @default true
   */
  autoload?: boolean
  /**
   * Whether IndexedDB has Users
   * @default false
   */
  hasUsers?: boolean
}
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

interface UseDummyUsersResult extends BaseResult {
  data?: DummyUsersResponse
}

interface UseUserResult extends BaseResult {
  data?: UsersResponse
}

// Used only at start to feed indexedDB
export const useFetchInitialUsers = ({
  params = {},
  autoload = false,
  hasUsers = false,
}: UseFeedUsersOptions = {}): UseDummyUsersResult => {
  const queryKey = useMemo(
    () => usersQueryKeys.dummyUsers(params, hasUsers),
    [params, hasUsers],
  )

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: useDummyUsersQueryFn,
    enabled: autoload || hasUsers,
    refetchOnReconnect: false,
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

/*
Below functions use Dexie
*/

export const useGetUsers = ({
  params = {},
  autoload = true,
  refetchInterval,
}: UseUsersOptions = {}): UseUserResult => {
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
