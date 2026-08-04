import type {
  BaseResult,
  ICompanyDepartmentsQueryParams,
  ICompanyDepartmentsResponse,
} from '#/types/queries'
import { useCallback, useMemo } from 'react'
import { companyQueryKeys } from './useCompanyQueryKeys'
import { useQuery } from '@tanstack/react-query'
import { TEN_MINUTES, TWO_HOURS } from '#/utils/constants'
import { NotFoundError, ServerError } from '#/types/errors'
import { toast } from 'sonner'
import { useCompanyDepartmentsQueryFn } from './useCompanyQueries'

export interface UseCompanyDepartmentOptions {
  params?: ICompanyDepartmentsQueryParams
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

interface UseCompanyDepartmentsResult extends BaseResult {
  departments?: ICompanyDepartmentsResponse
}

export const useGetCompanyDepartments = ({
  params = {},
  autoload = true,
  refetchInterval,
}: UseCompanyDepartmentOptions = {}): UseCompanyDepartmentsResult => {
  const queryKey = useMemo(() => companyQueryKeys.list(params), [params])

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: useCompanyDepartmentsQueryFn,
    enabled: autoload,
    refetchInterval,
    refetchOnReconnect: true,
    staleTime: TEN_MINUTES,
    gcTime: TWO_HOURS,
  })

  const refresh = useCallback(async () => {
    await refetch()
  }, [refetch])

  const departmentsError = useMemo<Error | undefined>(() => {
    if (!error) return undefined
    if (error instanceof NotFoundError) {
      toast.error(error.message)
      return new NotFoundError('Company departments not found.')
    } else if (error instanceof ServerError) {
      toast.error(error.message)
      return new ServerError('Internal server error fetching departments.')
    } else {
      toast.error(error.message)
      return error
    }
  }, [error])

  return {
    departments: data,
    isLoading,
    error: departmentsError,
    refresh,
  }
}
