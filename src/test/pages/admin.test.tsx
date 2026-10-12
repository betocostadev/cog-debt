import { act } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderWithFileRoutes } from '../file-route-utils'
import { transformDummyUsers } from '#/utils/transformUsers'
import { dummyUsers } from '#/utils/dummyUsers.mock'
import { useSettingsQueryFn } from '#/hooks/settings/useSettingsQueries'
import { getAuthContextValue } from '#/contexts/authContext'
import type { IAuthUser } from '#/types/account'
import store from '#/utils/store'
import { defaultSettings } from '#/utils/defaultSettings'

vi.mock('#/hooks/settings/useSettingsQueries')

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

describe('Admin page', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    getAuthContextValue().setAuthUser(mockUser as unknown as IAuthUser)

    store.jwt = null

    vi.mocked(useSettingsQueryFn).mockResolvedValue(defaultSettings)
  })

  afterEach(() => {
    getAuthContextValue().setAuthUser(null)
    store.jwt = null
  })

  it('renders main admin page layout', async () => {
    await act(async () => {
      renderWithFileRoutes(undefined, {
        initialLocation: '/admin',
        routerContext: { auth: mockAuthContext },
      })
    })

    const adminHeading = await screen.findByTestId('admin-page-title')
    const settingsHeading = await screen.findByTestId('admin-settings-heading')
    const companyHeading = await screen.findByTestId('admin-company-heading')

    expect(adminHeading).toBeDefined()
    expect(adminHeading.textContent).toBe('Admin')
    expect(settingsHeading.textContent).toBe('Application settings')
    expect(companyHeading.textContent).toBe('Company management')
  })
})
