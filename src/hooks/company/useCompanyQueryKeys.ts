import type { ICompanyDepartmentsQueryParams } from '#/types/queries'

export const companyQueryKeys = {
  all: ['company'] as const,
  list: (params: ICompanyDepartmentsQueryParams) =>
    [...companyQueryKeys.all, params] as const,
  department: (id: number) => [...companyQueryKeys.all, id] as const,
}
