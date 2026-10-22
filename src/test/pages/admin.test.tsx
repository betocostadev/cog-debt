import { act } from '@testing-library/react'
import { fireEvent, screen } from '@testing-library/dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderWithFileRoutes } from '../file-route-utils'
import { transformDummyUsers } from '#/utils/transformUsers'
import { dummyUsers } from '#/utils/dummyUsers.mock'
import { getAuthContextValue } from '#/contexts/authContext'
import type { IAuthUser } from '#/types/account'
import store from '#/utils/store'
import { defaultSettings } from '#/utils/defaultSettings'
import { useSettingsQueryFn } from '#/hooks/settings/useSettingsQueries'
import * as settingsHooks from '#/hooks/settings/useSettings'
import { useUsersQueryFn } from '#/hooks/users/useUsersQueries'
import { useCompanyDepartmentsQueryFn } from '#/hooks/company/useCompanyQueries'
import { mockedDepartments } from '#/utils/departments.mock'

vi.mock('#/hooks/settings/useSettingsQueries')
vi.mock('#/hooks/users/useUsersQueries')
vi.mock('#/hooks/company/useCompanyQueries')

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
    Object.defineProperty(window, 'scrollTo', {
      value: vi.fn(),
      writable: true,
    })

    vi.clearAllMocks()

    store.jwt = mockUser.accessToken

    getAuthContextValue().setAuthUser(mockUser as unknown as IAuthUser)
    vi.mocked(useSettingsQueryFn).mockResolvedValue(defaultSettings)
    vi.mocked(useUsersQueryFn).mockResolvedValue({
      total: mockedUsers!.length,
      users: mockedUsers!,
    })
    vi.mocked(useCompanyDepartmentsQueryFn).mockResolvedValue({
      total: mockedDepartments.length,
      departments: mockedDepartments,
    })
  })

  afterEach(() => {
    // Object.defineProperty(window, 'scrollTo', null)

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

  it('navigates to the users page when the users management button is clicked', async () => {
    await act(async () => {
      renderWithFileRoutes(undefined, {
        initialLocation: '/admin',
        routerContext: { auth: mockAuthContext },
      })
    })

    const manageUsersBtn = await screen.findByTestId('manage-users-btn')

    await act(async () => {
      fireEvent.click(manageUsersBtn)
    })

    expect(await screen.findByTestId('Colaborators-title')).toBeDefined()
  })

  it('navigates to the departments page when the departments management button is clicked', async () => {
    await act(async () => {
      renderWithFileRoutes(undefined, {
        initialLocation: '/admin',
        routerContext: { auth: mockAuthContext },
      })
    })

    const manageDepartmentsBtn = await screen.findByTestId(
      'manage-departments-btn',
    )

    await act(async () => {
      fireEvent.click(manageDepartmentsBtn)
    })

    expect(await screen.findByTestId('Departments-title')).toBeDefined()
  })

  it('calls changeTheme when the current theme button is clicked', async () => {
    const mockChangeTheme = vi.fn()
    const useChangeThemeSpy = vi
      .spyOn(settingsHooks, 'useChangeTheme')
      .mockReturnValue({
        changeTheme: mockChangeTheme,
        isPending: false,
        isError: false,
        error: undefined,
        reset: vi.fn(),
      })

    await act(async () => {
      renderWithFileRoutes(undefined, {
        initialLocation: '/admin',
        routerContext: { auth: mockAuthContext },
      })
    })

    const themeSection = await screen.findByTestId('theme-section')
    const themeButtons = await screen.findByTestId('theme-buttons')

    expect(themeSection).toBeDefined()
    expect(themeButtons).toBeDefined()

    const selectedThemeButton = themeButtons.firstElementChild
    expect(selectedThemeButton).toBeDefined()

    await act(async () => {
      fireEvent.click(selectedThemeButton as unknown as HTMLButtonElement)
    })

    expect(mockChangeTheme).toHaveBeenCalledTimes(1)
    useChangeThemeSpy.mockRestore()
  })
})
