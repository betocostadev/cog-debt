import type {
  BaseResult,
  DummyUsersQueryParams,
  DummyUsersResponse,
  UsersQueryParams,
  UsersResponse,
} from '#/types/queries'

import { useCallback, useMemo } from 'react'
import { usersQueryKeys } from './useUsersQueryKeys'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import {
  useDummyUsersQueryFn,
  useUserQueryFn,
  useUsersQueryFn,
} from './useUsersQueries'
import { TEN_MINUTES, THIRDY_MINUTES, TWO_HOURS } from '#/utils/constants'
import type { IUser } from '#/types/users'

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

export interface UseUserOptions {
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

interface UseUsersResult extends BaseResult {
  data?: UsersResponse
}

interface UseUserResult extends BaseResult {
  data: IUser | undefined
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
    staleTime: TWO_HOURS,
    gcTime: Infinity,
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
  No API calls, only indexedDB
*/

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
    placeholderData: keepPreviousData,
    staleTime: TEN_MINUTES,
    gcTime: TWO_HOURS,
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

export const useGetUser = ({
  options = {},
  id,
}: {
  options: UseUserOptions
  id: number
}): UseUserResult => {
  const { autoload, refetchInterval } = options

  const queryKey = useMemo(() => usersQueryKeys.detail(id), [id])

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => useUserQueryFn(id),
    enabled: autoload && !!id,
    refetchInterval: refetchInterval,
    refetchOnReconnect: true,
    placeholderData: (previousData) => previousData,
    staleTime: THIRDY_MINUTES,
    gcTime: TWO_HOURS,
  })

  const refresh = useCallback(async () => {
    await refetch()
  }, [])

  const userError = useMemo<Error | undefined>(() => {
    if (!error) return undefined
    return error
  }, [error])

  return {
    data,
    isLoading,
    error: userError,
    refresh,
  }
}
