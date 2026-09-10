/* eslint-disable @typescript-eslint/consistent-type-imports */
// @vitest-environment jsdom

import { getAuthContextValue } from '#/contexts/authContext'
import { isValidElement, cloneElement } from 'react'
import store from '#/utils/store'
import { useAuthUserQueryFn } from '#/hooks/account/useAccountQueries'
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { transformDummyUsers } from '#/utils/transformUsers'
import { dummyUsers, mockUsersByStatusRes } from '#/utils/dummyUsers.mock'
import type { IAuthUser } from '#/types/account'
import { renderWithFileRoutes } from '../file-route-utils'
import { fireEvent, screen } from '@testing-library/dom'
import {
  useUserQueryFn,
  useUsersQueryFn,
  useUsersByStatusQueryFn,
  useDummyUsersQueryFn,
} from '#/hooks/users/useUsersQueries'
import type { IUser } from '#/types/users'
import { act } from '@testing-library/react'
import { useCompanyDepartmentsQueryFn } from '#/hooks/company/useCompanyQueries'
import { mockedDepartments } from '#/utils/departments.mock'

vi.mock('#/hooks/account/useAccountQueries', () => ({
  useAuthUserQueryFn: vi.fn(),
}))

vi.mock('#/hooks/users/useUsersQueries', () => ({
  useDummyUsersQueryFn: vi
    .fn()
    .mockResolvedValue({ total: 0, skip: 0, limit: 10, users: [] }),
  useUsersQueryFn: vi.fn().mockResolvedValue({ total: 0, users: [] }),
  useUserQueryFn: vi.fn().mockResolvedValue({}),
  useUsersByStatusQueryFn: vi
    .fn()
    .mockResolvedValue({ total: 0, usersByStatus: [] }),
}))

vi.mock('#/hooks/company/useCompanyQueries', () => ({
  useCompanyDepartmentsQueryFn: vi
    .fn()
    .mockResolvedValue({ total: 0, departments: [] }),
  useGetDepartmentByIdQueryFn: vi.fn().mockResolvedValue({}),
}))

// Mock Recharts ResponsiveContainer at top level so charts render immediately in JSDOM
vi.mock('recharts', async (importOriginal) => {
  const original = await importOriginal<typeof import('recharts')>()
  return {
    ...original,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div style={{ width: 500, height: 500 }}>
        {isValidElement(children)
          ? cloneElement(children as React.ReactElement<any>, {
              width: 500,
              height: 500,
            })
          : children}
      </div>
    ),
  }
})

const mockedUsers = transformDummyUsers(dummyUsers)
const mockUser = {
  ...mockedUsers![0],
  gender: 'female',
  accessToken: 'mock-jwt-token',
  refreshToken: 'mock-refresh-token',
}

