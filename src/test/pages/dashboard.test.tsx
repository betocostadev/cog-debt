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
import { screen } from '@testing-library/dom'
import {
  useUserQueryFn,
  useUsersQueryFn,
  useUsersByStatusQueryFn,
  useDummyUsersQueryFn,
} from '#/hooks/users/useUsersQueries'
import type { IUser } from '#/types/users'
import { act } from '@testing-library/react'

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

// Mock DevTools at the top level to prevent JSDOM unmount crashes
vi.mock('@tanstack/react-query-devtools', () => ({
  ReactQueryDevtools: () => null,
  ReactQueryDevtoolsPanel: () => null,
}))

vi.mock('@tanstack/router-devtools', () => ({
  TanStackRouterDevtools: () => null,
  TanStackRouterDevtoolsPanel: () => null,
}))

vi.mock('@tanstack/react-devtools', () => ({
  TanStackDevtools: () => null,
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

  it('renders Dashboard Side Menu and User Avatar', async () => {
    await act(async () => {
      await renderWithFileRoutes(undefined, {
        initialLocation: '/dashboard',
      })
    })

    // Get side menu and click

    const userAvatar = await screen.findByTestId('user-avatar-container')

    expect(userAvatar).toBeDefined()

    const userName = await screen.findByText(mockUser.firstName)
    expect(userName).toBeDefined()
    expect(userName.textContent).toBe(mockUser.firstName)
  })

  it('renders Dashboard charts', async () => {
    await act(async () => {
      await renderWithFileRoutes(undefined, {
        initialLocation: '/dashboard',
      })
    })

    const departmentChartContainer = await screen.findByTestId(
      'dept-chart-container',
    )

    expect(departmentChartContainer).toBeDefined()

    const deptChartHeader = await screen.findByTestId('dept-chart-header')
    expect(deptChartHeader).toBeDefined()
    expect(deptChartHeader.textContent).toBe('Employees by Department')

    // TODO: Mock dept queryfn first
    // const deptBarChart = await screen.findByTestId('dept-bar-chart')

    // expect(deptBarChart).toBeDefined()

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

  it('renders Dashboard Star User card', async () => {
    await act(async () => {
      await renderWithFileRoutes(undefined, {
        initialLocation: '/dashboard',
      })
    })

    const starUserContainer = await screen.findByTestId('star-user-container')
    expect(starUserContainer).toBeDefined()
  })

  it('renders media and to top button', async () => {})
})
