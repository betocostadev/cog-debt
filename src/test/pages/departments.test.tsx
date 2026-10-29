// @vitest-environment jsdom

import { getAuthContextValue } from '#/contexts/authContext'
import { useAuthUserQueryFn } from '#/hooks/account/useAccountQueries'
import {
  useCompanyDepartmentsQueryFn,
  useGetDepartmentByIdQueryFn,
} from '#/hooks/company/useCompanyQueries'
import {
  useDummyUsersQueryFn,
  useUsersByStatusQueryFn,
  useUsersQueryFn,
} from '#/hooks/users/useUsersQueries'
import type { IAuthUser } from '#/types/account'
import type { IUser } from '#/types/users'
import { dummyUsers, mockUsersByStatusRes } from '#/utils/dummyUsers.mock'
import { mockedDepartments } from '#/utils/departments.mock'
import store from '#/utils/store'
import { transformDummyUsers } from '#/utils/transformUsers'
import { act } from '@testing-library/react'
import { fireEvent, screen } from '@testing-library/dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderWithFileRoutes } from '../file-route-utils'

vi.mock('#/hooks/account/useAccountQueries')
vi.mock('#/hooks/company/useCompanyQueries')
vi.mock('#/hooks/users/useUsersQueries')

const mockedUsers = transformDummyUsers(dummyUsers)
const mockUser = {
  ...mockedUsers![0],
  gender: 'female',
  accessToken: 'mock-jwt-token',
  refreshToken: 'mock-refresh-token',
}
const mockAuthContext = {
  authUser: mockUser as unknown as IAuthUser,
  isAdmin: true,
  setAuthUser: vi.fn(),
}

describe('Departments routes', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    getAuthContextValue().setAuthUser(mockUser as unknown as IAuthUser)
    store.jwt = null

    vi.mocked(useAuthUserQueryFn).mockResolvedValue(
      mockUser as unknown as IAuthUser,
    )
    vi.mocked(useCompanyDepartmentsQueryFn).mockResolvedValue({
      total: mockedDepartments.length,
      departments: mockedDepartments,
    })
    vi.mocked(useGetDepartmentByIdQueryFn).mockImplementation(
      async (departmentId) =>
        mockedDepartments.find((department) => department.id === departmentId),
    )
    vi.mocked(useDummyUsersQueryFn).mockResolvedValue({
      total: dummyUsers.length,
      skip: 0,
      limit: 10,
      users: dummyUsers,
    })
    vi.mocked(useUsersQueryFn).mockResolvedValue({
      total: mockedUsers!.length,
      users: mockedUsers as IUser[],
    })
    vi.mocked(useUsersByStatusQueryFn).mockResolvedValue(mockUsersByStatusRes)
  })

  afterEach(() => {
    getAuthContextValue().setAuthUser(null)
    store.jwt = null
  })

  it('allows auth users to access the Departments', async () => {
    await act(async () => {
      await renderWithFileRoutes(undefined, {
        initialLocation: '/dashboard/departments',
        routerContext: { auth: mockAuthContext },
      })
    })

    const pageTitle = await screen.findByTestId('Departments-title')
    const departmentsGrid = await screen.findByTestId('departments-grid')
    const engineeringCard = await screen.findByTestId('department-card-12')

    expect(pageTitle.textContent).toBe('Departments')
    expect(departmentsGrid).toBeDefined()
    expect(engineeringCard.textContent).toContain('Engineering')
    expect(engineeringCard.textContent).toContain('Department roles: 9')
    expect(screen.getByTestId('department-card-13').textContent).toContain(
      'Support',
    )
  })

  it('navigates to a department details page when its card is clicked', async () => {
    let router: Awaited<ReturnType<typeof renderWithFileRoutes>>['router']
    await act(async () => {
      const rendered = await renderWithFileRoutes(undefined, {
        initialLocation: '/dashboard/departments',
        routerContext: { auth: mockAuthContext },
      })
      router = rendered.router
    })

    const engineeringCard = await screen.findByTestId('department-card-12')
    await act(async () => {
      fireEvent.click(engineeringCard)
    })

    const departmentTitle = await screen.findByTestId('department-title')
    const workforceCaption = await screen.findByText('Department workforce')

    expect(router!.state.location.pathname).toBe('/dashboard/departments/12')
    expect(useGetDepartmentByIdQueryFn).toHaveBeenCalledWith(12)
    expect(departmentTitle.textContent).toBe('Engineering')
    expect(screen.getByText('Department of Engineering')).toBeDefined()
    expect(
      screen.getByText('Some of our team at this department:'),
    ).toBeDefined()
    expect(workforceCaption).toBeDefined()
    expect(screen.getByTestId('department-back-button')).toBeDefined()
    expect(await screen.findByText('Emily Johnson')).toBeDefined()
  })
})
