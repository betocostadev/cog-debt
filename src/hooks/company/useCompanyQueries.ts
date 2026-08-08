import type { QueryFunctionContext } from '@tanstack/react-query'
import type {
  ICompanyDepartmentsQueryParams,
  ICompanyDepartmentsResponse,
} from '#/types/queries'
import { companyService } from '#/services/companyService'
import type { ICompanyDepartment } from '#/types/company'

export const useCompanyDepartmentsQueryFn = async ({
  queryKey,
}: QueryFunctionContext): Promise<ICompanyDepartmentsResponse> => {
  const [, params] = queryKey as ['company', ICompanyDepartmentsQueryParams]
  const departments = companyService.getCompanyDepartments(params)

  return departments
}

export const useGetDepartmentByIdQueryFn = async (
  id: number,
): Promise<ICompanyDepartment | undefined> => {
  const company = companyService.getById(id)
  return company
}
