// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithFileRoutes } from '../file-route-utils'

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the main login layout containers and texts', async () => {
    renderWithFileRoutes(undefined, {
      initialLocation: '/',
    })

    const loginContainer = await screen.findByTestId('login-page-container')

    expect(loginContainer).toBeDefined()

    const loginHeader = await screen.findByText('Cog Debt')
    expect(loginHeader).toBeDefined()

    const loginTitle = await screen.findByTestId('login-title')

    expect(loginTitle).toBeDefined()
    expect(loginTitle.textContent).toBe('Welcome to Cog Debt')
    expect(await screen.findByTestId('login-subtitle')).toBeDefined()
  })

  it('renders the LoginForm component', async () => {
    renderWithFileRoutes(undefined, {
      initialLocation: '/',
    })

    expect(await screen.findByTestId('login-form')).toBeDefined()
  })

  it('renders the Help link with the correct destination', async () => {
    renderWithFileRoutes(undefined, {
      initialLocation: '/',
    })

    const helpLink = await screen.findByTestId('help-link')

    expect(helpLink).toBeDefined()
    expect(helpLink.textContent).toBe('Help')
    expect(helpLink.getAttribute('href')).toBe('/help')
  })
})
