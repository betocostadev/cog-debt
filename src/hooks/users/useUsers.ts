import type {
  BaseResult,
  DummyUsersQueryParams,
  DummyUsersResponse,
  UsersQueryParams,
  UsersResponse,
} from '#/types/queries'

import { useCallback, useMemo } from 'react'
import { usersQueryKeys } from './useUsersQueryKeys'
import {
  // keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import {
  useDummyUsersQueryFn,
  useUserQueryFn,
  useUsersQueryFn,
} from './useUsersQueries'
import {
  ONE_HOUR,
  TEN_MINUTES,
  THIRDY_MINUTES,
  TWO_HOURS,
} from '#/utils/constants'
import type { IUser, TUserDataInput } from '#/types/users'
import { useNavigate } from '@tanstack/react-router'
import {
  useAddUserMutationFn,
  useUpdateUserMutationFn,
} from './useUserMutations'
import { toast } from 'sonner'
import { NotFoundError } from '#/types/errors'

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
    // placeholderData: keepPreviousData,
    staleTime: TEN_MINUTES,
    gcTime: TWO_HOURS,
  })

  const refresh = useCallback(async () => {
    await refetch()
  }, [refetch])

  // TODO: Map users errors
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
    // placeholderData: (previousData) => previousData,
    staleTime: THIRDY_MINUTES,
    gcTime: ONE_HOUR,
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

// Update user
export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string | number
      payload: TUserDataInput
    }) => useUpdateUserMutationFn({ id, payload }),
    onSuccess: (user) => {
      if (user) {
        queryClient.invalidateQueries({
          queryKey: usersQueryKeys.detail(Number(user.id)),
        })
        queryClient.invalidateQueries({
          predicate: (query) => {
            const queryKey = query.queryKey
            return (
              queryKey.length === 2 &&
              queryKey[0] === 'users' &&
              typeof queryKey[1] === 'object'
            )
          },
        })
        toast.success(`User ${user.firstName} ${user.lastName} updated`)
        navigate({
          to: '/dashboard/users/$userId',
          params: { userId: String(user.id!) },
        })
      }
    },
    onError: (error) => {
      // TODO: Map users errors class
      if (error instanceof NotFoundError) {
        toast.error('User not found.')
      } else {
        toast.error(error.message)
      }
    },
  })

  return {
    update: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error as Error | undefined,
    reset: mutation.reset,
  }
}

export const useAddUser = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: (payload: Omit<TUserDataInput, 'id'>) =>
      useAddUserMutationFn(payload),
    onSuccess: (user, variables) => {
      if (user) {
        queryClient.invalidateQueries({
          predicate: (query) => {
            const queryKey = query.queryKey
            return (
              queryKey.length === 2 &&
              queryKey[0] === 'users' &&
              typeof queryKey[1] === 'object'
            )
          },
        })

        toast.success(`${variables.firstName} ${variables.lastName} added`)
        navigate({
          to: '/dashboard/users/$userId',
          params: { userId: String(user) },
        })
      }
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return {
    add: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error as Error | undefined,
    reset: mutation.reset,
  }
}

// TODO: Delete user
