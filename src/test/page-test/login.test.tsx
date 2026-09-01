// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
// import { renderWithProviders } from '#/test/testUtils'

// Cannot export Help using TanStack Router with file based routing
describe.skip('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the main layout containers and texts', () => {
    // renderWithProviders(<LoginPage />)

    expect(screen.getByTestId('login-page-container')).toBeDefined()
    expect(screen.getByText('Cog Debt')).toBeDefined()

    expect(screen.getByTestId('login-title').textContent).toBe(
      'Welcome to Cog Debt',
    )
    expect(screen.getByTestId('login-subtitle')).toBeDefined()
  })

  it('renders the LoginForm component', () => {
    // renderWithProviders(<LoginPage />)

    expect(screen.getByTestId('login-form')).toBeDefined()
  })

  it('renders the Help link with the correct destination', () => {
    // renderWithProviders(<LoginPage />)

    const helpLink = screen.getByTestId('help-link')

    expect(helpLink).toBeDefined()
    expect(helpLink.textContent).toBe('Help')
    expect(helpLink.getAttribute('href')).toBe('/help')
  })
})
