import { act } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderWithFileRoutes } from '../file-route-utils'
import { transformDummyUsers } from '#/utils/transformUsers'
import { dummyUsers } from '#/utils/dummyUsers.mock'
import { getAuthContextValue } from '#/contexts/authContext'
import type { IAuthUser } from '#/types/account'
import store from '#/utils/store'

vi.mock('#/hooks/users/useUsersQueries')

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

describe('About page', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollTo', {
      value: vi.fn(),
      writable: true,
    })

    vi.clearAllMocks()

    store.jwt = mockUser.accessToken

    getAuthContextValue().setAuthUser(mockUser as unknown as IAuthUser)
  })

  afterEach(() => {
    getAuthContextValue().setAuthUser(null)
    store.jwt = null
  })

  it('renders the main about page content', async () => {
    await act(async () => {
      renderWithFileRoutes(undefined, {
        initialLocation: '/dashboard/about',
        routerContext: { auth: mockAuthContext },
      })
    })

    const pageTitle = await screen.findByTestId('about-page-title')
    const card = await screen.findByTestId('about-card-info')
    const technicalDetails = await screen.findByTestId(
      'about-technical-details',
    )
    const techStack = await screen.findByTestId('about-tech-stack')
    const videosSection = await screen.findByTestId('about-videos-section')
    const footerAction = await screen.findByTestId('about-footer-action')

    expect(pageTitle).toBeDefined()
    expect(pageTitle.textContent).toBe('The Cognitive Debt "Company"')
    expect(card).toBeDefined()
    expect(technicalDetails).toBeDefined()
    expect(techStack).toBeDefined()
    expect(videosSection).toBeDefined()
    expect(footerAction).toBeDefined()
  })

  it('should toggle the tech stack details', async () => {
    await act(async () => {
      renderWithFileRoutes(undefined, {
        initialLocation: '/dashboard/about',
        routerContext: { auth: mockAuthContext },
      })
    })

    const summary = await screen.findByTestId('tech-stack-summary')
    expect(summary).toBeDefined()

    await userEvent.click(summary)

    const section = await screen.findByText(/the tack stack of the project is/i)
    expect(section).toBeDefined()

    await userEvent.click(summary)

    const hiddenSection = screen.queryByText(
      'For anyone interested, the tack stack of the project is as follows',
    )
    expect(hiddenSection).toBeNull()
  })

  it('should scroll to top when clicking the To Top button', async () => {
    await act(async () => {
      renderWithFileRoutes(undefined, {
        initialLocation: '/dashboard/about',
        routerContext: { auth: mockAuthContext },
      })
    })

    const topButton = await screen.findByTestId('to-top-btn')
    expect(topButton).toBeDefined()

    await userEvent.click(topButton)

    expect(window.scrollTo).toHaveBeenCalled()
  })
})
