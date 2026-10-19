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
    const settingsSection = await screen.findByTestId('admin-settings-section')
    const companySection = await screen.findByTestId('admin-settings-company')

    expect(adminHeading).toBeDefined()
    expect(adminHeading.textContent).toBe('Admin')
    expect(settingsSection.textContent).toBeDefined()
    expect(companySection.textContent).toBeDefined()
  })

  it('renders settings section correctly', async () => {
    await act(async () => {
      renderWithFileRoutes(undefined, {
        initialLocation: '/admin',
        routerContext: { auth: mockAuthContext },
      })
    })

    const settingsHeading = await screen.findByTestId('admin-settings-heading')
    expect(settingsHeading).toBeDefined()
    expect(settingsHeading.textContent).toBe('Application settings')

    const themeSection = await screen.findByTestId('theme-section')
    const themeButtons = await screen.findByTestId('theme-buttons')

    expect(themeSection).toBeDefined()
    expect(themeSection.children).toBeDefined()
    expect(themeSection.firstElementChild).toBeDefined()
    expect(themeSection.firstElementChild?.tagName).toBe('DIV')
    expect(themeSection.firstElementChild?.firstElementChild).toBeDefined()
    expect(themeSection.firstElementChild?.firstElementChild?.tagName).toBe(
      'H4',
    )
    expect(
      themeSection.firstElementChild?.firstElementChild?.textContent,
    ).toMatch(/app theme/i)

    expect(themeButtons).toBeDefined()

    const selectedThemeButton = themeButtons.firstElementChild
    const lightThemeButton = selectedThemeButton?.nextElementSibling
    const systemThemeButton = lightThemeButton?.nextElementSibling

    expect(selectedThemeButton).toBeDefined()
    expect(lightThemeButton).toBeDefined()
    expect(systemThemeButton).toBeDefined()

    expect(lightThemeButton?.getAttributeNames()).toContain('disabled')
    expect(lightThemeButton?.hasAttribute('disabled')).toBeTruthy()
    expect(lightThemeButton?.textContent).toBe('LIGHT')

    expect(systemThemeButton?.getAttributeNames()).toContain('disabled')
    expect(systemThemeButton?.hasAttribute('disabled')).toBeTruthy()
    expect(systemThemeButton?.textContent).toBe('SYSTEM')

    const starUserSection = await screen.findByTestId('star-user-section')

    expect(starUserSection).toBeDefined()

    const starUserContainer = await screen.findByTestId('star-user-container')

    expect(starUserContainer).toBeDefined()

    const resetCollaboratorBtn = await screen.findByTestId('reset-collab-btn')

    expect(resetCollaboratorBtn).toBeDefined()
    expect(resetCollaboratorBtn.textContent).toBe('Reset collaborator')
  })

  it('renders company management section correctly', async () => {
    await act(async () => {
      renderWithFileRoutes(undefined, {
        initialLocation: '/admin',
        routerContext: { auth: mockAuthContext },
      })
    })
    const companySection = await screen.findByTestId('admin-settings-company')

    expect(companySection).toBeDefined

    const companyHeading = await screen.findByTestId('admin-company-heading')

    expect(companyHeading).toBeDefined()
    expect(companyHeading.tagName).toBe('H3')
    expect(companyHeading.textContent).toMatch(/company management/i)

    const usersManagement = await screen.findByTestId('manage-users')

    expect(usersManagement).toBeDefined()
    expect(usersManagement.firstElementChild?.textContent).toMatch(/users/i)

    const manageUsersBtn = await screen.findByTestId('manage-users-btn')

    expect(manageUsersBtn).toBeDefined()
    expect(manageUsersBtn.textContent).toBe('Manage')

    const departmentsManagement =
      await screen.findByTestId('manage-departments')

    expect(departmentsManagement).toBeDefined()
    expect(departmentsManagement.firstElementChild?.textContent).toMatch(
      /departments/i,
    )

    const manageDepartmentsBtn = await screen.findByTestId(
      'manage-departments-btn',
    )
    expect(manageDepartmentsBtn).toBeDefined()
    expect(manageDepartmentsBtn.textContent).toBe('Manage')
  })
})
