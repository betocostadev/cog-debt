import { vi } from 'vitest'

export const companyMocks = {
  useCompanyDepartmentsQueryFn: vi
    .fn()
    .mockResolvedValue({ total: 0, departments: [] }),
  useGetDepartmentByIdQueryFn: vi.fn().mockResolvedValue({}),
}
