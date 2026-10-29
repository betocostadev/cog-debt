// @vitest-environment jsdom

import { getAuthContextValue } from '#/contexts/authContext'
import { useAuthUserQueryFn } from '#/hooks/account/useAccountQueries'
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
import { screen } from '@testing-library/dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderWithFileRoutes } from '../file-route-utils'
import { useCompanyDepartmentsQueryFn } from '#/hooks/company/useCompanyQueries'

vi.mock('#/hooks/account/useAccountQueries')
vi.mock('#/hooks/users/useUsersQueries')
vi.mock('#/hooks/company/useCompanyQueries')

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

describe('Users route', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    getAuthContextValue().setAuthUser(mockUser as unknown as IAuthUser)
    store.jwt = null

    vi.mocked(useAuthUserQueryFn).mockResolvedValue(
      mockUser as unknown as IAuthUser,
    )
    vi.mocked(useDummyUsersQueryFn).mockResolvedValue({
      total: dummyUsers.length,
      skip: 0,
      limit: 10,
      users: dummyUsers,
    })
    vi.mocked(useUsersQueryFn).mockResolvedValue({
      total: 20,
      users: mockedUsers as IUser[],
    })
    vi.mocked(useUsersByStatusQueryFn).mockResolvedValue(mockUsersByStatusRes)
    vi.mocked(useCompanyDepartmentsQueryFn).mockResolvedValue({
      total: mockedDepartments.length,
      departments: mockedDepartments,
    })
  })

  afterEach(() => {
    getAuthContextValue().setAuthUser(null)
    store.jwt = null
  })

  it('renders the search bar and users table', async () => {
    await act(async () => {
      await renderWithFileRoutes(undefined, {
        initialLocation: '/dashboard/users',
        routerContext: { auth: mockAuthContext },
      })
    })

    const pageTitle = await screen.findByTestId('Colaborators-title')
    const tableHeader = await screen.findByTestId('users-table-header')
    const searchInput = await screen.findByTestId('users-search-input')
    const table = await screen.findByTestId('users-table')
    const userName = await screen.findByText('Emily Johnson')

    expect(pageTitle.textContent).toBe('Colaborators')
    expect(tableHeader).toBeDefined()
    expect(searchInput.getAttribute('placeholder')).toBe(
      'Search by name, department, or city',
    )
    expect(table.tagName).toBe('TABLE')
    expect(userName).toBeDefined()
    expect(screen.getByText('Department')).toBeDefined()
    expect(useUsersQueryFn).toHaveBeenCalled()
  })

  it('renders pagination controls for the user list', async () => {
    await act(async () => {
      await renderWithFileRoutes(undefined, {
        initialLocation: '/dashboard/users',
        routerContext: { auth: mockAuthContext },
      })
    })

    const pagination = await screen.findByTestId('table-pagination')
    const currentPage = await screen.findByTestId('pagination-current-page')
    const firstPageButton = screen.getByTestId('pagination-first-page')
    const previousPageButton = screen.getByTestId('pagination-previous-page')
    const nextPageButton = screen.getByTestId('pagination-next-page')
    const lastPageButton = screen.getByTestId('pagination-last-page')

    expect(pagination).toBeDefined()
    expect(currentPage.textContent).toBe('Page 1 of 2')
    expect(firstPageButton.hasAttribute('disabled')).toBe(true)
    expect(previousPageButton.hasAttribute('disabled')).toBe(true)
    expect(nextPageButton.hasAttribute('disabled')).toBe(false)
    expect(lastPageButton.hasAttribute('disabled')).toBe(false)
  })
})