describe('Dashboard route', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    Object.defineProperty(window, 'scrollTo', {
      value: vi.fn(),
      writable: true,
    })

    getAuthContextValue().setAuthUser(mockUser as unknown as IAuthUser)

    store.jwt = mockUser.accessToken

    vi.mocked(useAuthUserQueryFn).mockResolvedValue(
      mockUser as unknown as IAuthUser,
    )

    vi.mocked(useDummyUsersQueryFn).mockResolvedValue({
      total: 2,
      skip: 0,
      limit: 10,
      users: dummyUsers,
    })

    vi.mocked(useUsersQueryFn).mockResolvedValue({
      total: mockedUsers!.length,
      users: mockedUsers as IUser[],
    })

    vi.mocked(useUserQueryFn).mockResolvedValue(mockedUsers![1])

    vi.mocked(useUsersByStatusQueryFn).mockResolvedValue(mockUsersByStatusRes)

    // departments

    vi.mocked(useCompanyDepartmentsQueryFn).mockResolvedValue({
      total: mockedDepartments.length,
      departments: mockedDepartments,
    })
  })

  afterEach(() => {
    getAuthContextValue().setAuthUser(null)
    store.jwt = null
  })

  it('allows auth users to access the Dashboard', async () => {
    await act(async () => {
      await renderWithFileRoutes(undefined, {
        initialLocation: '/dashboard',
      })
    })

    const pageTitle = await screen.findByTestId('dashboard-title')

    expect(pageTitle).toBeDefined()
    expect(pageTitle.textContent).toBe('Dashboard')
  })

  it('renders Side Menu and opens it', async () => {
    await act(async () => {
      await renderWithFileRoutes(undefined, {
        initialLocation: '/dashboard',
      })
    })

    const sideMenu = await screen.findByTestId('side-menu-container')
    const sideMenuToggleBtn = await screen.findByTestId('toggle-side-menu-btn')
    const sideMenuNav = await screen.findByTestId('side-menu-nav')
    const menuTextSpan = screen.getByText('Menu')

    expect(sideMenu).toBeDefined()
    expect(sideMenuToggleBtn).toBeDefined()

    expect(menuTextSpan.classList).toContain('opacity-0')
    expect(sideMenu.textContent).toBe('Menu')

    expect(sideMenuToggleBtn.tagName).toBe('BUTTON')

    expect(sideMenuNav).toBeDefined()
    const sideMenuNavChildren = sideMenuNav.children
    expect(sideMenuNavChildren).toBeTypeOf('object')

    expect(sideMenuNav.firstElementChild?.tagName).toBe('UL')

    expect(screen.queryByText('Home')).toBeNull()
    expect(screen.queryByText('Colaborators')).toBeNull()
    expect(screen.queryByText('Departments')).toBeNull()
    expect(screen.queryByText('About')).toBeNull()

    await act(async () => {
      fireEvent.click(sideMenuToggleBtn)
    })

    expect(menuTextSpan.classList).toContain('opacity-100')
    expect(screen.getByText('Home')).toBeDefined()
    expect(screen.getByText('Colaborators')).toBeDefined()
    expect(screen.getByText('Departments')).toBeDefined()
    expect(screen.getByText('About')).toBeDefined()
  })

  it('renders User Avatar and opens dropdown', async () => {
    await act(async () => {
      await renderWithFileRoutes(undefined, {
        initialLocation: '/dashboard',
      })
    })

    const userAvatar = await screen.findByTestId('user-avatar-container')

    expect(userAvatar).toBeDefined()

    const userName = await screen.findByText(mockUser.firstName)
    expect(userName).toBeDefined()
    expect(userName.textContent).toBe(mockUser.firstName)

    expect(screen.queryByText('About')).toBeNull()
    expect(screen.queryByText('Logout')).toBeNull()

    const avatarBtn = await screen.findByTestId('user-avatar-btn')

    expect(avatarBtn).toBeDefined()
    expect(avatarBtn.tagName).toBe('BUTTON')

    await act(async () => {
      fireEvent.click(avatarBtn)
    })

    expect(screen.getByText('About')).toBeDefined()
    expect(screen.getByText('Logout')).toBeDefined()
  })

  it('renders Users and Department charts', async () => {
    await act(async () => {
      await renderWithFileRoutes(undefined, {
        initialLocation: '/dashboard',
      })
    })

    // Departments chart
    const departmentChartContainer = await screen.findByTestId(
      'dept-chart-container',
    )

    expect(departmentChartContainer).toBeDefined()

    const deptChartHeader = await screen.findByTestId('dept-chart-header')
    expect(deptChartHeader).toBeDefined()
    expect(deptChartHeader.textContent).toBe('Employees by Department')

    const deptBarChart = await screen.findByTestId('dept-bar-chart')

    expect(deptBarChart).toBeDefined()

    // Users status chart
    const statusChartContainer = await screen.findByTestId(
      'status-chart-container',
    )

    expect(statusChartContainer).toBeDefined()

    const statusChartHeader = await screen.findByTestId('status-chart-header')

    expect(statusChartHeader).toBeDefined()
    expect(statusChartHeader.textContent).toBe('Employees by Status')

    const statusChart = await screen.findByTestId('status-pie-chart')

    expect(statusChart).toBeDefined()
  })

  it('renders Star User card', async () => {
    await act(async () => {
      await renderWithFileRoutes(undefined, {
        initialLocation: '/dashboard',
      })
    })

    const starUserContainer = await screen.findByTestId('star-user-container')
    expect(starUserContainer).toBeDefined()
  })

  it('renders media and to top button', async () => {
    await act(async () => {
      await renderWithFileRoutes(undefined, {
        initialLocation: '/dashboard',
      })
    })

    const mediaSection = await screen.findByTestId('dashboard-media-section')
    expect(mediaSection).toBeDefined()
    expect(mediaSection.tagName).toBe('SECTION')

    const mediaHeader = await screen.findByTestId('dashboard-media-header')
    expect(mediaHeader).toBeDefined()
    expect(mediaHeader.textContent).toMatch(/the media/i)

    const videosContainer = await screen.findByTestId(
      'dashboard-videos-container',
    )
    expect(videosContainer).toBeDefined()

    const toTopBtn = await screen.findByTestId('to-top-btn')
    expect(toTopBtn).toBeDefined()
    expect(toTopBtn.tagName).toBe('BUTTON')

    const scrollToSpy = vi
      .spyOn(window, 'scrollTo')
      .mockImplementation(() => {})

    await act(async () => {
      fireEvent.click(toTopBtn)
    })

    expect(scrollToSpy).toHaveBeenCalled()
    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 10,
      left: 0,
      behavior: 'smooth',
    })
  })
})
