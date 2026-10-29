import { act } from '@testing-library/react'
import { fireEvent, screen } from '@testing-library/dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderWithFileRoutes } from '../file-route-utils'
import { transformDummyUsers } from '#/utils/transformUsers'
import { dummyUsers } from '#/utils/dummyUsers.mock'
import { getAuthContextValue } from '#/contexts/authContext'
import type { IAuthUser } from '#/types/account'
import store from '#/utils/store'
import { useAuthUserQueryFn } from '#/hooks/account/useAccountQueries'

vi.mock('#/hooks/account/useAccountQueries')

const mockedUsers = transformDummyUsers(dummyUsers)
const mockUser = {
  ...mockedUsers![0],
  role: 'admin',
  gender: 'female',
  accessToken: 'mock-jwt-token',
  refreshToken: 'mock-refresh-token',
}

const mockAuthContext = {
  authUser: mockUser as unknown as IAuthUser,
  isAdmin: true,
  setAuthUser: vi.fn(),
}

describe('Profile page', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    Object.defineProperty(window, 'scrollTo', {
      value: vi.fn(),
      writable: true,
    })

    store.jwt = null

    getAuthContextValue().setAuthUser(mockUser as unknown as IAuthUser)

    vi.mocked(useAuthUserQueryFn).mockResolvedValue(
      mockUser as unknown as IAuthUser,
    )
  })

  afterEach(() => {
    getAuthContextValue().setAuthUser(null)
    store.jwt = null
  })

  it('renders the main profile page content', async () => {
    await act(async () => {
      await renderWithFileRoutes(undefined, {
        initialLocation: '/dashboard/profile',
        routerContext: { auth: mockAuthContext },
      })
    })

    const pageTitle = await screen.findByTestId('profile-page-title')
    const profileCard = await screen.findByTestId('profile-card')
    const profileDetails = await screen.findByTestId('profile-details')
    const profileMeta = await screen.findByTestId('profile-meta')
    const companyInfo = await screen.findByTestId('profile-company-info')
    const address = await screen.findByTestId('profile-address')
    const logoutAction = await screen.findByTestId('profile-logout-action')

    expect(pageTitle).toBeDefined()
    expect(pageTitle.textContent).toBe('Your profile')
    expect(profileCard).toBeDefined()
    expect(profileDetails).toBeDefined()
    expect(profileMeta).toBeDefined()
    expect(companyInfo).toBeDefined()
    expect(address).toBeDefined()
    expect(logoutAction).toBeDefined()
  })

  it('should logout when pressing the button in profile page', async () => {
    await act(async () => {
      await renderWithFileRoutes(undefined, {
        initialLocation: '/dashboard/profile',
        routerContext: { auth: mockAuthContext },
      })
    })

    const pageTitle = await screen.findByTestId('profile-page-title')
    expect(pageTitle).toBeDefined()
    expect(pageTitle.textContent).toBe('Your profile')

    const logoutAction = await screen.findByTestId('profile-logout-action')
    expect(logoutAction).toBeDefined()

    const logoutButton = logoutAction.firstChild
    expect(logoutButton).toBeDefined()
    expect(logoutButton?.textContent).toMatch(/logout/i)

    await act(async () => {
      fireEvent.click(logoutButton as HTMLButtonElement)
    })

    const loginContainer = await screen.findByTestId('login-page-container')
    const loginTitle = await screen.findByTestId('login-title')

    expect(loginContainer).toBeDefined()
    expect(loginTitle).toBeDefined()

    expect(loginContainer.textContent).toMatch(/Welcome to Cog Debt/)

    expect(getAuthContextValue().authUser).toBeNull
    expect(store.jwt).toBeNull
  })
})
