import { renderWithProviders } from '#/test/testUtils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Help } from '../help'
import { screen } from '@testing-library/dom'

describe('HelpPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders main layout and texts', () => {
    renderWithProviders(<Help />)

    expect(screen.getByTestId('help-page-header')).toBeDefined()
    expect(screen.getByTestId('help-page-header').textContent).toBe(
      'Cognitive Debt',
    )

    expect(screen.getByTestId('help-text')).toBeDefined()
  })

  it('renders help page links with correct destination', () => {
    renderWithProviders(<Help />)
    const linkToDummy = screen.getByTestId('help-link-to-dummy')
    expect(linkToDummy).toBeDefined()
    expect(linkToDummy.getAttribute('href')).toBe('https://dummyjson.com/users')
    expect(linkToDummy.textContent).toBe('Dummy JSON users')

    const linkToHome = screen.getByTestId('help-link-to-home')
    expect(linkToHome).toBeDefined()
    expect(linkToHome.getAttribute('href')).toBe('/')
    expect(linkToHome.textContent).toBe('Go to Login')
  })

  it('renders loading paragraph when loading', () => {
    renderWithProviders(<Help />)

    const loadingP = screen.getByTestId('help-loading-text')

    expect(loadingP).toBeDefined()
    expect(loadingP.textContent).toBe('Loading...')
  })
})
