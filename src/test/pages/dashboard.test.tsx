// @vitest-environment jsdom

import { getAuthContextValue } from '#/contexts/authContext'
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
  useUsersByStatusQueryFn,
  useUsersQueryFn,
} from '#/hooks/users/useUsersQueries'
import type { IUser } from '#/types/users'

vi.mock('#/hooks/account/useAccountQueries', () => ({
  useAuthUserQueryFn: vi.fn(),
}))

vi.mock('#/hooks/users/useUsersQueries', () => ({
  useDummyUsersQueryFn: vi.fn(),
  useUsersQueryFn: vi.fn(),
  useUserQueryFn: vi.fn(),
  useUsersByStatusQueryFn: vi.fn(),
}))

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

    getAuthContextValue().setAuthUser(mockUser as unknown as IAuthUser)

    store.jwt = mockUser.accessToken

    vi.mocked(useAuthUserQueryFn).mockResolvedValue(
      mockUser as unknown as IAuthUser,
    )

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
    await renderWithFileRoutes(undefined, {
      initialLocation: '/dashboard',
    })

    const pageTitle = await screen.findByTestId('dashboard-title')

    expect(pageTitle).toBeDefined()
    expect(pageTitle.textContent).toBe('Dashboard')
  })

  it('renders Dashboard Side Menu and User Avatar', async () => {
    await renderWithFileRoutes(undefined, {
      initialLocation: '/dashboard',
    })

    // Get side menu and click

    const userAvatar = await screen.findByTestId('user-avatar-container')

    expect(userAvatar).toBeDefined()

    const userName = await screen.findByText(mockUser.firstName)
    expect(userName).toBeDefined()
    expect(userName.textContent).toBe(mockUser.firstName)
  })

  it('renders Dashboard charts', async () => {})

  it('renders Dashboard Star User card', async () => {
    await renderWithFileRoutes(undefined, {
      initialLocation: '/dashboard',
    })

    const starUserContainer = await screen.findByTestId('star-user-container')
    expect(starUserContainer).toBeDefined()
  })

  it('renders media and to top button', async () => {})
})
