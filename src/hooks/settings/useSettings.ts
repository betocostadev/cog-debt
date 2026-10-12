import type { BaseResult } from '#/types/queries'
import type { IAppSettings } from '#/types/settings'
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { settingsQueryKeys } from './useSettingsQueryKeys'
import { useCallback, useMemo } from 'react'
import { useSettingsQueryFn } from './useSettingsQueries'
import { ONE_HOUR } from '#/utils/constants'
import { toast } from 'sonner'
import { NotFoundError, ServerError } from '#/types/errors'
import {
  useSetStarCollaboratorMutationFn,
  useUpdateThemeMutationFn,
} from './useSettingsMutations'

export interface UseSettingsOptions {
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

interface UseAppSettingsResult extends BaseResult {
  settings?: IAppSettings
}

export const useGetSettings = (
  options: UseSettingsOptions = {},
): UseAppSettingsResult => {
  const { autoload, refetchInterval } = options

  const queryKey = useMemo(() => settingsQueryKeys.all, [])

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKey,
    queryFn: useSettingsQueryFn,
    enabled: autoload,
    refetchInterval: refetchInterval,
    refetchOnReconnect: true,
    placeholderData: keepPreviousData,
    staleTime: ONE_HOUR,
    gcTime: ONE_HOUR * 2,
  })

  const refresh = useCallback(async () => {
    await refetch()
  }, [refetch])

  const settingsError = useMemo<Error | undefined>(() => {
    if (!error) return undefined

    toast.error(error.message)

    if (error instanceof NotFoundError || error instanceof ServerError) {
      return error
    }

    return error
  }, [error])

  return {
    settings: data,
    isLoading: isLoading,
    error: settingsError,
    refresh,
  }
}

export const useChangeTheme = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (theme: string) => useUpdateThemeMutationFn(theme),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsQueryKeys.all })
      toast.success('Theme changed')
    },
    onError: (error: any) => {
      if (!error) return undefined

      toast.error(error.message)
      return error
    },
  })

  return {
    changeTheme: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error as Error | undefined,
    reset: mutation.reset,
  }
}

export const useSetStarCollaborator = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (id: number | null) => useSetStarCollaboratorMutationFn(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: settingsQueryKeys.all,
      })
      toast.success(`Star collaborator set to ${variables}`)
    },
    onError: (error: any) => {
      if (!error) return undefined

      toast.error(error.message)
      return error
    },
  })

  return {
    setStarCollaborator: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error as Error | undefined,
    reset: mutation.reset,
  }
}
